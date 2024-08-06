import admin from "../utils/firebaseAdmin.js";

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = { userId: decodedToken.uid };

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
