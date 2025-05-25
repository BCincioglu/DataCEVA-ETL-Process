import { fetchUniversityDataStream } from "../../services/extract";

async function runTest() {
  let count = 0;

  try {
    for await (const uni of fetchUniversityDataStream()) {
      if (count < 5) {
        console.log(`🎓 [${count + 1}] ${uni.name} — ${uni.country}`);
      }
      count++;
    }

    console.log(`✅ Toplam ${count} üniversite çekildi.`);
  } catch (err) {
    console.error('❌ Stream testinde hata:', err);
  }
}

runTest();
