import mongoose from 'mongoose';
import { connectMongo } from '../../config/db';
import { upsertUniversity } from '../../services/upsert';
import { UniversityModel } from '../../models/university';
import { University } from '../../models/university';

describe('MongoDB upsertUniversity function', () => {
  const mockUniversity: University = {
    name: 'Test University',
    country: 'United States',
    domain: 'test.edu',
    website: 'https://www.test.edu',
  };

  beforeAll(async () => {
    await connectMongo();
    await UniversityModel.deleteMany({ name: mockUniversity.name }); // Clean slate
  });

  afterAll(async () => {
    await UniversityModel.deleteMany({ name: mockUniversity.name }); // Cleanup
    await mongoose.disconnect();
  });

  it('should insert a new university record', async () => {
    await upsertUniversity(mockUniversity);

    const found = await UniversityModel.findOne({ name: mockUniversity.name });
    expect(found).not.toBeNull();
    expect(found?.domain).toBe(mockUniversity.domain);
  });

  it('should update existing university if already exists', async () => {
    const updatedUniversity = {
      ...mockUniversity,
      website: 'https://www.updated-test.edu'
    };

    await upsertUniversity(updatedUniversity);

    const found = await UniversityModel.findOne({ name: mockUniversity.name });
    expect(found?.website).toBe(updatedUniversity.website);
  });
});
