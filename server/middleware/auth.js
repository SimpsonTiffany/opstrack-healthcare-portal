const jwt = require("jsonwebtoken");

// Middleware: require valid JWT
function authRequired(req, res, next) {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({
            error: "Missing or invalid Authorization header"
        });
    }

    const token = header.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach decoded user to request
        req.user = decoded; // { id, username, role }

        next();
    } catch (err) {
        return res.status(401).json({
            error: "Invalid or expired token"
        });
    }
}

// Middleware: require specific role (ex: "admin")
function requireRole(role) {
    return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
            return res.status(403).json({
                error: "Forbidden"
            });
        }
        next();
    };
}

module.exports = {
    authRequired,
    requireRole
};