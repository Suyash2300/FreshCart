import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Allows access if sellerToken is valid OR logged-in user has role 'admin'
const adminOrSeller = async (req, res, next) => {
	try {
		// Check seller cookie first (backward compatibility)
		const { sellerToken } = req.cookies || {};
		if (sellerToken) {
			try {
				const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);
				if (tokenDecode.email === process.env.SELLER_EMAIL) {
					return next();
				}
			} catch {
				// ignore and fallback to admin role check
			}
		}

		// Fallback: admin role via user cookie
		if (!req.userId) {
			return res.json({ success: false, message: "Not Authorized" });
		}
		const user = await User.findById(req.userId).select("role");
		if (user && user.role === "admin") {
			return next();
		}
		return res.json({ success: false, message: "Not Authorized" });
	} catch (error) {
		return res.json({ success: false, message: error.message });
	}
};

export default adminOrSeller;


