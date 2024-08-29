"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sentimentAnalysis = void 0;
const sentiment_1 = __importDefault(require("sentiment"));
const sentimentAnalysis = (review) => {
    const sentiment = new sentiment_1.default();
    return sentiment.analyze(review);
};
exports.sentimentAnalysis = sentimentAnalysis;
// const reviewText = "This product is horrible! i don't like it..."
// console.log(sentimentAnalysis(reviewText));
