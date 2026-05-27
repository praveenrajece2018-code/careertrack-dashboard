USE careertrack_db;
INSERT INTO companies (company_name, location, website)
VALUES (
        'DHL Supply Chain',
        'Bonn, Germany',
        'https://www.dhl.com'
    ),
    (
        'Lufthansa Technik',
        'Hamburg, Germany',
        'https://www.lufthansa-technik.com'
    ),
    (
        'Henkel',
        'Düsseldorf, Germany',
        'https://www.henkel.com'
    ),
    (
        'BMW Group',
        'Munich, Germany',
        'https://www.bmwgroup.com'
    );
INSERT INTO applications (
        company_id,
        role_title,
        job_type,
        status,
        applied_date,
        deadline,
        interview_date,
        job_link,
        notes
    )
VALUES (
        1,
        'Data Analytics Intern',
        'Internship',
        'Applied',
        '2026-05-20',
        '2026-06-01',
        NULL,
        'https://example.com/job1',
        'Tailored resume submitted.'
    ),
    (
        2,
        'Business Intelligence Working Student',
        'Working Student',
        'Interview',
        '2026-05-18',
        '2026-05-30',
        '2026-05-28',
        'https://example.com/job2',
        'Prepare Power BI and SQL examples.'
    ),
    (
        3,
        'AI Commercial Excellence Intern',
        'Internship',
        'Saved',
        NULL,
        '2026-06-05',
        NULL,
        'https://example.com/job3',
        'Need to customize cover letter.'
    ),
    (
        4,
        'Software Testing Working Student',
        'Working Student',
        'Assessment',
        '2026-05-22',
        '2026-06-02',
        NULL,
        'https://example.com/job4',
        'Prepare API testing examples.'
    );