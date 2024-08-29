import fs from 'fs';
import csv from 'csv-parser';
import { SentimentResult, SentimentCsvElement, SentimentCsvResult } from '../types/sentimentAnalysis.types';

export const sentimentCsvAnalyzer = async (fileName: string, resultFileName: string): Promise<void> => {
  try {
    const csvReader = await csvFileReader(fileName, resultFileName);
    console.log('CSV Processing Completed:', csvReader);
  } catch (error) {
    console.error('Error reading the csv file: ', error);
  }
};

const csvFileReader = (name: string, resultName: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const results: Array<SentimentCsvResult> = [];

    fs.createReadStream(name)
      .pipe(csv())
      .on('data', async (data: SentimentCsvElement) => {
        try {
          const updatedData = await evaluateSentiment(data);
          console.log(data);
          await csvFileWriter(resultName, updatedData);
          results.push(updatedData);
        } catch (error) {
          console.error('Error processing data:', error);
        }
      })
      .on('end', () => {
        resolve();
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

const csvFileWriter = (resultName: string, review: SentimentCsvResult): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      resolve();
    } catch (error) {
      console.log(review, resultName);
      reject(console.error('Error reading the csv file: ', error));
    }
    
    // const writeStream = fs.createWriteStream(resultName, { flags: 'a' });
    // const csvRow = `${review.tokens.join(' ')},${review.sentiment}\n`;

    // writeStream.write(csvRow, (error) => {
    //   if (error) {
    //     reject(error);
    //   } else {
    //     resolve();
    //   }
    // });

    // writeStream.on('error', (error) => {
    //   reject(error);
    // });
  });
};

const evaluateSentiment = (review: SentimentCsvElement): Promise<SentimentCsvResult> => {
  return new Promise((resolve) => {
    let sentiment: string;
    // console.log('review score: ', review.score);

    if (review.review_rating < -2) {
      sentiment = 'negative';
    } else if (review.review_rating >= -2 && review.review_rating < 2) {
      sentiment = 'neutral';
    } else {
      sentiment = 'positive';
    }

    // const updatedReview: SentimentCsvResult = { ...review, sentiment };
    // resolve(updatedReview);
    resolve(...review, sentiment);
  });
};

const fileName = 'sentiment_analysis.csv';
const resultFileName = 'sentiment_results.csv';

sentimentCsvAnalyzer(fileName, resultFileName).then(() => {
  console.log('Sentiment analysis completed.');
}).catch((error) => {
  console.error('Error during sentiment analysis:', error);
});
