import cron from 'node-cron';
import { runETL } from '../scripts/etlScript'; // ETL runner'ı dışarıya export etmelisin
import { logger } from '../utils/logger';

logger.info('🕒 ETL Scheduler initialized. Task will run every 24 hours.');

// Schedule to run every 24 hours at Midnight UTC.
cron.schedule(
  process.env.CRON_EXPRESSION!,
  async () => {
    logger.info(`⏰ Scheduled ETL task started (${process.env.CRON_TIMEZONE})...`);
    try {
      await runETL();
      logger.info('✅ Scheduled ETL task completed successfully.');
    } catch (err) {
      logger.error('❌ Scheduled ETL task failed:', err);
    }
  },
  {
    timezone: process.env.CRON_TIMEZONE || 'UTC',
  }
);
