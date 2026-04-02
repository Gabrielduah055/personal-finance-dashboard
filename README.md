# Personal Finance Dashboard

A stunning, modern, and responsive React application for tracking income and expenses with safe `localStorage` persistence.

## Live Project Overview

Personal Finance Dashboard helps users record financial activity, monitor overall balance, and quickly review income and expense trends through a clean dashboard interface. The application is designed to feel polished and production-ready while keeping the codebase readable and maintainable.

## Features

### Transaction Management
- Add a new transaction with:
  - title
  - amount
  - category
  - type (income or expense)
  - date
- Edit an existing transaction
- Delete a transaction
- Validate all inputs before saving

### Dashboard Summary
- Total balance
- Total income
- Total expense
- Values update automatically whenever transactions change

### Filtering and Search
- Search transactions by title
- Filter by transaction type:
  - all
  - income
  - expense
- Filter by category
- Reset filters easily

### Persistence
- Transactions are saved to `localStorage`
- Data loads automatically on app startup
- Corrupted or invalid stored data is handled safely without crashing the app

### UI / UX
- Clean glass-style dashboard layout
- Responsive design for desktop and mobile
- Strong visual hierarchy with modern cards and spacing
- Empty states for no data and no filter results
- Smooth hover states and subtle transitions
- Inline validation messages and status feedback

## Tech Stack
- React
- Functional components
- React hooks (`useState`, `useEffect`, `useMemo`)
- Plain CSS
- `localStorage` for persistence
- Create React App

## Folder Structure

```bash
src/
├── App.js
├── App.css
├── index.css
├── components/
│   ├── DashboardSummary.js
│   ├── TransactionForm.js
│   ├── TransactionList.js
│   ├── TransactionItem.js
│   ├── FilterBar.js
│   └── EmptyState.js
└── utils/
    ├── localStorage.js
    └── helpers.js
```

## Architecture

### `App.js`
Acts as the main container for the application.
It manages:
- transaction state
- filter state
- edit mode state
- UI feedback messages

It also computes:
- summary totals
- filtered transactions
- category options derived from saved data

### `components/`
- `DashboardSummary.js` — shows total balance, income, and expense cards
- `TransactionForm.js` — handles add/edit transaction workflows with validation
- `TransactionList.js` — renders the collection of transactions
- `TransactionItem.js` — displays each transaction card with actions
- `FilterBar.js` — controls search and filters
- `EmptyState.js` — handles empty UI states gracefully

### `utils/helpers.js`
Contains reusable logic such as:
- validation
- normalization
- formatting
- id generation
- sorting
- default form/filter values

### `utils/localStorage.js`
Wraps `localStorage` access in defensive utility functions so the app remains safe even if stored data is missing or malformed.

## Safe localStorage Handling

The app does not assume stored data is always valid.
It safely handles:
- missing `localStorage` keys
- malformed JSON
- invalid data shapes
- unexpected transaction objects
- failed save operations

Defensive behaviors include:
- `try/catch` around reads and writes
- fallback to an empty array when data is missing or corrupted
- filtering out malformed entries before using them
- preventing the entire app from crashing because of bad persisted data

## Validation and Edge Cases Considered

### Form Validation
- Prevents empty titles
- Trims extra spaces from text inputs
- Prevents empty categories
- Prevents invalid numbers
- Prevents zero or negative amounts
- Prevents invalid transaction type values
- Prevents invalid dates

### State Safety
- Uses stable generated ids with `crypto.randomUUID()` and fallback support
- Uses functional state updates to avoid stale state bugs
- Clears edit mode safely when the edited item is deleted
- Resets form state properly after add, update, or cancel

### UX Safety
- Shows clear inline field errors
- Shows short feedback messages after add, update, cancel, and delete actions
- Handles empty transaction lists cleanly
- Handles no-results filter/search state cleanly
- Keeps filters usable even when no transactions exist

## How to Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/Gabrielduah055/personal-finance-dashboard.git
```

### 2. Open the project folder
```bash
cd personal-finance-dashboard
```

### 3. Install dependencies
```bash
npm install
```

### 4. Start the development server
```bash
npm start
```

### 5. Open in your browser
```bash
http://localhost:3000
```

## Build for Production

```bash
npm run build
```

## Scripts
- `npm start` — run development server
- `npm run build` — create production build
- `npm test` — run tests
- `npm run eject` — eject CRA config

## Notes
- Currency formatting currently uses `GHS` for a Ghana-friendly finance experience
- The UI is intentionally polished while keeping the code beginner-friendly enough to study
- All application state is stored in the browser only

## Author
Gabriel Duah
