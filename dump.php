<?php
include 'api/db_connect.php';
$stmt = $conn->query("SELECT * FROM applications");
$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($res);
?>
