const pool = require("../config/db");

const getCompanies = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM companies ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching companies",
      error: error.message,
    });
  }
};

const getCompanyById = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM companies WHERE id = ?", [
      req.params.id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching company",
      error: error.message,
    });
  }
};

const createCompany = async (req, res) => {
  try {
    const { company_name, location, website } = req.body;

    if (!company_name) {
      return res.status(400).json({ message: "Company name is required" });
    }

    const [result] = await pool.query(
      "INSERT INTO companies (company_name, location, website) VALUES (?, ?, ?)",
      [company_name, location || null, website || null]
    );

    res.status(201).json({
      id: result.insertId,
      company_name,
      location,
      website,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating company",
      error: error.message,
    });
  }
};

const updateCompany = async (req, res) => {
  try {
    const { company_name, location, website } = req.body;

    const [result] = await pool.query(
      "UPDATE companies SET company_name = ?, location = ?, website = ? WHERE id = ?",
      [company_name, location || null, website || null, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json({ message: "Company updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error updating company",
      error: error.message,
    });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM companies WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting company",
      error: error.message,
    });
  }
};

module.exports = {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
};