import Sentiment from 'sentiment';
import { SentimentResult } from '../types/sentimentAnalysis.types';

export const sentimentAnalysis = (review: string): SentimentResult => {
  const sentiment = new Sentiment();
  return sentiment.analyze(review);
}

// if you want to test this module to verify how Sentiment works, run the following in the console:
// const reviewText = "This product is horrible! i don't like it..."
// console.log(sentimentAnalysis(reviewText));
