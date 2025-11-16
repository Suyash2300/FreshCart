import User from "../models/User.js";

const authorizeRole = (allowedRoles = []) => {
	return async (req, res, next) => {
		try {
			if (!req.userId) {
				return res.json({ success: false, message: "Not Authorized" });
			}
			const user = await User.findById(req.userId).select("role");
			if (!user) {
				return res.json({ success: false, message: "User not found" });
			}
			if (!allowedRoles.includes(user.role)) {
				return res.json({ success: false, message: "Forbidden" });
			}
			next();
		} catch (error) {
			return res.json({ success: false, message: error.message });
		}
	};
};

export default authorizeRole;


