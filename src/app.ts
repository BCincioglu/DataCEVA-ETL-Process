import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser'
import { logger } from './utils/logger';
import universityRoutes from './routes/universityRoute';


const app: Application = express();
const port = process.env.PORT || 3000;
dotenv.config();

app.use(bodyParser.json());

app.use('/api', universityRoutes);



app.listen(port, () => {
    logger.info(`Server running on http://localhost:${port}`);
  });