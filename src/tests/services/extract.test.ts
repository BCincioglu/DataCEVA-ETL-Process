import { fetchUniversityDataStream } from '../../services/extract';

describe('fetchUniversityDataStream', () => {
  it('should stream at least 5 university records', async () => {
    const universities = [];
    let count = 0;

    for await (const uni of fetchUniversityDataStream()) {
      universities.push(uni);
      count++;
      if (count >= 5) break;
    }

    expect(universities.length).toBeGreaterThanOrEqual(5);
    expect(universities[0]).toHaveProperty('name');
    expect(universities[0]).toHaveProperty('country');
  });
});
