import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';
import cors from "cors";

import { app, server } from '../socket/socket.js';
import connectToMongoDB from '../db/connectToMongoDB.js';

import globalErrorHandler from '../middlewares/globalErrorHandler.js';
import missingRouteHandler from '../middlewares/missingRouteHandler.js';

import authRouter from '../routes/api/auth.routes.js';
import usersRouter from '../routes/api/user.routes.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  "https://chit-chat-client-ivn.vercel.app",
  "http://localhost:8100",
];

// CORS configuration for HTTP routes
const corsOptions = {
  origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },
  methods: ["OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "X-CSRF-Token"],
  exposedHeaders: ["set-cookie"],
};

// Apply the CORS middleware to all HTTP routes
app.use(cors(corsOptions));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});


app.use(express.json({ limit: '50mb' })); // to parse the incoming requests with JSON payloads (from req.body)
app.use(express.urlencoded({ limit: '50mb', extended: true })); // to parse form data (from req.body)

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,PATCH,DELETE');
      res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
  }
  next();
});

app.use(cookieParser());

app.use((req, res, next) => {
  console.log('Cookies: ', req.cookies);
  next();
});

app.use('/api/test', (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Welcome to the API from Vercel",
    timestamp: new Date().toISOString()
  });
});

app.use("/api/auth", authRouter);

app.use("/api/users", usersRouter);


app.use(missingRouteHandler);
app.use(globalErrorHandler);

  
server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server ready on port ${PORT}`);
});