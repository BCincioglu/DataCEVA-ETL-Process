import { UniversityRaw } from '../models/university';
import { University } from '../models/university';

/**
 * Transforms a raw university record into a normalized format.
 *
 * @param record - The raw university data received from the API
 * @returns A cleaned and standardized University object
 */
export function transformUniversity(raw: UniversityRaw): University {
  return {
    name: raw.name.trim(),
    country: raw.country.trim(),
    domain: raw.domains[0],
    website: raw.web_pages[0],
    alpha_two_code: raw.alpha_two_code?.trim(),
    state_province: raw.state_province?.trim(),
  };
}

