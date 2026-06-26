<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
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
        $stmt = $conn->query("SELECT * FROM notices ORDER BY id DESC");
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $notices = array_map(function($row) {
            return [
                "id" => $row['id'],
                "notice_id" => $row['notice_id'],
                "titleEN" => $row['title_en'],
                "titleBN" => $row['title_bn'],
                "date" => $row['date'],
                "category" => $row['category'],
                "contentEN" => $row['content_en'],
                "contentBN" => $row['content_bn']
            ];
        }, $results);
        echo json_encode($notices);
    } catch(Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (isset($data['notice_id'], $data['title_en'], $data['title_bn'], $data['date'], $data['category'], $data['content_en'], $data['content_bn'])) {
        try {
            $stmt = $conn->prepare("INSERT INTO notices (notice_id, title_en, title_bn, date, category, content_en, content_bn) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $data['notice_id'],
                $data['title_en'],
                $data['title_bn'],
                $data['date'],
                $data['category'],
                $data['content_en'],
                $data['content_bn']
            ]);
            echo json_encode(["status" => "success"]);
        } catch(Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Invalid data"]);
    }
} elseif ($method === 'DELETE') {
    $notice_id = $_GET['id'] ?? null;
    if ($notice_id) {
        try {
            $stmt = $conn->prepare("DELETE FROM notices WHERE notice_id = ?");
            $stmt->execute([$notice_id]);
            echo json_encode(["status" => "success"]);
        } catch(Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Notice ID required"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}
?>
