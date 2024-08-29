import { csvFileReader } from './csvManager';
import { sentimentAnalysis } from './sentimentalAnalysis';
import { evaluateSentiment } from './evaluateSentiment';

const [inputFileName, outputFileName] = process.argv.slice(2);

if (!inputFileName || !outputFileName) {
  console.error('Usage: npx ts-node run-analysis.ts <inputFileName> <outputFileName>');
  process.exit(1);
}

export const sentimentCsvAnalyzer = async (name: string, resultName: string): Promise<void> => {
  try {
    await csvFileReader({name, resultName, sentimentAnalysis, evaluateSentiment} );
    console.log('CSV Processing Completed');
  } catch (error) {
    console.error('Error reading the csv file: ', error);
  }
};

sentimentCsvAnalyzer(inputFileName, outputFileName).then(() => {
  console.log('Sentiment analysis completed.');
}).catch((error) => {
  console.error('Error during sentiment analysis:', error);
});


