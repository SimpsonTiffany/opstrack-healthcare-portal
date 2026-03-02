const sequelize = require("./config/database");
require("./models/User");
require("./models/Case");
const express = require("express");
const cors = require("cors");
require("dotenv").config();


const app = express();

app.use(cors());
app.use(express.json());
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);
const caseRoutes = require("./routes/cases");
app.use("/api/cases", caseRoutes);



// Placeholder routes (we’ll build these next)
app.get("/api/cases", (req, res) => {
    res.json([]);
});
sequelize.sync().then(() => {
    console.log("Database synced");
});
const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
    console.log("Database synced");

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});