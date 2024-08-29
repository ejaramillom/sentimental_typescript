import fs from 'fs';
import csv from 'csv-parser';
import { Evaluator, SentimentResult, SentimentCsvElement, SentimentCsvResult } from '../types/sentimentAnalysis.types';

export const csvFileReader = ({name, resultName, sentimentAnalysis, evaluateSentiment}: Evaluator): Promise<SentimentCsvResult> => {
  return new Promise((resolve, reject) => {
    const results: Array<SentimentCsvResult> = [];
    csvResultUnlink(resultName);

    // i considered a set of options to drill the data and create the results file:
    // - iterating over an array of objects in memory
    // - read every line of the file and asyncronously write the result file
    // 
    // the first approach is usually resource intensive, while the other sacrifices control
    // and can lead to callback hell
    //
    // i decided to use the second approach as i consider it can be more scalable in time
    // although less maintainable and maybe new engineers would take longer to contribute
    // to the maintenance

    fs.createReadStream(name)
      .pipe(csv())
      .on('data', async (data: SentimentCsvElement) => {
        try {
          // we take one line, make sentiment analysis, and add sentiment result
          // both modules are separated from csvManager, as they have separate concerns
          // and responsibilities

          const reviewAnalisys: SentimentResult = sentimentAnalysis(data.review_text);
          const updatedData: SentimentCsvResult = evaluateSentiment(reviewAnalisys);
          await csvFileWriter(resultName, updatedData);
          results.push(updatedData);
        } catch (error) {
          console.error('Error processing data: ', error);
        }
      })
      .on('end', () => {
        resolve(results[0]);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

export const csvFileWriter = (resultName: string, review: SentimentCsvResult): Promise<void> => {
  return new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(resultName, { flags: 'a' });
    const csvRow = `${review.tokens.join(' ')},${review.sentiment}\n`;

    // we generate a line with the tokens to be saved in the csv and the write the file

    writeStream.write(csvRow, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });

    writeStream.on('error', (error) => {
      reject(error);
    });
  });
};

const csvResultUnlink = (resultName: string): void => {
  // if the result file name provided to the module does not exist, then it continues
  // execution
  try {
    if (fs.existsSync(resultName)) fs.unlinkSync(resultName); 
  } catch (error) {
    console.error(`Error deleting file ${resultName}:`, error);
  }
}
