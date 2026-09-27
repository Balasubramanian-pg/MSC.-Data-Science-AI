# Migration in progress
# Lab9: CI/CD Integration & Automation

Lab 9: CI/CD Integration and Automation:

This hands-on lab covers the design, configuration, and execution of an automated CI/CD pipeline for data engineering projects. Learners establish a standardized repository structure, configure static code analysis, write unit tests for data transformation logic, implement automated Airflow DAG integrity checks, and build a deployment workflow using GitHub Actions to deploy verified data pipelines automatically.

Lab Objectives:

- Structure a professional data engineering repository containing pipeline code, DAG definitions, test suites, and automation manifests.
- Implement automated linting and formatting checks to enforce code quality and consistent styling.
- Author unit tests using pytest to validate data cleaning and transformation functions against synthetic mock datasets.
- Implement DAG integrity tests that detect syntax errors, import failures, and circular dependencies before deployment.
- Configure continuous integration workflows that execute tests automatically on every pull request.
- Configure continuous delivery workflows that deploy validated pipeline files to target environments upon merging into the primary branch.

Step 1: Repository Architecture and Virtual Environment:

- Initialize a Git repository and organize directories into dedicated folders for orchestration dags, transformation source code, automated tests, and CI/CD workflow manifests.
- Establish a Python virtual environment and install core project dependencies, including pytest, flake8, black, sqlfluff, and apache-airflow.
- Generate a pinned requirements.txt file or configure package management files to ensure consistent test execution across local machines and cloud CI runners.

Step 2: Code Linting and Formatting Automation:

- Configure black to enforce uniform Python code formatting across all scripts.
- Set up flake8 rules in a setup.cfg file to flag unused imports, undefined variables, and line length violations.
- Configure sqlfluff to parse SQL models, validating dialect rules, capitalization standards, and indentation practices.
- Verify linting locally by running the linter commands from the terminal and resolving any flagged styling or syntax errors.

Step 3: Writing Unit Tests for Data Transformations:

- Create isolated transformation functions in the source directory, separating core mathematical calculations and data cleaning logic from orchestration code.
- In the tests directory, write unit tests using pytest to evaluate transformation behavior against small in-memory sample DataFrames.
- Test boundary conditions, including the handling of null values, empty input datasets, unexpected categorical values, and malformed date strings.
- Assert that transformation outputs match expected schema types, column values, and record counts.

Step 4: Writing DAG Integrity and Structure Tests:

- Author a dedicated test file that programmatically imports all DAG files within the dags directory.
- Verify that the Airflow DagBag parses every script with zero import errors reported.
- Assert that each discovered DAG contains at least one task, has a