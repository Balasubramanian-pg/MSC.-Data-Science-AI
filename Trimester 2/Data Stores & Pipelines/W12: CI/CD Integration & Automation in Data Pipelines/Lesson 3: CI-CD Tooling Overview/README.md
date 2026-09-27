# Migration in progress
# Lesson 3: CI/CD Tooling Overview

CI-CD Tooling Overview:

Building an automated pipeline lifecycle requires a cohesive ecosystem of tools spanning version control, continuous integration runners, container engines, schema management utilities, and infrastructure automation. Rather than relying on a single monolithic system, modern data platforms assemble specialized tools to automate code testing, environment provisioning, and software deployment. This lesson provides an overview of the core technologies powering continuous integration and delivery across modern data engineering architectures.

Version Control and Code Hosting Platforms:

- GitHub: The most widely adopted hosting platform for Git repositories. It provides native pull request workflows, branch protection governance, automated code review tools, and built-in integration with cloud automation runners.
- GitLab: An integrated platform offering repository hosting, built-in continuous integration pipelines, container registry storage, and deployment tracking within a single unified application.
- Bitbucket: An enterprise repository management platform tightly integrated with Atlassian project tracking tools, commonly deployed in corporate environments requiring on-premises hosting or strict Jira integration.

CI-CD Automation Runners and Execution Engines:

- GitHub Actions: Uses YAML configuration files within the repository to define workflows, jobs, and steps triggered by repository events such as pull requests or branch merges. It supports both cloud-hosted runners and self-hosted internal compute instances.
- GitLab CI: Leverages a central configuration file to execute multi-stage pipelines across external worker agents called GitLab Runners, offering fine-grained pipeline visualization and environment tracking.
- Jenkins: An open-source, highly extensible automation server that uses Groovy-based pipeline scripts. While it requires ongoing operational maintenance and server patching, it offers deep customization through thousands of community plugins.
- CircleCI: A cloud-native CI platform focused on rapid execution speed, offering advanced caching mechanisms, Docker layer caching, and easy parallelism for large automated test suites.

Containerization and Ephemeral Environments:

- Docker: Packages data transformation scripts, Airflow environments, and third-party dependencies into standardized, immutable container images, ensuring identical execution across developer laptops and production servers.
- Kubernetes: Manages containerized worker workloads at scale, dynamically spinning up isolated pods to run data tasks or continuous integration jobs and terminating them upon completion.
- Testcontainers: A testing library that allows CI runners to launch lightweight, temporary Docker containers running real databases, message brokers, or storage emulators during integration test execution.

Data Transformation and Analytics CI-CD Tools:

- dbt Core and dbt Cloud: Coordinates SQL transformations natively inside cloud data warehouses. In CI environments, dbt compiles code, executes automated s