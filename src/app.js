import express from 'express';
import logger from '#config/logger.js';
import helmet from "helmet";
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import authRouter from "#routes/authRoutes.js"
import { timestamp } from 'drizzle-orm/gel-core';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use(morgan("combined",{stream:{write:(message)=>logger.info(message.trim())}}))

app.get('/',(req, res) => {
  logger.info("hello from Aquasitions")
  res.send('Hello World!');
});

app.get("/health", (req,res)=>{
  res.status(200).json({status:"ok", timestamp:new Date().toISOString(), uptime: process.uptime()})
})

app.get("/api", (req,res)=>{
  res.status(200).json({message:"Acquisitions api is running"})
})

app.use("/api/auth",authRouter)

export default app;
