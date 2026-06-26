<?php
include 'api/db_connect.php';

$sql = "
CREATE TABLE IF NOT EXISTS teachers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    teacher_id VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    pin VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO teachers (teacher_id, name, department, pin)
VALUES (
    'TCH-2026-001',
    'Jane Doe',
    'Computer Science',
    '1234'
);
";

try {
    $conn->exec($sql);
    echo "Teachers table created successfully!";
} catch (PDOException $e) {
    echo "Error creating table: " . $e->getMessage();
}
?>
