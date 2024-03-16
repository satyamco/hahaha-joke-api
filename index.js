import dotenv from "dotenv";
import express from 'express';
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js"
import postRouter from "./routes/post.routes.js"
import { connectToDatabase } from "./db/index.js";
dotenv.config({
    path: ".env"
})


export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

app.use("/api", userRouter);
app.use("/api/", postRouter);



connectToDatabase();
