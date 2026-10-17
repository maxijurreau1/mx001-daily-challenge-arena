# Contributing to MX-001 Daily Challenge Arena

Thank you for contributing to the **MX-001 Daily Challenge Arena** repository, certified under the **MAX-GAMES-FACTORY V3.1.1 ICVO Framework**. 

This document outlines the local setup instructions, architectural guidelines, CI/CD gate expectations, and validation procedures.

---

## 1. Local Development Setup

### Prerequisites
- **Flutter SDK** (`stable` channel)
- **Node.js** & **npm**
- **Wrangler CLI** (`npm install -g wrangler`)
- **Git**

### Clone & Install Dependencies
```bash
git clone https://github.com/maxijurreau1/mx001-daily-challenge-arena.git
cd mx001-daily-challenge-arena
flutter pub get
```

### Running the Frontend Locally

```bash
# Run in Chrome dev mode
flutter run -d chrome

# Or build production web target and serve locally
flutter build web --release
python -m http.server --directory build/web 8080
```

### Running the Worker Locally (with D1)

```bash
# Run Cloudflare Worker locally via Wrangler
wrangler dev worker/index.ts --local
```

---

## 2. CI/CD & Governance Pipeline (ICVO Framework)

Every push to `main` triggers the automated **ICV Web Pipeline** (`.github/workflows/web-deploy.yml`), which enforces four strict gates:

1. **Gate 1 (Infrastructure):** `flutter analyze` and `flutter test --coverage`
2. **Gate 2 (Compliance):** Gitleaks secret scanning and GitHub CodeQL static security analysis
3. **Gate 3 (Validation):** Cloudflare Staging deployment paired with automated `smoke-test.sh` and `synthetic-user.sh` execution
4. **Gate 4 (Production):** Continuous promotion to live production targets via Wrangler

---

## 3. Running Validation Scripts

Before pushing changes, you can locally simulate staging validations:

```bash
chmod +x scripts/smoke-test.sh scripts/synthetic-user.sh

# Target your local or staging environment
export STAGING_URL="http://localhost:8787"
./scripts/smoke-test.sh
./scripts/synthetic-user.sh
```

---

## 4. Branching & Pull Requests

* Create feature branches prefixed with `feat/`, `fix/`, or `refactor/`.
* Ensure all local tests (`flutter test`) pass cleanly before opening a pull request.
* Fill out the pre-merge checklist in `.github/pull_request_template.md`.

---

Would you like to draft a modular data access layer file (`worker/db.ts`) next to separate your D1 SQL queries from the worker router logic?
