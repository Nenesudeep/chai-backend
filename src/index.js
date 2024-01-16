
import express from 'express';
import dotenv from 'dotenv'
import connectDB from './db/dataBase.js'

const app = express();


dotenv.config({
    path:'./env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 , ()=>{
        `Server is running on ${process.env.PORT}`
    })
})
.catch((err)=>{
    console.log("Database connection Failed Due to Error:",err)
});