<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'db_connect.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($method === 'GET') {
    try {
        $stmt = $conn->query("SELECT * FROM attendance ORDER BY date DESC, time_in DESC");
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($results);
    } catch(Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    try {
        $conn->exec("ALTER TABLE attendance ADD COLUMN user_type VARCHAR(20) DEFAULT 'student'");
    } catch(PDOException $e) {}

    if (isset($data['student_id']) || isset($data['teacher_id'])) {
        $userId = $data['student_id'] ?? $data['teacher_id'];
        $userType = $data['user_type'] ?? (isset($data['teacher_id']) ? 'teacher' : 'student');
        
        try {
            $stmt = $conn->prepare("INSERT INTO attendance (student_id, date, time_in, time_out, status, device_id, user_type) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $userId,
                $data['date'],
                $data['time_in'] ?? null,
                $data['time_out'] ?? null,
                $data['status'] ?? 'Present',
                $data['device_id'] ?? 'Manual',
                $userType
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
    $id = $_GET['id'] ?? null;
    if ($id) {
        try {
            $stmt = $conn->prepare("DELETE FROM attendance WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(["status" => "success"]);
        } catch(Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Missing ID"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}
?>
