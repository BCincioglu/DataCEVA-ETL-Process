import fs from 'fs';
import path from 'path';
import { createCSVWriter } from '../../services/load';
import { University } from '../../models/university';

const outputPath = path.resolve(__dirname, '../../../data/universities.csv');

describe('createCSVWriter', () => {
  const mockData: University[] = [
    {
      name: 'Test University',
      country: 'United States',
      domain: 'test.edu',
      website: 'https://www.test.edu',
    },
    {
      name: 'Another University',
      country: 'United States',
      domain: 'another.edu',
      website: 'https://www.another.edu',
    },
  ];

  afterEach(() => {
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }
  });

  it('should write correct CSV output with headers and records', async () => {
    const writer = createCSVWriter();

    mockData.forEach(writer.write);
    writer.close();

    // Wait for stream flush to complete
    await new Promise(resolve => setTimeout(resolve, 500));

    const content = fs.readFileSync(outputPath, 'utf-8');
    const lines = content.trim().split('\n');

    expect(lines.length).toBe(mockData.length + 1); // +1 for header
    expect(lines[0]).toBe('name,country,domain,website'); // header line
    expect(lines[1]).toContain('Test University');
  });
});
