import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const token = req.header("x-auth-token");

  //check for token
  if (!token) res.status(401).json({ msg: "Unauthorized access." });

  try {
    //verify token
    const decoded = jwt.verify(token, process.env.jwtSecret);
    //add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid." });
  }
}
