import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";


const isAuthenticated = async(req, res, next) => {
    
  const {token} = req.cookies;

    if (!token) {
    return res.status(401).json('Login first: Unauthorized: No token provided');
    }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);
   
  } catch (error) {
   return res.status(403).json("unautherized invalid token")
  }
  next();
    };

  export default isAuthenticated;