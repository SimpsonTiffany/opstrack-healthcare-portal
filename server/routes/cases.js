const express = require("express");
const Case = require("../models/Case");
const { authRequired, requireRole } = require("../middleware/auth");

const router = express.Router();

/**
 * GET /api/cases
 * Protected: any logged-in user
 */
router.get("/", authRequired, async (req, res) => {
    try {
        const cases = await Case.findAll();
        res.json(cases);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

/**
 * POST /api/cases
 * Protected: admin only (example)
 */
router.post("/", authRequired, requireRole("admin"), async (req, res) => {
    try {
        const { clientId, caseType, priority, status } = req.body;

        if (!clientId || !caseType || !priority) {
            return res.status(400).json({ error: "clientId, caseType, and priority are required" });
        }

        const newCase = await Case.create({
            clientId,
            caseType,
            priority,
            status: status || "New"
        });

        res.status(201).json(newCase);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
// GET single case
router.get("/:id", authRequired, async (req, res) => {
    try {
        const found = await Case.findByPk(req.params.id);
        if (!found) return res.status(404).json({ error: "Case not found" });
        res.json(found);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// UPDATE case status
router.put("/:id", authRequired, async (req, res) => {
    try {
        const found = await Case.findByPk(req.params.id);
        if (!found) return res.status(404).json({ error: "Case not found" });

        const { status } = req.body;
        if (!status) return res.status(400).json({ error: "Status required" });

        found.status = status;
        await found.save();

        res.json(found);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});