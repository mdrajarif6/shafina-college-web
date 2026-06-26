USE shafina_college_db;

CREATE TABLE IF NOT EXISTS settings (
    setting_key VARCHAR(50) PRIMARY KEY,
    setting_value TEXT NOT NULL
);

-- Insert default settings
INSERT IGNORE INTO settings (setting_key, setting_value) VALUES 
('admin_pin', 'admin123'),
('contact_phone', '01711-223344'),
('contact_email', 'info@shafinacollege.edu.bd'),
('contact_address', '123 College Road, Dhaka'),
('maintenance_mode', 'false');
