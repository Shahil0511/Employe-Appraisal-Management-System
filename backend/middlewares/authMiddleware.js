import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyAdmin = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Remove "Bearer " part from the token
    const tokenWithoutBearer = token.split(" ")[1];
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);

    // Directly use the decoded token properties
    req.user = decoded; // Store the decoded token in req.user
    if (decoded.role !== "admin") {
      // Check if the role is 'admin'
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
