import { Request, Response } from 'express';
import { getUniversityCSVFile } from '../services/getUniversityCSVFile';

export const downloadUniversityCSVController = async (req: Request, res: Response): Promise<void> => {
  const { path, exists } = getUniversityCSVFile();

  if (!exists) {
    res.status(404).json({ error: 'CSV file not found.' });
    return;
  }

  try {
    res.download(path, 'universities.csv', (err) => {
      if (err) {
        console.error('Error sending CSV file:', err);
        res.status(500).json({ error: 'Failed to download CSV file.' });
      }
    });
  } catch (error: any) {
    console.error('Error in downloadUniversityCSVController:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
