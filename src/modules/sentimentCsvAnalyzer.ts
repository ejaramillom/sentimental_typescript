import fs from 'fs';
import csv from 'csv-parser'
// import { sentimentAnalysis } from "./sentimentalAnalysis";
import { SentimentCsvElement, SentimentCsvResult } from '../types/sentimentAnalysis.types';

export const sentimentCsvAnalyzer = async (fileName: string, resultFileName: string): Promise<void> => {
  try {
    const csvReader = await csvFileReader(fileName);
    let csvWriter = await csvFileWriter(resultFileName);
    console.log(csvReader, fileName, resultFileName);
  } catch (error) {
    console.error('Error reading the csv file: ', error)
  }
  
}

const csvFileReader = (name: string): Promise<Array<SentimentCsvElement>> => {
  return new Promise((resolve, reject) => {
    const results: Array<SentimentCsvElement> = [];

    fs.createReadStream(name)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        // console.log(results);
        resolve(results);
      })
      .on('error', (error) => {
        reject(error);
      }) 
  })
}

const csvFileWriter = (name: string): Promise<Array<SentimentCsvResult>> => {
 return new Promise((resolve, reject) => {
  
 })
}

const fileName = 'sentiment_analysis.csv';
const resultFileName = 'sentiment_results.csv';

console.log(sentimentCsvAnalyzer(fileName, resultFileName));

