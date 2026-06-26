<?php
// Detect if running on localhost (XAMPP) or production server
$http_host = $_SERVER['HTTP_HOST'] ?? 'cli';
$is_localhost = in_array($http_host, ['localhost', '127.0.0.1', '::1', 'cli']);

if ($is_localhost) {
    // Local XAMPP Credentials
    $host = "localhost";
    $username = "root";
    $password = "";
    $dbname = "shafina_college_db";
} else {
    // Production Credentials
    $host = "localhost";
    $username = "shafmeof_admin";
    $password = "9kEx]&R!he7.U_q2023";
    $dbname = "shafmeof_shafina_db";
}

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die(json_encode(["error" => "Connection failed: " . $e->getMessage()]));
}
?>
