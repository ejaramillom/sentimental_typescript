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
        const csvReader = yield csvFileReader(fileName);
        let csvWriter = yield csvFileWriter(resultFileName);
        console.log(csvReader, fileName, resultFileName);
    }
    catch (error) {
        console.error('Error reading the csv file: ', error);
    }
});
exports.sentimentCsvAnalyzer = sentimentCsvAnalyzer;
const csvFileReader = (name) => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs_1.default.createReadStream(name)
            .pipe((0, csv_parser_1.default)())
            .on('data', (data) => results.push(data))
            .on('end', () => {
            // console.log(results);
            resolve(results);
        })
            .on('error', (error) => {
            reject(error);
        });
    });
};
const csvFileWriter = (name) => {
    return new Promise((resolve, reject) => {
    });
};
const fileName = 'sentiment_analysis.csv';
const resultFileName = 'sentiment_results.csv';
console.log((0, exports.sentimentCsvAnalyzer)(fileName, resultFileName));
