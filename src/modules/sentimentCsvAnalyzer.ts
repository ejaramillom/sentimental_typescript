import { csvFileReader } from './csvManager';

export const sentimentCsvAnalyzer = async (fileName: string, resultFileName: string): Promise<void> => {
  try {
    const csvReader = await csvFileReader(fileName, resultFileName);
    console.log('CSV Processing Completed:', csvReader);
  } catch (error) {
    console.error('Error reading the csv file: ', error);
  }
};

const fileName = 'sentiment_analysis.csv';
const resultFileName = 'sentiment_results.csv';

sentimentCsvAnalyzer(fileName, resultFileName).then(() => {
  console.log('Sentiment analysis completed.');
}).catch((error) => {
  console.error('Error during sentiment analysis:', error);
});
