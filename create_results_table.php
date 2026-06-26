<?php
include 'api/db_connect.php';

$sql = "
CREATE TABLE IF NOT EXISTS results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    exam_name VARCHAR(100) NOT NULL,
    gpa VARCHAR(20) NOT NULL,
    grade VARCHAR(10) NOT NULL,
    published_date VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO results (student_id, exam_name, gpa, grade, published_date)
VALUES (
    'STU-2026-101',
    'HSC Model Test',
    '5.00',
    'A+',
    '2026-06-25'
);
";

try {
    $conn->exec($sql);
    echo "Results table created successfully!";
} catch (PDOException $e) {
    echo "Error creating table: " . $e->getMessage();
}
?>
