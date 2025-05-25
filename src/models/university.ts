export interface UniversityRaw {
  name: string;
  country: string;
  web_pages: string[];
  domains: string[];
  [key: string]: any; // fazladan alanlar olabilir
}

export interface University {
  name: string;
  country: string;
  website: string;
  domain: string;
}
