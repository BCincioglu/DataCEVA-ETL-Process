import fs from 'fs';
import path from 'path';
import { hasDataChanged, saveCurrentHash } from '../../utils/hash';

const HASH_FILE_PATH = path.resolve('.last-hash.txt');

describe('Hash Utilities', () => {
  const sampleData = { name: 'Test University', country: 'USA' };
  const modifiedData = { name: 'Modified University', country: 'USA' };

  afterEach(() => {
    // Temizlik: hash dosyasını sil
    if (fs.existsSync(HASH_FILE_PATH)) {
      fs.unlinkSync(HASH_FILE_PATH);
    }
  });

  test('returns true if no hash file exists', () => {
    const result = hasDataChanged(sampleData);
    expect(result).toBe(true);
  });

  test('returns false if data has not changed', () => {
    saveCurrentHash(sampleData);
    const result = hasDataChanged(sampleData);
    expect(result).toBe(false);
  });

  test('returns true if data has changed', () => {
    saveCurrentHash(sampleData);
    const result = hasDataChanged(modifiedData);
    expect(result).toBe(true);
  });
});
