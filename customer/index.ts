import express, { Express } from 'express';
import Routes from './src/route/customerRoutes';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();
app.use(express.json());

app.use('/customer', Routes);
process.env.Port || 3001;
// Middleware for CORSa
app.use(cors());

// Middleware for Helmet
app.use(helmet());

app.listen(process.env.Port, () => {
  console.log(`Server is running on ${process.env.Port}`);
});