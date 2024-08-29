export interface Evaluator {
  name: string;
  resultName: string;
  sentimentAnalysis: (review: string) => SentimentResult;
  evaluateSentiment: (review: SentimentResult) => SentimentCsvResult; 
} 

export interface SentimentResult {
  comparative: number;
  negative: string[];
  positive: string[];
  score: number;
  tokens: string[];
  words: string[];
}

export interface SentimentCsvElement {
  review_id: number;
  review_rating: number;
  review_text: string;
}

export interface SentimentCsvResult extends SentimentResult {
  sentiment: string;
}
