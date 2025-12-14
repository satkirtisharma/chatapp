import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
	try {
		// 1️⃣ Get token from cookie
		const token = req.cookies.jwt;

		if (!token) {
			return res.status(401).json({
				error: "Unauthorized - No Token Provided",
			});
		}

		// 2️⃣ Verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// 3️⃣ Find user
		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(401).json({
				error: "Unauthorized - User not found",
			});
		}

		// 4️⃣ Attach user to request
		req.user = user;

		next();
	} catch (error) {
		console.log("Error in protectRoute middleware:", error.message);
		return res.status(401).json({
			error: "Unauthorized - Invalid or Expired Token",
		});
	}
};

export default protectRoute;
