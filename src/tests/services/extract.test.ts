import { fetchUniversityDataStream } from "../../services/extract";

/**
 * Executes a basic test for the university data stream.
 * Logs the first 5 universities for verification,
 * and prints the total count retrieved.
 */

async function runTest() {
  let count = 0;

  try {
    // Iterate over streamed university records
    for await (const uni of fetchUniversityDataStream()) {
      if (count < 5) {
        console.log(`🎓 [${count + 1}] ${uni.name} — ${uni.country}`);
      }
      count++;
    }
    
    console.log(`✅ Stream completed successfully. Total records fetched: ${count}`);
  } catch (err) {
    console.error("❌ An error occurred while testing the data stream:", err);
  }
}

runTest();
