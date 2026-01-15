import { db } from "./firebaseConfig.js";
import fs from "fs";
import path from "path";

async function seedCollection(collectionName, dataFile) {
  const filePath = path.join("./data", dataFile);
  const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));

  console.log(`⛺ Uploading ${collectionName}...`);

  for (const [id, doc] of Object.entries(jsonData)) {
    await db.collection(collectionName).doc(id).set(doc);
  }

  console.log(`✅ Uploaded ${collectionName} successfully.`);
}

async function main() {
  await seedCollection("oas_badges", "oas_badges.json");
  await seedCollection("pab_badges", "pab_badges.json");
  await seedCollection("sustainability_badges", "sustainability_badges.json");
  await seedCollection("permits", "permits.json");
  process.exit();
}

main().catch(console.error);
