import { UniversityRaw } from '../models/university';
import { University } from '../models/university';

/**
 * Transforms a raw university record into a normalized format.
 * Extracts the first domain and web page, and trims name and country.
 *
 * @param record - The raw university data received from the API
 * @returns A cleaned and standardized University object
 */
export function transformUniversity(record: UniversityRaw): University {
  return {
    name: record.name.trim(),
    country: record.country.trim(),
    domain: record.domains[0]?.trim() || '',
    website: record.web_pages[0]?.trim() || '',
  };
}
