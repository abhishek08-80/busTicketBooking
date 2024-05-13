import express, { Express } from 'express';
import Routes from './src/route/customerRoutes';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { empServer } from './src/server/server';
dotenv.config();
empServer();
const app: Express = express();
app.use(express.json());

app.use('/customer', Routes);
process.env.Port || 3002;
// Middleware for CORSa
app.use(cors());

// Middleware for Helmet
app.use(helmet());

app.listen(process.env.Port, () => {
  console.log(`Server is running on ${process.env.Port}`);
});