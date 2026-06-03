# Lumenario Article Review Dashboard

A responsive, high-fidelity React dashboard built for editors to review article SEO grades, inspect topical gaps, get actionable recommendations, and evaluate performance against competitor sites.

This project is built using **React 19**, **Vite 8**, and **Tailwind CSS v4** (using the new `@tailwindcss/vite` CSS-first compiler plugin).

---

## 🚀 Getting Started

### 📋 Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18.0.0 or higher) and [npm](https://www.npmjs.com/) installed.

### 🔧 Installation and Run
Follow these steps to run the application locally:

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm run dev
   ```
   This will spin up the Vite development server (usually at `http://localhost:5173`). Open this URL in your web browser.



---

## 🛠️ Component & Directory Structure

We have designed a clean, modular React component architecture. All core code is organized inside the `src/` directory:

```text
src/
├── main.jsx                 # Application entry point
├── App.jsx                  # Root component, routing setup, layout wrapper
├── index.css                # Global styles, Tailwind imports, custom animations
├── context/
│   └── ThemeContext.jsx     # Handles Light/Dark mode state and document class syncing
├── utils/
│   └── dataLoader.js        # Loads and resolves article scores data immediately
├── components/
│   ├── Header.jsx           # Sticky top navbar with branding, stats, and theme toggle
│   ├── SearchAndFilter.jsx  # Handles search queries, status filters, and sorting
│   ├── ArticleCard.jsx      # Summary card representing a single article in the list
│   ├── DecisionBadge.jsx    # Visual status pill (publish, needs improvement, etc.)
│   ├── ScoreGauge.jsx       # Animated circular SVG gauge representing final score
│   ├── Tooltip.jsx          # Accessible pop-up tooltip for score criteria definitions
│   ├── ScoreBreakdown.jsx   # Metrics progress bars for Search, Topical, Structure, Trust
│   ├── RecommendationList.jsx # action items and missing topics
│   └── CompetitorTable.jsx  # Competitor ranking comparison and average comparison
└── pages/
    ├── ArticleListView.jsx  # Aggregates list state, searches, filters, and loads data
    └── ArticleDetailView.jsx # Renders comprehensive data analysis for a single article
```

---

## 💎 Implemented Features & Bonuses

This dashboard has been created with a focus on **Premium Design Aesthetics** and incorporates several optional bonus items:

1. **Light & Dark Theme Toggle (Persistent)**
   - Syncs the interface with user preferences and stores the setting in `localStorage`.
   - Tailwind v4 `dark:` selectors are used alongside custom CSS variable transitions to deliver a smooth theme fade animation.
2. **React Router Navigation**
   - Implemented using `react-router-dom` HashRouter to manage transitions between the **List View** and **Detail View** with clean path mapping.
4. **Persistent Search, Filters & Sorting**
   - User selections for searching keywords, filtering status, and sorting criteria are saved to `localStorage` automatically.
   - Reloading the page recovers the exact list configuration that the editor was working on.
5. **SEO Score Metric Tooltips**
   - Custom hover tooltips explain the logic behind *Search Intent*, *Topical Coverage*, *Structure*, and *Trust* scores.
   - Accessible via keyboard Tab focus, satisfying ARIA guidelines.
6. **Competitor Average Comparison Calculations**
   - Calculates the average score of all competitors and displays a custom status pill indicating if the current article "Beats Competitor Avg (+X)" or is "Below Competitor Avg (-Y)".
7. **Error Handling**
   - Skeletons are shown briefly on initial component mount using custom CSS pulsing cards.
   - Includes full error boundaries and empty search screens.

---

## 📌 Assumptions & Logic Choices

- **Data Loading**: Since there is no backend API, `article_scores.json` is imported directly. We wrap the load calls in a Promise that resolves immediately to maintain standard async lifecycle conventions in pages.
- **Search Criteria**: Search checks both the `title` and `target_keyword` fields (case-insensitive) to ensure editors find what they need.

---

## ⚠️ Known Limitations

- **JSON Data Scope**: The dashboard relies completely on static data supplied via `article_scores.json`. Real database updates (like modifying recommendations or editing scores) are simulated locally in state rather than saved back to a server database.
- **Routing Base**: Router utilizes HashRouter (`#/`) rather than standard BrowserRouter pathing. This guarantees that built HTML files can be opened and clicked directly on local hard drives (`file:///`) or on static GitHub Pages branches without requiring complex server URL-rewriting rules.
