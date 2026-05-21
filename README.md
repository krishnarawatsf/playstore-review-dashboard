[![CI](https://github.com/krishnarawatsf/playstore-review-dashboard/actions/workflows/nodejs.yml/badge.svg)](https://github.com/krishnarawatsf/playstore-review-dashboard/actions)
[![License](https://img.shields.io/github/license/krishnarawatsf/playstore-review-dashboard.svg)](https://github.com/krishnarawatsf/playstore-review-dashboard/blob/main/LICENSE)
[![GitHub release](https://img.shields.io/github/v/release/krishnarawatsf/playstore-review-dashboard.svg)](https://github.com/krishnarawatsf/playstore-review-dashboard/releases)
[![codecov](https://codecov.io/gh/krishnarawatsf/playstore-review-dashboard/branch/main/graph/badge.svg)](https://codecov.io/gh/krishnarawatsf/playstore-review-dashboard)
[![Dependabot status](https://img.shields.io/github/dependabot/krishnarawatsf/playstore-review-dashboard.svg)](https://github.com/krishnarawatsf/playstore-review-dashboard/network/alerts)

# Playstore Review Dashboard
Product analytics dashboard for Play Store review intelligence and sentiment tracking.

## One-line
Turn Play Store reviews into product signals: sentiment, trends, and responder metrics.

## Why
Product teams need a fast way to prioritize issues and measure the impact of fixes. This dashboard aggregates reviews, runs sentiment analysis, and surfaces trending problems.

## Features
- Ingest reviews from Play Store API or CSV
- Preprocessing pipeline (text cleaning, language detection)
- Sentiment analysis (rules + ML model)
- Dashboard (Vite React) with filters and time series
- Exportable reports and alerting hooks

## Quickstart
```bash
# install
npm install
npm run dev

# or with docker-compose
docker compose up -d
```

## Data Pipeline
1. Source: Play Store API or CSV
2. Preprocess: Python script `scripts/preprocess.py`
3. Store: SQLite/Postgres
4. Serve: Backend API → Dashboard

## Sample: load demo data
```bash
python3 scripts/load_demo.py --file sample_reviews.csv
```

## Screenshots
Add screenshots to `assets/` and reference them here.

## Extending
- Add Slack alerts for negative spikes
- Replace rule-based sentiment with an improved ML model
- Add automated weekly reports

## Tests & CI
- Unit tests: `pytest` or `npm test` depending on pipeline
- CI suggestions: `lint`, `test`, `build` on push

## Contributing
Open an issue to propose improvements; include sample data if relevant.

## License
MIT
