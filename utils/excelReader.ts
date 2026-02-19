import ExcelJS from 'exceljs';

export async function readFlightData() {

  const workbook = new ExcelJS.Workbook();

  await workbook.xlsx.readFile('./test-data/flightData.xlsx');

  const sheet = workbook.getWorksheet('data');

  const data: any[] = [];

  if (!sheet) {
    throw new Error('Sheet "data" not found');
  }

  // 🔥 lấy header row
  const headers: string[] = [];

  sheet.getRow(1).eachCell((cell, colNumber) => {
    headers[colNumber] = String(cell.value);
  });

  // 🔥 đọc từng row theo header
  sheet.eachRow((row, rowNumber) => {

    if (rowNumber === 1) return; // skip header

    const rowData: any = {};

    row.eachCell((cell, colNumber) => {
      const key = headers[colNumber];

      // auto mapping theo header
      rowData[key] = cell.value;
    });

    data.push(rowData);
  });

  console.log('Loaded data:', data);

  return data;
}
