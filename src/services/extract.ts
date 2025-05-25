import axios from 'axios';
import { UniversityRaw } from '../models/university';

const BASE_URL = 'http://universities.hipolabs.com/search';
const PAGE_SIZE = 100;

/**
 * Asynchronously streams university records from the Hipolabs API.
 * Fetches paginated data and yields each university entry individually.
 */

export async function* fetchUniversityDataStream(): AsyncGenerator<UniversityRaw> {
  let offset = 0;
  let keepGoing = true;

  while (keepGoing) {
    const url = `${BASE_URL}?country=United+States&limit=${PAGE_SIZE}&offset=${offset}`;
    console.log(`📡 Fetching data — offset: ${offset}`);

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
        break;
      }

      for (const record of pageData) {
        yield record;
      }

      offset += PAGE_SIZE;
    } catch (error) {
      console.error(`❌ Error fetching data at offset ${offset}:`, error);
      keepGoing = false;
    }
  }

  console.log(`✅ Streaming completed.`);
}
