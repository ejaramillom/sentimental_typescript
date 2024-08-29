export interface SentimentResult {
  score: number;
  comparative: number;
  tokens: string[];
  words: string[];
  positive: string[];
  negative: string[];
  // sentiment?: string;
}

export interface SentimentCsvElement {
  review_id: number;
  review_text: string;
  review_rating: number;
}

export interface SentimentCsvResult extends SentimentResult {
  sentiment: string;
}
