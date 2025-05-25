import fs from 'fs';
import path from 'path';
import { stringify } from 'csv-stringify/sync';
import { University } from '../models/university';
import dotenv from 'dotenv';

dotenv.config();

const OUTPUT_PATH = path.resolve(process.env.DATA_OUTPUT_PATH || './data/universities.csv');
const OUTPUT_DIR = path.dirname(OUTPUT_PATH);

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Ensure the output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Initializes a writable CSV stream and provides methods to write and close.
 *
 * @returns CSV writer with write() and close() functions
 */
export function createCSVWriter() {
  const stream = fs.createWriteStream(OUTPUT_PATH, { flags: 'w' });

  // Write CSV headers
  const header = stringify([['name', 'country', 'domain', 'website']]);
  stream.write(header);

  return {
    /**
     * Writes a single university record as a CSV row.
     *
     * @param row - The transformed university data
     */
    write: (row: University) => {
      const csvRow = stringify([[row.name, row.country, row.domain, row.website]]);
      stream.write(csvRow);
    },

    /**
     * Closes the CSV file stream.
     */
    close: () => stream.end()
  };
}
