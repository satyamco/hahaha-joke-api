
import {User} from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


export const healthChecker = (req, res) => {
    res.status(200).json("everything is working fine")
}

export const userRegister = async (req, res) => {
      try {
        const { username, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
          return res.status(409).json("User already exists. Please login.");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({ username, email, password: hashedPassword, post: [], followers: [], following: []});
        
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);
        return res.status(201).cookie("token", token, {httpOnly: true}).json("user registered successfully ");  
        
      } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error"+ error.message );
      }
    };

export const userLogin = async (req, res) => {
      try {     
        
        const { email, password } = req.body;
        const user = await User.findOne({ email });
    
        if (!user) {
          return res.status(404).json("Invalid credentials");
        }
    
        const correctPass = await bcrypt.compare(password, user.password);
    
        if (!correctPass) {
          return res.status(401).json('Invalid password');
        }
    
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);
         res.status(200).cookie("token", token, {httpOnly: true}).json(`Welcome back ${user.username}`);
        
    
      } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error");
      }
    }

export const userProfile = (req, res) => {
      res.status(200).json({
        success: true,
        user: req.user
      });
   
};

export const userLogout = async (req, res) => {
  try {
    res.status(200).cookie("token", "" ,{expires: new Date(Date.now())}).json("user logged out successfully");

  } catch (error) {
    res.status(404).json({message: error.message})
    
  }
}



export const userFollow = async (req, res) => {
  try {
    const loggedInUser = req.user; 
    const heroUserId = req.params.id;
    

    const heroUser = await User.findById(heroUserId);
    if (!heroUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (loggedInUser.following.includes(heroUser._id)) {
      return res.status(409).json({ error: "You are already following this user" });
    }

    loggedInUser.following.push(heroUser._id);
    await loggedInUser.save();

    if (heroUser.followers.includes(loggedInUser._id)) {
      return res.status(409).json({ error: "You are already following this user" });
    }

    heroUser.followers.push(loggedInUser._id);
    await heroUser.save();

    return res.status(200).json({ message: "You followed the user successfully" });
  } catch (error) {
    console.error("Error in userFollow controller:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

    