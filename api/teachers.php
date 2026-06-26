<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'db_connect.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (isset($data['action']) && $data['action'] === 'login') {
        if (isset($data['teacher_id'], $data['pin'])) {
            try {
                $stmt = $conn->prepare("SELECT * FROM teachers WHERE teacher_id = ? AND pin = ?");
                $stmt->execute([$data['teacher_id'], $data['pin']]);
                $teacher = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if ($teacher) {
                    echo json_encode(["status" => "success", "teacher" => $teacher]);
                } else {
                    echo json_encode(["error" => "Invalid ID or PIN"]);
                }
            } catch(Exception $e) {
                http_response_code(500);
                echo json_encode(["error" => $e->getMessage()]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Missing credentials"]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Invalid action"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}
?>
