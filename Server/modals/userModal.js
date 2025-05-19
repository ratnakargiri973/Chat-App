import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
       type: String,
       required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    profilePic: {
        type: String,
        default: null
    },
    otp: {
        type: String,
        default: null
    },
    otpIsValid: {
        type: Boolean,
        default: false
    },
    validFor: {
        type: Date,
        default: null
    },
    bio: {
         type: String,
    }
})

const user = mongoose.model("user", userSchema);
export default user;