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

// Add columns if they don't exist
try {
    $conn->exec("ALTER TABLE teachers ADD COLUMN mpo_index VARCHAR(100) NULL");
    $conn->exec("ALTER TABLE teachers ADD COLUMN mobile VARCHAR(20) NULL");
} catch(PDOException $e) {
    // Ignore error if column exists
}

if ($method === 'GET') {
    try {
        $stmt = $conn->query("SELECT * FROM teachers ORDER BY id DESC");
        $teachers = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(["status" => "success", "teachers" => $teachers]);
    } catch(Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
} else if ($method === 'DELETE') {
    $id = $_GET['id'] ?? '';
    if ($id) {
        try {
            $stmt = $conn->prepare("DELETE FROM teachers WHERE teacher_id = ?");
            $stmt->execute([$id]);
            echo json_encode(["status" => "success"]);
        } catch(Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Missing teacher ID"]);
    }
} else if ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (isset($data['action']) && $data['action'] === 'login') {
        if (isset($data['mobile'], $data['pin'])) {
            try {
                $stmt = $conn->prepare("SELECT * FROM teachers WHERE mobile = ? AND pin = ?");
                $stmt->execute([$data['mobile'], $data['pin']]);
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
    } else if (isset($data['action']) && $data['action'] === 'signup') {
        if (isset($data['mpo_index'], $data['mobile'], $data['pin'], $data['name'])) {
            try {
                // Generate a Teacher ID
                $teacher_id = "TCH-" . date("Y") . "-" . rand(100, 999);
                $dept = $data['department'] ?? 'General';
                
                $stmt = $conn->prepare("INSERT INTO teachers (teacher_id, name, department, pin, mpo_index, mobile) VALUES (?, ?, ?, ?, ?, ?)");
                $stmt->execute([$teacher_id, $data['name'], $dept, $data['pin'], $data['mpo_index'], $data['mobile']]);
                
                echo json_encode(["status" => "success", "teacher_id" => $teacher_id, "message" => "Signup successful! Your Teacher ID is $teacher_id"]);
            } catch(Exception $e) {
                http_response_code(500);
                echo json_encode(["error" => $e->getMessage()]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Missing required fields"]);
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
