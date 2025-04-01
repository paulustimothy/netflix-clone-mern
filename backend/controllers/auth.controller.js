import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email address" });
    }

    if(password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }
    
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ success: false, message: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const profilePicture = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = profilePicture[Math.floor(Math.random() * profilePicture.length)];

    const newUser = new User({ username, email, password: hashedPassword, image });

    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();

    res.status(201).json({ success: true, message: "User created successfully", user: {
        ...newUser._doc,
        password: "",
    } });

  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function login(req, res) {
  try {
    const {username, email, password} = req.body;

    if(!email && !username && !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({
        $or:[
            {email},
            {username}
        ]})
    if(!user){
        return res.status(404).json({success: false, message: "Invalid credentials"});
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if(!isPasswordCorrect){
        return res.status(400).json({success: false, message: "Invalid credentials"})
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
        success: true,
        user: {
            ...user._doc,
            password: ""
        }
    })

  } catch (error) {
    console.log("Error in login controller", error.message);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("jsw-netflix");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Error logging out:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

