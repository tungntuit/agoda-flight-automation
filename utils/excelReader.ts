import ExcelJS from 'exceljs';
import { FlightSearchData } from './flightTypes';

export async function readFlightData() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile('./test-data/flightData.xlsx');
  const sheet = workbook.getWorksheet('data');
  const data: FlightSearchData[] = [];
  
  if (!sheet) {
    throw new Error('Sheet "data" not found');
  }

  const headers: string[] = [];
  sheet.getRow(1).eachCell((cell, colNumber) => {
    headers[colNumber] = String(cell.value);
  });

  sheet.eachRow((row, rowNumber) => {

    if (rowNumber === 1) return; 

    const rowData = {} as FlightSearchData;
    row.eachCell((cell, colNumber) => {
      const key = headers[colNumber];
      const value = cell.value;
      if (key === 'passenger') {
        rowData[key] = Number(value);
      } else {
        rowData[key] = value;
      }
    });

    data.push(rowData);
  });

  console.log('Loaded data:', data);
  return data;
}
