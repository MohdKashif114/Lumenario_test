# Frontend Intern Take-Home Test

## Profile

**Frontend Intern — JavaScript, HTML, CSS, React**

## Assignment Title

**Build a Simple Lumenario Article Review Dashboard**

## Context

Lumenario scores articles before publishing.

Editors need a simple dashboard where they can see:

```text
Which articles are ready to publish?
Which articles need improvement?
What score did each article receive?
What should be improved?
```

Your task is to build a small React dashboard using the sample JSON data provided.

---

## Time Expectation

- Expected working time: 3–5 hours
- Submission window: 48–72 hours
- You may use Google, documentation, Stack Overflow, and AI tools
- You must be able to explain your own code during the follow-up discussion

---

## Files Provided

The folder contains:

```text
sample_data/
  article_scores.json
```

You do not need to build a backend.

You can load the JSON file directly or import it into your React app.

---

## What You Need to Build

Build a React app with two main views:

1. Article list view
2. Article detail view

You can implement the detail view using:

- React Router, or
- Local state when an article is selected

React Router is optional.

---

# Required Tasks

## 1. Article List View

Show all articles from `article_scores.json`.

For each article, show:

- Article title
- Tenant
- Target keyword
- Final score
- Decision
- Button/link to view details

The article list may be a table or cards.

---

## 2. Search and Filter

Add simple controls:

1. Search by article title or target keyword.
2. Filter by decision:
   - `publish`
   - `needs_improvement`
   - `do_not_publish`
3. Sort by final score:
   - High to low
   - Low to high

Keep the logic simple and readable.

---

## 3. Article Detail View

When an article is selected, show:

- Title
- Target keyword
- Final score
- Decision
- Score breakdown
- Missing topics
- Recommendations
- Competitor comparison

The editor should quickly understand what needs to be improved.

---

## 4. Reusable Components

Do not put everything inside one large `App.jsx`.

Create reusable components such as:

```text
ArticleList
ArticleCard
ArticleDetail
ScoreBreakdown
DecisionBadge
RecommendationList
CompetitorTable
SearchAndFilter
```

You can use different names, but your component structure should be clear.

---

## 5. Styling Requirements

The UI should be:

- Clean
- Readable
- Responsive
- Easy to scan
- Usable on mobile and desktop

You may use:

- Plain CSS
- CSS modules
- Tailwind CSS

Avoid heavy UI libraries unless you explain why you used them.

---

## 6. States to Handle

Handle basic states:

1. Loading state
2. Empty state when no article matches search/filter
3. Error state if data cannot be loaded

The error state can be simple.

---

## Expected Commands

Your project should run with commands like:

```bash
npm install
npm run dev
```

Mention exact commands in your README.

---

## Submission Requirements

Submit a GitHub repository or zip file containing:

```text
1. React source code
2. README.md with setup and run instructions
3. Screenshots of the UI
4. Short explanation of component structure
5. Notes on assumptions
6. Any known limitations
```

---

## Allowed Simplifications

You do not need to:

- Build a backend
- Add login/authentication
- Add real API calls
- Build a perfect production UI
- Use charts
- Use complex state management like Redux

The goal is to check whether you can build a clear, maintainable React UI.

---

## Bonus Tasks

Optional bonus items:

1. Use React Router.
2. Add a simple chart for score breakdown.
3. Save selected filters in localStorage.
4. Add tooltips explaining each score.
5. Add basic tests.
6. Improve keyboard accessibility.
7. Show whether the target article beats the average competitor score.

---

## What We Care About

We care about:

- Clean React component structure
- Good information hierarchy
- Practical UI thinking
- Correct search/filter/sort behavior
- Responsive layout
- Clear CSS
- Ability to explain your choices

We do not expect a perfect production dashboard.
