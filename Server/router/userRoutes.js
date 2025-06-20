import express from 'express';
import { changePassword, deleteUser, forgotPassword, getAllUsers, getSingleUser, login, logout, register, updateUser, verifyOtp } from '../controller/userController.js';
import upload from '../middlewares/multer.js';
import { protectedRoute } from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/register', upload.single("profileImage"), register);
userRouter.post('/login', login);
userRouter.post('/logout', logout);

userRouter.get('/getAllUsers', getAllUsers);
userRouter.get('/getSingleUser/:id', getSingleUser);

userRouter.put('/update', protectedRoute, upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'coverImage', maxCount: 1 },
]), updateUser);
userRouter.delete('/delete/:id', deleteUser);

userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/verify-otp', verifyOtp);
userRouter.post('/change-password', changePassword);


export default userRouter;