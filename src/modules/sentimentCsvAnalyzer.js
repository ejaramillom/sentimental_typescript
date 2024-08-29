"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sentimentCsvAnalyzer = void 0;
const csvManager_1 = require("./csvManager");
const sentimentCsvAnalyzer = (fileName, resultFileName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const csvReader = yield (0, csvManager_1.csvFileReader)(fileName, resultFileName);
        console.log('CSV Processing Completed:', csvReader);
    }
    catch (error) {
        console.error('Error reading the csv file: ', error);
    }
});
exports.sentimentCsvAnalyzer = sentimentCsvAnalyzer;
const fileName = 'sentiment_analysis.csv';
const resultFileName = 'sentiment_results.csv';
(0, exports.sentimentCsvAnalyzer)(fileName, resultFileName).then(() => {
    console.log('Sentiment analysis completed.');
}).catch((error) => {
    console.error('Error during sentiment analysis:', error);
});
