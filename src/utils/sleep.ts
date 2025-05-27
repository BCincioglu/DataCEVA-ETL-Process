// Avoid API rate limits by adding a delay between requests

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
