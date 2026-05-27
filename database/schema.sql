CREATE DATABASE IF NOT EXISTS careertrack_db;
USE careertrack_db;
DROP TABLE IF EXISTS applications;
DROP TABLE IF EXISTS companies;
CREATE TABLE companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(150) NOT NULL,
    location VARCHAR(100),
    website VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT,
    role_title VARCHAR(150) NOT NULL,
    job_type VARCHAR(50),
    status VARCHAR(50) DEFAULT 'Saved',
    applied_date DATE,
    deadline DATE,
    interview_date DATE,
    job_link VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE
    SET NULL
);