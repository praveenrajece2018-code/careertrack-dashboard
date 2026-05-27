const pool = require("../config/db");

const getApplications = async (req, res) => {
  try {
    const { status } = req.query;

    let sql = `
      SELECT 
        applications.*,
        companies.company_name,
        companies.location,
        companies.website
      FROM applications
      LEFT JOIN companies ON applications.company_id = companies.id
    `;

    const params = [];

    if (status) {
      sql += " WHERE applications.status = ?";
      params.push(status);
    }

    sql += " ORDER BY applications.created_at DESC";

    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching applications",
      error: error.message,
    });
  }
};

const getApplicationById = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT 
        applications.*,
        companies.company_name,
        companies.location,
        companies.website
      FROM applications
      LEFT JOIN companies ON applications.company_id = companies.id
      WHERE applications.id = ?
      `,
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching application",
      error: error.message,
    });
  }
};

const createApplication = async (req, res) => {
  try {
    const {
      company_id,
      role_title,
      job_type,
      status,
      applied_date,
      deadline,
      interview_date,
      job_link,
      notes,
    } = req.body;

    if (!role_title) {
      return res.status(400).json({ message: "Role title is required" });
    }

    const [result] = await pool.query(
      `
      INSERT INTO applications 
      (company_id, role_title, job_type, status, applied_date, deadline, interview_date, job_link, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        company_id || null,
        role_title,
        job_type || null,
        status || "Saved",
        applied_date || null,
        deadline || null,
        interview_date || null,
        job_link || null,
        notes || null,
      ]
    );

    res.status(201).json({
      id: result.insertId,
      message: "Application created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating application",
      error: error.message,
    });
  }
};

const updateApplication = async (req, res) => {
  try {
    const {
      company_id,
      role_title,
      job_type,
      status,
      applied_date,
      deadline,
      interview_date,
      job_link,
      notes,
    } = req.body;

    const [result] = await pool.query(
      `
      UPDATE applications
      SET company_id = ?, role_title = ?, job_type = ?, status = ?, 
          applied_date = ?, deadline = ?, interview_date = ?, job_link = ?, notes = ?
      WHERE id = ?
      `,
      [
        company_id || null,
        role_title,
        job_type || null,
        status || "Saved",
        applied_date || null,
        deadline || null,
        interview_date || null,
        job_link || null,
        notes || null,
        req.params.id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json({ message: "Application updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error updating application",
      error: error.message,
    });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM applications WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting application",
      error: error.message,
    });
  }
};

module.exports = {
  getApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
};