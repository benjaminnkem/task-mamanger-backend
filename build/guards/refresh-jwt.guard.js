import jwt from "jsonwebtoken";
const extractToken = (req) => {
    if (!req.headers.authorization)
        return null;
    const [type, token] = req.headers.authorization.split(" ");
    return { type, token };
};
export const refreshJwtGuard = (req, res, next) => {
    const extracted = extractToken(req);
    if (!extracted) {
        return res.status(401).json({
            message: "No token provided",
        });
    }
    if (extracted.type !== "Refresh") {
        return res.status(401).json({
            message: `${extracted.type} is not a valid type, use Refresh instead.`,
        });
    }
    const { token } = extracted;
    if (!token) {
        return res.status(401).json({
            message: "No token provided",
        });
    }
    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: err.message ?? "Invalid token",
            });
        }
        req.user = decoded;
        next();
    });
};
