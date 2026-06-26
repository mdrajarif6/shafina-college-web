<?php
include 'api/db_connect.php';

$sql = "
CREATE TABLE IF NOT EXISTS attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    date VARCHAR(50) NOT NULL,
    time_in VARCHAR(50),
    time_out VARCHAR(50),
    status VARCHAR(50) DEFAULT 'Present',
    device_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO attendance (student_id, date, time_in, time_out, status, device_id)
VALUES (
    'STU-2026-101',
    '2026-06-25',
    '08:45 AM',
    '04:10 PM',
    'Present',
    'ZK-Main-Gate-01'
);
";

try {
    $conn->exec($sql);
    echo "Attendance table created successfully!";
} catch (PDOException $e) {
    echo "Error creating table: " . $e->getMessage();
}
?>
