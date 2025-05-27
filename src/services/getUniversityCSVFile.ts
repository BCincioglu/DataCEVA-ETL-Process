import fs from 'fs';
import path from 'path';

export const getUniversityCSVFile = (): { path: string; exists: boolean } => {
  const filePath = path.resolve(__dirname, '../../data/universities.csv');
  const exists = fs.existsSync(filePath);

  return { path: filePath, exists };
};
