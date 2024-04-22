import express, { Express } from 'express'
import { Port } from './env'
import routes from './src/route/customer'
import cors from 'cors';
import helmet from 'helmet';

const app: Express = express()
app.use(express.json())
routes(app)
process.env.Port || 3000
// Middleware for CORS
app.use(cors());

// Middleware for Helmet
app.use(helmet());

app.listen(Port, () => {
  console.log(`Server is running on ${Port}`)
})
