import Sentiment from 'sentiment';
import { SentimentResult } from '../types/sentiment.rypes';

export const sentimentAnalysis = (review: string): string => {
  const sentiment = new Sentiment();
  const result = sentiment.analyze(review);
  return result
}

const reviewText = "This product is horrible! i don't like it..."

console.log(sentimentAnalysis(reviewText));
