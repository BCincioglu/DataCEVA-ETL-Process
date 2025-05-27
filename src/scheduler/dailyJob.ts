import cron from 'node-cron';
import dotenv from 'dotenv';
import { logger } from '../utils/logger';
import { runETL } from '../scripts/etlScript';
import { sleep } from '../utils/sleep';

dotenv.config();

const CRON_EXPRESSION = process.env.CRON_EXPRESSION || '0 0 * * *';
const CRON_TIMEZONE = process.env.CRON_TIMEZONE || 'UTC';
const RETRY_DELAY_MS = Number(process.env.RETRY_DELAY_MS) || 300000; // 5 minutes


export async function scheduledJobForETL() {
  let attempt = 1;

  while (true) {
    try {
      logger.info(`[Attempt ${attempt}] Running ETL process...`);
      await runETL();
      logger.info('ETL completed successfully.');
      break; // break after successful execution
    } catch (err) {
      logger.error(`[Attempt ${attempt}] ETL failed. Retrying in ${RETRY_DELAY_MS / 60000} minutes...`);
      attempt++;
      await sleep(RETRY_DELAY_MS);
    }
  }
}


logger.info(`Scheduling ETL job with expression "${CRON_EXPRESSION}" (${CRON_TIMEZONE})`);

try {
  cron.schedule(
    CRON_EXPRESSION,
    () => {
      logger.info('Cron job triggered. Starting ETL...');
      scheduledJobForETL();
    },
    {
      timezone: CRON_TIMEZONE,
    }
  );
} catch (err) {
  logger.error('Failed to schedule cron job:', err);
}
