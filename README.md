# MSc Data Science & AI - Trimester 2 Interactive Wiki

[![Deploy Trimester 2 Wiki to GitHub Pages](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/actions/workflows/deploy.yml/badge.svg)](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/actions/workflows/deploy.yml)

An enterprise-grade, interactive learning and certification wiki portal built for **Trimester 2** of the MSc Data Science & AI program.

---

## 🌟 Key Architecture & Highlights

- **Dual-Mode Workspace**:
  - **App Dashboard**: High-impact editorial dashboard matching the provided reference layout with fluid expanding grids, shortcut workspaces, and live engagement trends.
  - **Reader Workspace**: Distraction-free, decluttered study mode with minimal header, code snippet copying, Pomodoro pill countdown, and sticky "Mark as Complete" action bar.
- **Fluid Expanding Grid (`src/components/ui/fluid-expanding-grid.tsx`)**:
  - Motion layout expanding gallery cards across all 4 courses + syllabus specifications + engineering guidelines.
  - Full keyboard accessibility (Enter, Space, Tab, Escape) and ARIA attributes.
- **Ripple Loader (`src/components/ui/ripple-loader.tsx`)**:
  - Concentric layered ripple animations with customizable center icon, speed, and ARIA attributes.
- **Typography & Visual Standards**:
  - Set in **Abadi** font family with structural headings and monospace code styling.
  - Layered light/dark mode tokens supporting seamless switching.
- **Simple Icons Family**:
  - Official brand SVGs for PyTorch, Docker, Kubernetes, Apache Airflow, Scikit-Learn, AWS, PostgreSQL, Snowflake, GitHub, and LinkedIn.
- **Gamified Interactive Widgets**:
  - **Resilient Pomodoro Focus Clock**: Timestamp-delta persistent countdown surviving page transitions and full browser refreshes.
  - **Documentation Engagement Trend**: Dynamic SVG cubic Bézier spline wave visualizing study hours and reading velocity.
  - **Views & Edits by Week**: Circular gauge meter tracking module completions across all 330 notes.
  - **Viva & Practice Quiz Simulator**: Scenario-based evaluation with instant architectural feedback and confetti celebrations.
- **GitHub Actions Deployment**:
  - Production-ready `.github/workflows/deploy.yml` compiling static assets and deploying to GitHub Pages on every push.

---

## 📚 Curriculum Coverage (330 Notes Extracted)

1. **Artificial Neural Networks** (85 Modules, W01 - W13)
   - Biological vs Artificial Neurons, Linear Algebra, Perceptrons, MLPs, Backpropagation Dynamics, CNNs, Sequence Models, and Responsible AI.
2. **Cloud Services & Platforms** (93 Modules, W01 - W13)
   - Cloud Architecture, AWS IAM, EC2 Compute, VPC Networking, Docker & Kubernetes Containers, S3 Storage, Serverless Lambda, and Terraform IaC.
3. **Data Stores & Pipelines** (112 Modules, W01 - W13)
   - Modern Data Warehouses, Lakehouses, Apache Iceberg, Delta Lake, Batch/Streaming Ingestion, Apache Airflow DAGs, and Data Governance.
4. **Machine Learning** (40 Modules, Weeks 1 - 13)
   - Preprocessing, Decision Trees, Rule-based Classification, k-NN, Ensemble Learning, K-Means, Hierarchical & DBSCAN Clustering, and Association Rules.

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18 (Tested on v22)
- npm >= 9

### Local Development
```bash
# Install dependencies
npm install

# Start local dev server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 🚢 GitHub Pages Deployment

The repository is configured with a GitHub Actions workflow in `.github/workflows/deploy.yml`.

To deploy:
1. Push the code to the `main` (or `master`) branch.
2. Under repository **Settings > Pages**, set **Source** to **GitHub Actions**.
3. The workflow will automatically build the static assets and deploy your wiki live!
