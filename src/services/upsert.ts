import { UniversityModel } from '../models/university';
import { University as UniversityType } from '../models/university';
import { logger } from '../utils/logger';

/**
 * Inserts or updates a university document based on its domain.
 */
export async function upsertUniversity(university: UniversityType): Promise<void> {
  try {
    await UniversityModel.updateOne(
      { domain: university.domain }, 
      { $set: university },          
      { upsert: true }               
    );
    logger.debug(`Upserted: ${university.name}`);
  } catch (error) {
    logger.error(`❌ Failed to upsert university: ${university.name}`, error);
  }
}