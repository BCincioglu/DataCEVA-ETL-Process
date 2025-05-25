import { transformUniversity } from '../../services/transform';
import { UniversityRaw } from '../../models/university';
import { University } from '../../models/university';

describe('transformUniversity', () => {
  it('should properly trim and map university fields', () => {
    const input: UniversityRaw = {
      name: '  Test University ',
      country: ' United States ',
      domains: ['test.edu'],
      web_pages: ['https://www.test.edu']
    };

    const expected: University = {
      name: 'Test University',
      country: 'United States',
      domain: 'test.edu',
      website: 'https://www.test.edu'
    };

    const result = transformUniversity(input);

    expect(result).toEqual(expected);
  });
});
