import User from '../Schema/userSchema.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js'


// Register or SignUp
export const signup = async (req, res) => {
    try {

        const { fullName, email, password, bio } = req.body;

        if (!fullName || !email || !password || !bio) {
           return res.json({ success: false, msg: 'Missing details' });
        }


        const user = await User.findOne({ email });
        if (user) return res.json({ success: false, msg: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({fullName, email, password:hashPassword, bio})
        const token = generateToken(newUser._id)

        res.json({ success: true, userData : newUser, token, message : 'Account created successfully' });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Login
export const login = async (req, res) => {

    try {

        const { email, password } = req.body;
    
        if (!email || !password) {
          return res.json({ success: false, msg: 'Email and Password are required' });
        }

        const userData = await User.findOne({ email });
        if (!userData) return res.json({ success: false, msg: 'User not found!' });

        const isPassword = await bcrypt.compare(password, userData.password);
        if (!isPassword) return res.json({ success: false, msg: 'Invalid password' });

        const token = generateToken(userData._id)

       res.json({ success: true, userData, token, message : 'Login successfull' });
    } catch (error) {
        console.log(error.message);
        
        res.json({ success: false, message: err.message });
    }
};

// Logout
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict'
        });
        res.json({ success: true, msg: 'Logged Out' });
    } catch (err) {
        res.json({ success: false, msg: err.message });
    }
};

// Check if user is Authenticated 
export const checkAuth = async (req, res) => {
        return res.json({success : true, user: req.user});
}

// Update User Profile
export const updateProfile = async (req,res) => {

    try {

        const {  profilePic, fullName, bio  } = req.body;

        const userId = req.user._id;

        let updatedUser;

        if(!profilePic){

            updatedUser = await User.findByIdAndUpdate(userId, {bio, fullName},{new : true});
        }else{

            const upload = await cloudinary.uploader.upload(profilePic);
            updatedUser = await User.findByIdAndUpdate(userId, {profilePic : upload.secure_url, bio, fullName},{new : true});
        } 

        res.json({success : true,user : updatedUser});
    } catch (err) {
        console.log(err.message);
        
        res.json({ success: false, msg: err.message });
    }
}