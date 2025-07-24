import User from "../Schema/userSchema.js";
import jwt from "jsonwebtoken";


// middleware protect routes
const userAuth = async (req, res, next) => {
    try{

        const token = req.headers.token;

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.userId).select("-password")

        if (!user) return res.json({success: false, message: "User not found"})

        req.user = user
        next()

    } catch (err) {
        console.log(err.message);
        
        return res.json({ success: false, message: err.message });
    }
};

export default userAuth;