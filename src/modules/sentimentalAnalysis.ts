import Sentiment from 'sentiment';
import { SentimentResult } from '../types/sentimentAnalysis.types';

export const sentimentAnalysis = (review: string): SentimentResult => {
  const sentiment = new Sentiment();
  const result = sentiment.analyze(review);
  return result
}

// const reviewText = "This product is horrible! i don't like it..."

// console.log(sentimentAnalysis(reviewText));
