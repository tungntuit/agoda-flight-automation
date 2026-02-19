import ExcelJS from 'exceljs';
import fs from 'fs';

async function convertExcelToJson() {

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile('./test-data/flightData.xlsx');

  const sheet = workbook.getWorksheet('data');

  const result: any[] = [];

  // ⭐ lấy header row
  const headers: string[] = [];

  sheet?.getRow(1).eachCell((cell, colNumber) => {
    headers[colNumber] = String(cell.value);
  });

  // ⭐ đọc data row
  sheet?.eachRow((row, rowNumber) => {

    if (rowNumber === 1) return;

    const rowData: any = {};

    row.eachCell((cell, colNumber) => {
      const key = headers[colNumber];
      rowData[key] = cell.value;
    });

    result.push(rowData);
  });

  fs.writeFileSync(
    './test-data/flightData.json',
    JSON.stringify(result, null, 2)
  );

  console.log('✅ Excel converted dynamically');
}

convertExcelToJson();
