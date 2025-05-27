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

// Initializes a writable CSV stream

export function createCSVWriter() {
  const stream = fs.createWriteStream(OUTPUT_PATH, { flags: 'w' });

  const header = stringify([['name', 'country', 'domain', 'website']]);
  stream.write(header);

  return {
    write: (row: University) => {
      const csvRow = stringify([[row.name, row.country, row.domain, row.website]]);
      stream.write(csvRow);
    },

    close: () => stream.end()
  };
}
