const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const { username, password, role } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "username and password are required" });
        }

        const existing = await User.findOne({ where: { username } });
        if (existing) {
            return res.status(409).json({ error: "username already exists" });
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            password: hashed,
            role: role === "admin" ? "admin" : "user"
        });

        res.status(201).json({
            id: user.id,
            username: user.username,
            role: user.role
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;