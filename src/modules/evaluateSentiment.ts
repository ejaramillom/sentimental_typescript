import { SentimentResult, SentimentCsvResult } from '../types/sentimentAnalysis.types';

export const evaluateSentiment = (review: SentimentResult): SentimentCsvResult => {
  let sentiment: string;
  const NEGATIVE_SENTIMENT_WEIGHT = -2;
  const POSITIVE_SENTIMENT_WEIGHT = 2; 
  // this could be handled differently but i kept it simple
  // another way could have been setting a single value and calculating the range in which
  // the sentiment would be positive and negative

  if (review.score < NEGATIVE_SENTIMENT_WEIGHT) {
    sentiment = 'negative';
  } else if (review.score >= NEGATIVE_SENTIMENT_WEIGHT && review.score < POSITIVE_SENTIMENT_WEIGHT) {
    sentiment = 'neutral';
  } else {
    sentiment = 'positive';
  }

  return { ...review, sentiment };
};