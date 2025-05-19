import mongoose from "mongoose";
import user from "../modals/userModal.js";
import bcrypt from 'bcrypt';
import { uploadToCloudinary } from "../service/cloudinary.js";
import jwt from 'jsonwebtoken';
import { generateOtp } from "../service/generateOtp.js";
import  { sendMail } from "../service/sendMail.js";
import 'dotenv/config';




export const register = async (req, res) => {
    const {name, userName, email, phone} = req.body;
    const imageObj = await uploadToCloudinary(req.file.buffer);
    try {
        const existingEmail = await user.findOne({email});

        if(existingEmail){
            return res.status(400).send({message: "Given email address exists. Please try with another email."})
        }

        const existingUserName = await user.findOne({userName});

        if(existingUserName){
            return res.status(400).send({message: `Username ${userName} exists.`});
        }

        if(!email.includes("@")){
            return res.status(400).send({message: "Email must contain a @ symbol."});
        }

        const password = await bcrypt.hash(req.body.password, 10);
        
        const newUser = await user({
            name,
            userName,
            email,
            password,
            phone,
            profilePic: imageObj.secure_url
        });

        await newUser.save();

        res.status(201).send({message: "User registered successfully", newUser});

    } catch (error) {
        res.status(500).send({message: "Error in registering user", error});
    }
}


export const login = async (req, res) => {
  const { emailOrPhone, password } = req.body;

  try {
    const userToLogin = await user.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }]
    });

    if (!userToLogin) {
      return res.status(401).send({ message: "Incorrect credentials" });
    }

    const passwordMatched = await bcrypt.compare(password, userToLogin.password);

    if (!passwordMatched) {
      return res.status(401).send({ message: "Incorrect credentials" });
    }

    const token = jwt.sign(
      {
        userId: userToLogin._id,
        username: userToLogin.userName,
        useremail: userToLogin.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '24h'
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000
    });

    const loggedInUser = {
      _id: userToLogin._id,
      name: userToLogin.name,
      userName: userToLogin.userName,
      email: userToLogin.email,
      phone: userToLogin.phone,
    };

    res.status(200).send({
      message: `Welcome to chat app, ${userToLogin.userName}. You are logged in successfully.`,
      loggedInUser
    });

  } catch (error) {
    res.status(500).send({ message: "Error in logging in.", error });
  }
};



export const logout = async (req, res) => {
    try {
        res.clearCookie("token",
            {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            });
          res.status(200).send({message: "You are logged out successfully"});
    } catch (error) {
        res.status(500).send({message: "Error in logging out user", error});
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await user.find();

        res.status(200).send({message: "Success", allUsers});
    } catch (error) {
        res.status(500).send({message: "errror in getting all users details", error});
    }
}

export const getSingleUser = async (req, res) => {
    const {id} = req.params;
    try {
        const singleUser = await user.findById(id);

        if(!singleUser){
            return res.status(404).send({message: "User not found"});
        }

        res.status(200).send({message: "success", singleUser});
    } catch (error) {
        res.status(500).send({message: "error in getting single user", error});
    }
}

export const updateUser = async (req, res) => {
   const {name, userName, email} = req.body;
    try {
    const userToUpdate = await user.findByIdAndUpdate(req.User._id, {
          name,
          userName,
          email
    });

    res.status(200).send({message: "profile updated successfully", userToUpdate});
    } catch (error) {
       res.status(500).send({message: "Error in updating user", error}); 
    }
}

export const deleteUser = async (req, res) => {
    const {id} = req.params;
    try {
       if(!id){
           return res.status(400).send({message: "You must specify a User ID"})
       }
   
       if(!mongoose.Types.ObjectId.isValid(id)){
           return res.status(404).send({message: "The user ID is not in proper format"});
       }
   
       const deletedUser = await user.findByIdAndDelete(id);
   
       if (!deletedUser)
           return response
             .status(404)
             .send({ message: "No user found with the given ID" });
     
         res.send({ message: "User with the given ID deleted" });
    } catch (error) {
         res.status(500).send({message: "Error deleting user", error});
    }
}


export const forgotPassword = async (req, res) => {
    const {email} = req.body;
    try {
        if(!email){
            return res.status(400).send({message: "user email is required"});
        }

        const User = await user.findOne({email});

        if(!User){
            return res.status(404).send({message: "User does not exist"});
        }

        const subject = 'Reset Passwword';
        const body = generateOtp();
        const otp = body;
        await sendMail(process.env.USER_EMAIL, process.env.USER_PASSWORD, User.email, subject, otp);
        await updateOtp(User._id, otp);
        res.status(200).json({ message: 'Password reset email sent successfully' });

    } catch (error) {
        res.status(500).send({message: "Error in forgetting password", error});
    }
}

export async function verifyOtp(req, res){
    const {email, otp} = req.body;
    const User = await user.findOne({email: email});
    if(!User){
        return res.status(401).json({message: "User not found"});
    }
    if(User.otp === otp && Date.now() < User.validFor){
        User.otpIsValid= true;
        User.save();
        res.status(200).json({message: 'OTP is verified successfully'});
    }
    else{
        res.status(401).json({message: 'Invalid Otp'});
    }
  }
  
  
  export async function changePassword(req, res){
    const {email, password} = req.body;
    
    const User = await user.findOne({email: email});
    if(!User){
        res.status(401).json({message: "User not found"});
    }
  
    if(!User.otpIsValid){
      return res.status(400).json({message: "OTP verifucation is required"});
    }
  
    const hashPassword = await bcrypt.hash(password, 10);
    await user.findByIdAndUpdate(
        User._id,
        {password: hashPassword},
        {new: true, upsert: false}
   );
   res.status(200).json({message: 'Password updated successfully'});
  }
  
  async function updateOtp(userId, otp){
    try {
        const validFor = Date.now() + 5 * 60 * 1000;
        const updatedUser = await user.findByIdAndUpdate(
             userId,
             {otp, validFor, otpIsValid: false},
             {new: true, upsert: false}
        );
  
        if(!updatedUser){
            res.status(401).json({message: "User not found"});
            return null;
            
        }
        return updatedUser;
    } catch (error) {
        console.error('Error updating OTP: ', error);
        throw error;
    }
  }