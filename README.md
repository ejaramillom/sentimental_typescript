# Sentimental TypeScript

This repository contains a TypeScript-based sentiment analysis project that processes CSV files to evaluate and classify text sentiment. The analysis uses a sentiment analysis package and outputs the results to a new CSV file.

## Getting Started

Follow these instructions to set up and run the project locally.

## Prerequisites

Ensure you have the following installed on your local machine:

- Node.js (version 14 or higher recommended)
- npm (Node Package Manager)
- Git

## Installation

- Clone the Repository:

Clone the repository to your local machine using Git:

```
git clone https://github.com/ejaramillom/sentimental_typescript.git
```

- Navigate to the Project Directory:

Change into the project directory:

```
cd sentimental_typescript
```

- Install Dependencies:

Install all necessary packages using npm:

```
npm install --legacy-peer-deps
```

### To run the sentiment analysis on a CSV file:

Prepare Your Input CSV File:

Ensure you have a CSV file that you want to analyze. Place this file in the root directory or provide a relative path to it.

- Run the Sentiment Analysis:

Use the following command to run the analysis. Replace `inputFile.csv` and `outputFile.csv` with your input and output filenames:

```
npx ts-node run-analysis.ts inputFile.csv outputFile.csv
```

Alternatively, if you have ts-node installed globally, you can use:

```
ts-node run-analysis.ts inputFile.csv outputFile.csv
```

This script will process the input CSV file and output the results to a new CSV file.
