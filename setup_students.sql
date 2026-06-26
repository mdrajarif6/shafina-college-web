USE shafina_college_db;

CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    program VARCHAR(100) NOT NULL,
    status ENUM('Active', 'Inactive', 'Alumni') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert dummy students
INSERT IGNORE INTO students (student_id, name, phone, program, status)
VALUES 
('STU-2026-001', 'Arif Rahman', '01711223344', 'HSC - Science', 'Active'),
('STU-2026-002', 'Tariqul Islam', '01822334455', 'HSC - Commerce', 'Active'),
('STU-2026-003', 'Ayesha Siddiqa', '01933445566', 'Honours - Bangla', 'Active');
