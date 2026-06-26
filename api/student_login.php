<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
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
    
    if (isset($data['student_id'], $data['phone'])) {
        try {
            // Using phone number as a basic form of authentication since there is no password column
            $stmt = $conn->prepare("SELECT id, student_id, name, program, status FROM students WHERE student_id = ? AND phone = ?");
            $stmt->execute([$data['student_id'], $data['phone']]);
            $student = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($student) {
                // Fetch recent attendance for the student
                $stmt_att = $conn->prepare("SELECT * FROM attendance WHERE student_id = ? ORDER BY date DESC LIMIT 10");
                $stmt_att->execute([$student['student_id']]);
                $attendance = $stmt_att->fetchAll(PDO::FETCH_ASSOC);
                
                // Fetch results for the student
                $stmt_res = $conn->prepare("SELECT * FROM results WHERE student_id = ? ORDER BY created_at DESC");
                $stmt_res->execute([$student['student_id']]);
                $results = $stmt_res->fetchAll(PDO::FETCH_ASSOC);
                
                echo json_encode([
                    "status" => "success", 
                    "student" => $student,
                    "attendance" => $attendance,
                    "results" => $results
                ]);
            } else {
                echo json_encode(["error" => "Invalid Student ID or Phone Number"]);
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
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}
?>
