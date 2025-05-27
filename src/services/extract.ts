import axios from 'axios';
import { University, UniversityRaw } from '../models/university';
import { logger } from '../utils/logger';
import { sleep } from '../utils/sleep';

const BASE_URL = process.env.BASE_URL || 'http://universities.hipolabs.com/search';
const PAGE_SIZE = parseInt(process.env.PAGE_SIZE || '100', 10);
const MAX_RETRIES = parseInt(process.env.MAX_RETRIES || '3', 10);
const RETRY_DELAY_MS = parseInt(process.env.RETRY_DELAY_MS || '2000', 10);


/**
 * Asynchronously streams university records from the Hipolabs API.
 * Includes retry mechanism per page fetch.
 */
export async function* fetchUniversityDataStream(): AsyncGenerator<UniversityRaw> {
  let offset = 0;
  let keepGoing = true;

  while (keepGoing) {
    const url = `${BASE_URL}?country=United+States&limit=${PAGE_SIZE}&offset=${offset}`;
    logger.info(`📡 Fetching data — offset: ${offset}`);

    let retries = 0;
    let success = false;

    while (retries < MAX_RETRIES && !success) {
      try {
        const res = await axios.get<UniversityRaw[]>(url, {
          timeout: 10000,
          headers: {
            'Accept': 'application/json',
            'Accept-Encoding': 'identity',
            'User-Agent': 'PostmanRuntime/7.36.1',
          }
        });

        const pageData = res.data;

        if (pageData.length === 0) {
          keepGoing = false;
          logger.info('✅ No more data to fetch. Streaming completed.');
          break;
        }

        for (const record of pageData) {
          yield record;
        }

        offset += PAGE_SIZE;
        success = true;
      } catch (error: any) {
        retries++;
        logger.warn(`⚠️ Error fetching offset ${offset} (attempt ${retries}): ${error.message}`);

        if (retries < MAX_RETRIES) {
          logger.info(`⏳ Retrying in ${RETRY_DELAY_MS / 1000}s...`);
          await sleep(RETRY_DELAY_MS);
        } else {
          logger.error(`💥 Max retries reached for offset ${offset}. Skipping.`);
          offset += PAGE_SIZE;
          break;
        }
      }
    }
  }
}
