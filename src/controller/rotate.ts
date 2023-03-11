import fs from "fs"
import { fileModel, ValidModel } from "../interfaces/fileCsv";


const createMatrix = async (data: number[]) => {
  const br = Math.sqrt(data.length);
  const matrix = [];
  let arr = []
  for (let index = 0; index < data.length; index++) {
    arr.push(data[index])
    if ((index + 1) % br === 0) {
      matrix.push(arr);
      arr = []
    }
  }

  return await rotateMatrix(matrix)
}
const rotateMatrix = async (matrix: number[][]) => {
  let x: number = matrix.length;
  let y: number = matrix.length;
  let row = 0, col = 0;
  let prev: number, curr: number;
  /*
  row - Starting row index
  x - ending row index
  col - starting column index
  y - ending column index
  i - iterator
  */
  while (row < x && col < y)
    {
      if (row + 1 == x) break;

      prev = matrix[row + 1][col];

      for(let i = col; i < y; i++)
        {
          curr = matrix[row][i];
          matrix[row][i] = prev;
          prev = curr;
        }
      row++;

      for(let i = row; i < x; i++)
        {
          curr = matrix[i][y - 1];
          matrix[i][y - 1] = prev;
          prev = curr;
        }
      y--;

      for(let i = y - 1; i >= col; i--)
        {
            curr = matrix[x - 1][i];
            matrix[x - 1][i] = prev;
            prev = curr;
        }
      x--;

      for(let i = x - 1; i >= row; i--)
        {
          curr = matrix[i][col];
          matrix[i][col] = prev;
          prev = curr;
        }
      col++;
    }
  let result = []
  for(let i = 0; i < matrix.length; i++)
    {
      for (const item of matrix[i]) {
        result.push(item)
      }
    }
  return result
};

export const createCsv = async (data: fileModel[]): Promise<ValidModel[]> => {
  const validOrNotValids: ValidModel[] = [];
  for (const item of data) {
    let arrLength = JSON.parse(item.json).length
    if (!Number.isInteger(Math.sqrt(arrLength))) {
      validOrNotValids.push({
        id: item.id,
        json: [],
        is_valid: false
      })
    } else {
      validOrNotValids.push({
        id: item.id,
        json: await createMatrix(JSON.parse(item.json)),
        is_valid: true
      })
    }
  }
  let result: string = "";
  for (const item of validOrNotValids) {
    result += `${item.id},"[${item.json}]",${item.is_valid}\n`
  }
  fs.writeFileSync(`${__dirname}/../../outputfile.csv`, result);
  return validOrNotValids;
}
