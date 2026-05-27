const express = require("express");
const cors = require("cors");
require("dotenv").config();

const companyRoutes = require("./routes/companies");
const applicationRoutes = require("./routes/applications");
const dashboardRoutes = require("./routes/dashboard");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "CareerTrack API is running" });
});

app.use("/api/companies", companyRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});