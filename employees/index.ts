// eslint-disable-next-line @typescript-eslint/no-unused-vars
import express, { Express } from 'express'
import { Port } from './env'
import routes from './src/route/customer'
import cors from 'cors';
import helmet from 'helmet';

const app: Express = express()

app.use(express.json())
// Middleware for Helmet
app.use(helmet());

routes(app)
process.env.Port || 3001

// Middleware for CORS
app.use(cors());

app.listen(Port, () => {
  console.log(`Server is running on ${Port}`)
})
