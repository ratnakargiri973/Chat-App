import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import { connectDB } from './DB/dbConnector.js';
import userRouter from './router/userRoutes.js';
import cookieParser from 'cookie-parser';
import authRouter from './router/authRoute.js';

const PORT = process.env.PORT;

const app = express();

const corsOption = {
    origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}

app.use(cors(corsOption));
app.use(cookieParser());

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);


await connectDB();
app.listen(PORT, ()=>{
    console.log(`Server started at port ${PORT}`)
});
