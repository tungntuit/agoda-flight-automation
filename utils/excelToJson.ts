import fs from 'fs';
import { readFlightData } from './excelReader';

async function convertExcelToJson() {
  const result = await readFlightData();

  fs.writeFileSync(
    './test-data/flightData.json',
    JSON.stringify(result, null, 2)
  );

  console.log('✅ Excel converted dynamically');
}

convertExcelToJson();
