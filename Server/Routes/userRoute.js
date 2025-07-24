import express from 'express';
import { checkAuth, login, signup, updateProfile } from '../Controllers/userController.js';
import userAuth from '../Middleware/userAuth.js';



const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.get('/check', userAuth, checkAuth);
userRouter.put('/update-profile', userAuth, updateProfile);

export default userRouter;