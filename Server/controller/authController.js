import 'dotenv/config';
import jwt from 'jsonwebtoken';


export default async function validateToken(req,res){
    const token = req.cookies.token;

    if (!token)
        return res
          .status(401)
          .send({ message: "No token found. Cannot Authorize" });
    
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
        res.status(200).send({ message: "User is authenticated" });
      
   } catch (error) {
    res.status(500).send({message : "error", error});
   }
}