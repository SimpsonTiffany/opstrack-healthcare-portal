const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/database");
require("./models/User");
require("./models/Case");

const authRoutes = require("./routes/auth");
const caseRoutes = require("./routes/cases");

const app = express();

app.use(cors());
app.use(express.json());

// Home page
app.get("/", (req, res) => {
    res.send(`
    <h1>OpsTrack Healthcare Portal</h1>
    <p>Backend API is running.</p>
    <p>Available endpoints:</p>
    <ul>
      <li>/api/auth</li>
      <li>/api/cases</li>
    </ul>
  `);
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/cases", caseRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
    console.log("Database synced");

    app.listen(PORT, () => {
        console.log("Server running on port " + PORT);
    });
});