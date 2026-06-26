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
        $stmt = $conn->query("SELECT * FROM applications ORDER BY id DESC");
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $apps = array_map(function($row) {
            return [
                "id" => $row['id'],
                "applicationID" => $row['application_id'],
                "applicantName" => $row['applicant_name'],
                "applicantPhone" => $row['applicant_phone'],
                "selectedProgram" => $row['selected_program'],
                "applicantGpa" => $row['applicant_gpa'],
                "dateSubmitted" => $row['date_submitted'],
                "status" => $row['status']
            ];
        }, $results);
        echo json_encode($apps);
    } catch(Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (isset($data['application_id'], $data['applicant_name'], $data['applicant_phone'], $data['selected_program'], $data['applicant_gpa'], $data['date_submitted'])) {
        try {
            $stmt = $conn->prepare("INSERT INTO applications (application_id, applicant_name, applicant_phone, selected_program, applicant_gpa, date_submitted, status) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $data['application_id'],
                $data['applicant_name'],
                $data['applicant_phone'],
                $data['selected_program'],
                $data['applicant_gpa'],
                $data['date_submitted'],
                $data['status'] ?? 'Pending'
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
} elseif ($method === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (isset($data['application_id'], $data['status'])) {
        try {
            $stmt = $conn->prepare("UPDATE applications SET status = ? WHERE application_id = ?");
            $stmt->execute([$data['status'], $data['application_id']]);
            
            // If approved, add to students table automatically
            if ($data['status'] === 'Approved') {
                // Fetch application details first
                $appStmt = $conn->prepare("SELECT * FROM applications WHERE application_id = ?");
                $appStmt->execute([$data['application_id']]);
                $app = $appStmt->fetch(PDO::FETCH_ASSOC);
                
                if ($app) {
                    $student_id = "STU-" . date("Y") . "-" . rand(100, 999);
                    $insertStudent = $conn->prepare("INSERT IGNORE INTO students (student_id, name, phone, program, status) VALUES (?, ?, ?, ?, 'Active')");
                    $insertStudent->execute([
                        $student_id,
                        $app['applicant_name'],
                        $app['applicant_phone'],
                        $app['selected_program']
                    ]);
                }
            }
            
            echo json_encode(["status" => "success"]);
        } catch(Exception $e) {
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
