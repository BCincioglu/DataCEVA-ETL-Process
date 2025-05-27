import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { logger } from './utils/logger';
import universityRoutes from './routes/universityRoute';
import { scheduledJobForETL }  from './scheduler/dailyJob';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', universityRoutes);

scheduledJobForETL();

app.listen(port, () => {
  logger.info(`🚀 Server running on http://localhost:${port}`);
});
