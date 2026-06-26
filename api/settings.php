<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'db_connect.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($method === 'GET') {
    try {
        $stmt = $conn->query("SELECT * FROM settings");
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $settings = [];
        foreach ($results as $row) {
            $settings[$row['setting_key']] = $row['setting_value'];
        }
        echo json_encode($settings);
    } catch(Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
} elseif ($method === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (is_array($data)) {
        try {
            $conn->beginTransaction();
            $stmt = $conn->prepare("UPDATE settings SET setting_value = ? WHERE setting_key = ?");
            foreach ($data as $key => $value) {
                $stmt->execute([$value, $key]);
            }
            $conn->commit();
            echo json_encode(["status" => "success"]);
        } catch(Exception $e) {
            $conn->rollBack();
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Invalid data"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}
?>
