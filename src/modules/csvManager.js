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
exports.csvFileWriter = exports.csvFileReader = void 0;
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const sentimentalAnalysis_1 = require("./sentimentalAnalysis");
const csvFileReader = (name, resultName) => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs_1.default.createReadStream(name)
            .pipe((0, csv_parser_1.default)())
            .on('data', (data) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const reviewAnalisys = (0, sentimentalAnalysis_1.sentimentAnalysis)(data.review_text);
                const updatedData = evaluateSentiment(reviewAnalisys);
                yield (0, exports.csvFileWriter)(resultName, updatedData);
                results.push(updatedData);
            }
            catch (error) {
                console.error('Error processing data:', error);
            }
        }))
            .on('end', () => {
            resolve(results[0]);
        })
            .on('error', (error) => {
            reject(error);
        });
    });
};
exports.csvFileReader = csvFileReader;
const csvFileWriter = (resultName, review) => {
    return new Promise((resolve, reject) => {
        const writeStream = fs_1.default.createWriteStream(resultName, { flags: 'a' });
        const csvRow = `${review.tokens.join(' ')},${review.sentiment}\n`;
        writeStream.write(csvRow, (error) => {
            if (error) {
                reject(error);
            }
            else {
                resolve();
            }
        });
        writeStream.on('error', (error) => {
            reject(error);
        });
    });
};
exports.csvFileWriter = csvFileWriter;
const evaluateSentiment = (review) => {
    let sentiment;
    const NEGATIVE_SENTIMENT_WEIGHT = -2;
    const NEUTRAL_SENTIMENT_WEIGHT = 2;
    if (review.score < NEGATIVE_SENTIMENT_WEIGHT) {
        sentiment = 'negative';
    }
    else if (review.score >= NEGATIVE_SENTIMENT_WEIGHT && review.score < NEUTRAL_SENTIMENT_WEIGHT) {
        sentiment = 'neutral';
    }
    else {
        sentiment = 'positive';
    }
    return Object.assign(Object.assign({}, review), { sentiment });
};
