<?php
include 'db_connect.php';
try {
    $stmt = $conn->query("DESCRIBE teachers");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} catch(Exception $e) {
    echo $e->getMessage();
}
?>
