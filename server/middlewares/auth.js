const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Auth header:", authHeader); // Ajoutez ce log pour vérifier l'en-tête d'autorisation

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Token:", token); // Ajoutez ce log pour vérifier le jeton

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("Decoded token:", decoded); // Ajoutez ce log pour vérifier le jeton décodé
    next();
  } catch (error) {
    console.log("Token verification error:", error); // Ajoutez ce log pour vérifier les erreurs de vérification du jeton
    res.status(401).json({ message: "Invalid token" });
  }
};
