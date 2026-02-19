# Agoda Flight Automation

Automation testing framework for Agoda Flight Search using **Playwright + TypeScript**.

This project demonstrates:

- Page Object Model (POM)
- Data-driven testing
- Allure reporting
- Screenshot & video evidence
- Retry and trace for debugging

---

## 🚀 Tech Stack

- Playwright
- TypeScript
- Allure Report
- Node.js

---

## 📂 Project Structure

```
agoda-flight-automation/
│
├── pages/               # Page Object Model
├── tests/
│   ├── hooks/           # Global test hooks
│   └── specs/           # Test specs
├── test-data/           # Test data (JSON)
├── fixtures/            # Custom fixtures
├── utils/               # Helper functions
│
├── playwright.config.ts
└── package.json
```

---

## ⚙️ Installation

Clone repo and install dependencies:

```bash
npm install
```

Install browsers:

```bash
npx playwright install
```

---

## ▶️ Run Tests

Run all tests:

```bash
npx playwright test
```

Run Chromium (headed):

```bash
npx playwright test --project=chromium --headed
```

---

## 📊 Reports

### Playwright HTML Report

```bash
npx playwright show-report
```

### Allure Report

Generate report:

```bash
allure generate allure-results --clean -o allure-report
```

Open report:

```bash
allure open allure-report
```

---

## 🧪 Test Features

- Data-driven flight search
- Automatic screenshot on PASS
- Screenshot + video on FAIL
- Trace support for debugging
- Parallel / Serial execution support

---

## 📸 Evidence

Each test includes:

- Screenshot attachment
- Video recording
- Error context
- Step execution details

All available inside Allure Report.

---

## 🧠 Best Practices Used

- Page Object Model (POM)
- Reusable hooks
- Clean test structure
- Separation of test data and logic
- CI-friendly reporting setup

---

## 👨‍💻 Author

Automation project built for learning and interview practice.
