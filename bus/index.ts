import express, { Express } from 'express';
import dotenv from 'dotenv';
import Routes from './src/route/bus';
import cors from 'cors';
import helmet from 'helmet';
import cors from 'cors';
import { empServer } from './src/server/server'

dotenv.config();
empServer();
const app: Express = express();
app.use(express.json());

app.use('/bus', Routes);
process.env.Port || 3003;
// Middleware for CORSa
app.use(cors());

// Middleware for Helmet
app.use(helmet());

app.listen(process.env.Port, () => {
  console.log(`Server is running on ${process.env.Port}`);
});
 