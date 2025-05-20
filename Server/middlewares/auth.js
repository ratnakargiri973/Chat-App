import jwt from 'jsonwebtoken';
import 'dotenv/config';
import user from '../modals/userModal.js';

export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if(!token){
            return res.status(401).send({message: "No token, authorization is denied"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        if(decoded.exp < Date.now() / 1000){
            return res.status(401).json({message: "Token expired"});
        }

        const User = await user.findById(decoded.userId).select("-password");

        if(!User){
            return res.status(401).json({message: "User no longer exists"});
        }

        req.User = User;
        next();

    } catch (error) {
       res.status(401).send({message: "Not authorized", error}); 
    }
}