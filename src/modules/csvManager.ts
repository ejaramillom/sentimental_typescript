import fs from 'fs';
import csv from 'csv-parser';
import { sentimentAnalysis } from './sentimentalAnalysis';
import { SentimentResult, SentimentCsvElement, SentimentCsvResult } from '../types/sentimentAnalysis.types';

export const csvFileReader = (name: string, resultName: string): Promise<SentimentCsvResult> => {
  return new Promise((resolve, reject) => {
    const results: Array<SentimentCsvResult> = [];

    fs.createReadStream(name)
      .pipe(csv())
      .on('data', async (data: SentimentCsvElement) => {
        try {
          const reviewAnalisys: SentimentResult = sentimentAnalysis(data.review_text);
          const updatedData: SentimentCsvResult = evaluateSentiment(reviewAnalisys);
          await csvFileWriter(resultName, updatedData);
          results.push(updatedData);
        } catch (error) {
          console.error('Error processing data:', error);
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

const evaluateSentiment = (review: SentimentResult): SentimentCsvResult => {
  let sentiment: string;
  const NEGATIVE_SENTIMENT_WEIGHT = -2;
  const NEUTRAL_SENTIMENT_WEIGHT = 2; 

  if (review.score < NEGATIVE_SENTIMENT_WEIGHT) {
    sentiment = 'negative';
  } else if (review.score >= NEGATIVE_SENTIMENT_WEIGHT && review.score < NEUTRAL_SENTIMENT_WEIGHT) {
    sentiment = 'neutral';
  } else {
    sentiment = 'positive';
  }

  return { ...review, sentiment };
};