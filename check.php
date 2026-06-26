<?php
include 'api/db_connect.php';
try {
    $stmt = $conn->query('SHOW TABLES');
    print_r($stmt->fetchAll(PDO::FETCH_ASSOC));

    // Also check counts of each table if they exist
    $tables = ['applications', 'notices', 'settings', 'students'];
    foreach ($tables as $t) {
        $stmt = $conn->query("SELECT COUNT(*) as c FROM $t");
        $res = $stmt->fetch(PDO::FETCH_ASSOC);
        echo "$t count: " . $res['c'] . "\n";
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
