const pool = require("../config/db");

const getDashboardStats = async (req, res) => {
  try {
    const [[total]] = await pool.query(
      "SELECT COUNT(*) AS total FROM applications"
    );

    const [byStatus] = await pool.query(`
      SELECT status, COUNT(*) AS count
      FROM applications
      GROUP BY status
    `);

    const [[upcomingDeadlines]] = await pool.query(`
      SELECT COUNT(*) AS count
      FROM applications
      WHERE deadline IS NOT NULL
      AND deadline >= CURDATE()
      AND deadline <= DATE_ADD(CURDATE(), INTERVAL 7 DAY)
    `);

    res.json({
      total: total.total,
      upcomingDeadlines: upcomingDeadlines.count,
      byStatus,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching dashboard stats",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};