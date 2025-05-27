// src/models/university.ts

import mongoose from 'mongoose';

export interface UniversityRaw {
  name: string;
  country: string;
  domains: string[];
  web_pages: string[];
  alpha_two_code?: string;
  state_province?: string;

  // Other unknown fields, safely ignored
  [key: string]: any;
}

export interface University {
  name: string;
  country: string;
  website: string;
  domain: string;
  alpha_two_code?: string;
  state_province?: string;
}

const universitySchema = new mongoose.Schema<University>(
  {
    name: { type: String, required: true },
    country: { type: String, required: true },
    website: { type: String, required: true },
    domain: { type: String, required: true },
    alpha_two_code: { type: String },
    state_province: { type: String },
  },
  {
    versionKey: false, // disables __v
  }
);

export const UniversityModel = mongoose.model<University>(
  'University',
  universitySchema
);
