import axios from 'axios';
import { UniversityRaw } from '../models/university';

const BASE_URL = 'http://universities.hipolabs.com/search';
const PAGE_SIZE = 100;

/**
 * Async generator: Sayfa sayfa verileri çekip tek tek yield eder.
 */
export async function* fetchUniversityDataStream(): AsyncGenerator<UniversityRaw> {
  let offset = 0;
  let keepGoing = true;

  while (keepGoing) {
    const url = `${BASE_URL}?country=United+States&limit=${PAGE_SIZE}&offset=${offset}`;
    console.log(`📡 Fetching: offset ${offset}`);

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
        yield record; // 💡 tek tek stream edilir
      }

      offset += PAGE_SIZE;
    } catch (error) {
      console.error(`❌ Hata (offset ${offset}):`, error);
      keepGoing = false;
    }
  }

  console.log(`✅ Stream sona erdi.`);
}
