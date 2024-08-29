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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sentimentCsvAnalyzer = void 0;
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const sentimentCsvAnalyzer = (fileName, resultFileName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const csvReader = yield csvFileReader(fileName, resultFileName);
        console.log('CSV Processing Completed:', csvReader);
    }
    catch (error) {
        console.error('Error reading the csv file: ', error);
    }
});
exports.sentimentCsvAnalyzer = sentimentCsvAnalyzer;
const csvFileReader = (name, resultName) => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs_1.default.createReadStream(name)
            .pipe((0, csv_parser_1.default)())
            .on('data', (data) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const updatedData = yield evaluateSentiment(data);
                console.log(data);
                yield csvFileWriter(resultName, updatedData);
                results.push(updatedData);
            }
            catch (error) {
                console.error('Error processing data:', error);
            }
        }))
            .on('end', () => {
            resolve();
        })
            .on('error', (error) => {
            reject(error);
        });
    });
};
const csvFileWriter = (resultName, review) => {
    return new Promise((resolve, reject) => {
        try {
            resolve();
        }
        catch (error) {
            console.log(review, resultName);
            reject(console.error('Error reading the csv file: ', error));
        }
        // const writeStream = fs.createWriteStream(resultName, { flags: 'a' });
        // const csvRow = `${review.tokens.join(' ')},${review.sentiment}\n`;
        // writeStream.write(csvRow, (error) => {
        //   if (error) {
        //     reject(error);
        //   } else {
        //     resolve();
        //   }
        // });
        // writeStream.on('error', (error) => {
        //   reject(error);
        // });
    });
};
const evaluateSentiment = (review) => {
    return new Promise((resolve) => {
        let sentiment;
        // console.log('review score: ', review.score);
        if (review.review_rating < -2) {
            sentiment = 'negative';
        }
        else if (review.review_rating >= -2 && review.review_rating < 2) {
            sentiment = 'neutral';
        }
        else {
            sentiment = 'positive';
        }
        // const updatedReview: SentimentCsvResult = { ...review, sentiment };
        // resolve(updatedReview);
        resolve(...review, sentiment);
    });
};
const fileName = 'sentiment_analysis.csv';
const resultFileName = 'sentiment_results.csv';
(0, exports.sentimentCsvAnalyzer)(fileName, resultFileName).then(() => {
    console.log('Sentiment analysis completed.');
}).catch((error) => {
    console.error('Error during sentiment analysis:', error);
});
