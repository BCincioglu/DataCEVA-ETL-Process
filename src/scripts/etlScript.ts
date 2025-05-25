import dotenv from 'dotenv';
import { logger } from '../utils/logger';
dotenv.config();

import { fetchUniversityDataStream } from '../services/extract';
import { transformUniversity } from '../services/transform';
import { createCSVWriter } from '../services/load';

/**
 * Main ETL runner. Orchestrates data extraction, transformation and loading.
 */
async function runETL() {
  logger.info('🚀 Starting ETL process...');

  const writer = createCSVWriter();
  let count = 0;

  try {
    for await (const rawRecord of fetchUniversityDataStream()) {
      const transformed = transformUniversity(rawRecord);
      writer.write(transformed);
      count++;
    }

    writer.close();
    logger.info(`✅ ETL process completed. ${count} record(s) written to CSV.`);
  } catch (err) {
    logger.error('❌ ETL process failed:', err);
    writer.close(); // Ensure the file stream is closed even on error
  }
}

runETL();
