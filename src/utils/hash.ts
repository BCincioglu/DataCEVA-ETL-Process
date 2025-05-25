import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const HASH_FILE_PATH = path.resolve('.last-hash.txt');

/**
 * Returns SHA-256 hash of a string
 */
export function computeHash(data: string): string {
  return crypto.createHash('sha256').update(data).digest('hex');
}

/**
 * Compares the hash of current data with last known hash.
 * @returns true if hash is different (data changed), false otherwise
 */
export function hasDataChanged(currentData: unknown): boolean {
  const json = JSON.stringify(currentData);
  const currentHash = computeHash(json);

  if (!fs.existsSync(HASH_FILE_PATH)) {
    return true; // No hash yet — treat as changed
  }

  const previousHash = fs.readFileSync(HASH_FILE_PATH, 'utf-8').trim();

  return currentHash !== previousHash;
}

/**
 * Writes the current hash to disk
 */
export function saveCurrentHash(data: unknown): void {
  const json = JSON.stringify(data);
  const hash = computeHash(json);
  fs.writeFileSync(HASH_FILE_PATH, hash);
}
