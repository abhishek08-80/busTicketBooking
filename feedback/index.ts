// eslint-disable-next-line @typescript-eslint/no-unused-vars
import express, { Express } from 'express';
import dotenv from 'dotenv';
import Routes from './src/route/feedback';
import cors from 'cors';
// import grpc from '@grpc/grpc-js';
// import helmet from 'helmet';
dotenv.config();
const app: Express = express();
app.use(express.json());
// Middleware for Helmet
// app.use(helmet());

app.use('/feedback', Routes);

process.env.Port || 3005;

// Middleware for CORS
app.use(cors());

app.listen(process.env.Port, () => {
  console.log(`Server is running on ${process.env.Port}`);
});
