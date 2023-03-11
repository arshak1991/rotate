import express from "express";
import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse"
import { createCsv } from "../controller/rotate";
import { fileModel } from "../interfaces/fileCsv";

const rotateRoute = express.Router();

rotateRoute.post("/", async (req, res) => {
  const csvFilePath: string = path.resolve(__dirname, '../../file.csv');
  const headers: string[] = ['id', 'json'];
  const fileContent: string = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
  parse(fileContent, {
    delimiter: ',',
    columns: headers,
  }, async (error, result: fileModel[]) => {
    if (error) {
      console.error(error);
    }
    res.json(await createCsv(result));
  });
});


export default rotateRoute;
