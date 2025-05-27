import dotenv from 'dotenv';
import { logger } from '../utils/logger';
dotenv.config();

import { fetchUniversityDataStream } from '../services/extract';
import { transformUniversity } from '../services/transform';
import { createCSVWriter } from '../services/load';
import { hasDataChanged, saveCurrentHash } from '../utils/hash';

/**
 * Main ETL runner. Orchestrates data extraction, transformation and loading.
 */
export async function runETL() {
  logger.info('🚀 Starting ETL process...');

  const rawData = [];

  try {
    for await (const rawRecord of fetchUniversityDataStream()) { // Extract all the data first, for checking hash.
      rawData.push(rawRecord);
    }

    if (!hasDataChanged(rawData)) { // If hash is the same, other actions not necessary.
      logger.info('Source data hash is unchanged. Skipping ETL to avoid redundant processing.');
      return;
    }

    const writer = createCSVWriter();
    let count = 0;

    for (const rawRecord of rawData) {
      const transformed = transformUniversity(rawRecord);
      writer.write(transformed);
      count++;
    }

    writer.close();
    saveCurrentHash(rawData);
    logger.info(`✅ ETL process completed. ${count} record(s) written to CSV.`);
  } catch (err) {
    logger.error('❌ ETL process failed:', err);
  }
}

runETL();
