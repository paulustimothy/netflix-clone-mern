import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndSetCookie = (userId, res) => {
    // generate a token based on the userId
    const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "15d" });

    res.cookie("jwt-netflix", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true, // prevent client side js from accessing the cookie
        sameSite: "strict", // prevent csrf attacks
        secure: ENV_VARS.NODE_ENV !== "development", // only send the cookie over https in production
    })

    return token;
}
