# DataCEVA - University ETL Pipeline

## 📘 Overview

**DataCEVA University ETL Pipeline** is a Node.js-based data pipeline designed to extract, transform, and load (ETL) university data from the [Hipolabs Universities API](http://universities.hipolabs.com).

The application is designed to be scalable and maintainable, and can serve as a solid base for more complex data processing workflows.

### ✨ Key Features

- 🔄 **Stream-based extraction** — Efficient memory usage for large datasets
- 🛠️ **Data transformation** — Normalizes and cleans raw university data
- 📦 **Dual storage** — Stores data in both a CSV file and a MongoDB database
- 🔐 **Change detection** — Uses hashing to detect changes and prevent redundant ETL runs
- ⏱️ **Scheduled execution** — Automatically runs daily via a configurable cron job (default: midnight UTC)
- 📊 **Structured logging** — Uses Winston for professional-grade logging

---

> This project is intended as a showcase of best practices in building a lightweight yet production-ready ETL pipeline with TypeScript and Node.js.

---

## Installation and Run Steps

### 1. Clone the Application

First, clone the repository to your local machine using the following command:

```sh
git clone https://github.com/BCincioglu/DataCEVA-ETL-Process
```

### 2. Install Dependencies

Navigate into the project directory and install the necessary dependencies:

```sh
cd DataCEVA-ETL-Process
npm install
```

### 3. Ready For Run 🚀

ETL process now ready for run, you can easliy run with these commands:

```sh
npm run build
npm run start
```
---

## ⚙️ Environment Variables

The application behavior is controlled using the `.env` file located in the project root. Below is a list of all supported environment variables:

| Variable Name              | Description                                               | Example                                   |
|----------------------------|-----------------------------------------------------------|-------------------------------------------|
| `DATA_OUTPUT_PATH`         | Output path for the generated CSV file                    | `./data/universities.csv`                 |
| `UNIVERSITY_API_BASE_URL`  | Base URL of the Hipolabs university API                   | `http://universities.hipolabs.com/search` |
| `UNIVERSITY_API_PAGE_SIZE` | Number of records fetched per API request                 | `100`                                     |
| `MAX_RETRIES`              | Maximum number of retry attempts on API failure           | `3`                                       |
| `RETRY_DELAY_MS`           | Delay between retries in milliseconds                     | `2000`                                    |
| `LOG_LEVEL`                | Logger verbosity level (e.g., info, debug, error)         | `info`                                    |
| `CRON_EXPRESSION`          | CRON timing expression for scheduled ETL execution        | `0 0 * * *`                               |
| `CRON_TIMEZONE`            | Timezone for scheduled CRON jobs                          | `UTC`                                     |
| `MONGODB_URI`              | Connection string for MongoDB                             | `mongodb://localhost:27017/universities`  |

> ℹ️ **Note:** Be sure to restart the application after modifying `.env` values.

---

## 🧪 Testing

This project uses **Jest** and **ts-node** for unit and integration testing.

#### 📦 Running Tests

To execute all available tests, simply run:

```sh
npx jest
```

Or, if you want to include coverage information:

```sh
npx jest --coverage
```

> ℹ️ **Tip:** If Jest is not recognized, make sure it's installed with npm install --save-dev jest ts-jest @types/jest

---

## 📡 API Endpoint

The application provides a single public API endpoint to download the university data in CSV format.

### Download University Data (CSV)

- **URL**: `http://localhost:3000/api/universities`
- **Method**: `GET`
- **Description**: Returns a CSV file containing all university data processed by the ETL pipeline.
- **Response**: `text/csv` content type with CSV-formatted data.


## 📆 Cron Job Details

The application includes a scheduled task that runs the ETL (Extract, Transform, Load) process every day at midnight (00:00) UTC.

### Purpose

Automatically fetches the latest university data from the public API.

Compares the data hash to check for changes.

If changes are detected:

 -Triggers the ETL pipeline.

 -Updates the local CSV file.

 -Upserts data into the MongoDB database.

### ⚠️ Retry Mechanism ⚠️

If the ETL job fails, a retry is scheduled after 5 minutes.

This continues until the job succeeds.

Prevents data loss due to transient errors or network issues.