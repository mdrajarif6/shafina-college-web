<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
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
        $stmt = $conn->query("SELECT * FROM students ORDER BY id DESC");
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $students = array_map(function($row) {
            return [
                "id" => $row['id'],
                "studentID" => $row['student_id'],
                "name" => $row['name'],
                "phone" => $row['phone'],
                "program" => $row['program'],
                "status" => $row['status']
            ];
        }, $results);
        echo json_encode($students);
    } catch(Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (isset($data['student_id'], $data['name'], $data['phone'], $data['program'])) {
        try {
            $stmt = $conn->prepare("INSERT INTO students (student_id, name, phone, program, status) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([
                $data['student_id'],
                $data['name'],
                $data['phone'],
                $data['program'],
                $data['status'] ?? 'Active'
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
    $student_id = $_GET['id'] ?? null;
    if ($student_id) {
        try {
            $stmt = $conn->prepare("DELETE FROM students WHERE student_id = ?");
            $stmt->execute([$student_id]);
            echo json_encode(["status" => "success"]);
        } catch(Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Student ID required"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}
?>
