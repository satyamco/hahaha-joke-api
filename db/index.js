import mongoose from "mongoose";
import {app} from "../index.js";


export const connectToDatabase = () =>{
    mongoose.connect(`${process.env.MONGODB_URI}/hahaha`)
.then(() =>{
    console.log("database connected successfully");
    app.listen(process.env.PORT, ()=>{
        console.log(`app listening on port ${process.env.PORT}`);
    })
})
.catch(err => {
    console.log("database connection failed: " + err.message)
})

}