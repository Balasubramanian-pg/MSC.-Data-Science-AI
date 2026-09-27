# Lesson 1: Version Control with Git and GitHub

Version Control with Git and GitHub:

Version control is the fundamental pillar of modern software engineering and DataOps. Before version control was adopted across data teams, engineers frequently copied scripts across servers, edited live production queries directly in database consoles, and appended dates or initials to file names to track revisions. Using Git and remote platforms like GitHub establishes a single, auditable source of truth for all pipeline definitions, transformation SQL, infrastructure scripts, and orchestration workflows.

Core Mechanics of Git:

- Distributed architecture: Every engineer clones a complete copy of the project repository, including the full commit history, enabling offline work and eliminating single points of failure.
- The three local states: Git tracks project files across the working directory where files are actively modified, the staging area where selected changes are prepared for recording, and the commit repository where snapshots are permanently stored.
- Snapshot model: Git models project state as a sequence of immutable snapshot trees over time rather than tracking incremental line-by-line file differences.
- Basic local operations: The init command creates a repository, the add command moves files to the staging index, and the commit command permanently records the staged snapshot with a descriptive message.
- Inspecting history: The status command reveals modified and untracked files, the diff command inspects unstaged or staged text alterations, and the log command displays chronological commit histories with author metadata.

Branching Strategies for Data Pipelines:

- Branch creation and switching: Branches allow engineers to isolate new feature development, bug fixes, or schema alterations from stable production code.
- Feature branching: Developers create isolated short-lived branches to implement changes, test transformations locally, and merge back into the main branch only after thorough validation.
- Trunk-based development: Preferred in modern DataOps environments, where developers frequently merge small, short-lived branch updates into the primary trunk branch to minimize merge conflicts and accelerate release cycles.
- Resolving merge conflicts: Conflicts occur when multiple engineers edit the exact same lines of a DAG script or SQL transformation file. Git pauses merge operations until developers manually reconcile the discrepancies and stage the corrected file.

Collaboration and Governance on GitHub:

- Remote repository operations: The remote command links local repositories to hosted servers, the push command uploads local commits to remote branches, and the pull command fetches and merges remote updates into local branches.
- Pull requests: Serve as the primary mechanism for peer review and quality enforcement. A pull request allows team members to inspect proposed code changes, comment on specific lines, and suggest improvements before code enters production branches.
- Branch protection rules: Administrative repository controls that prevent direct commits to primary production branches. Protection rules require approval from peer reviewers and mandate that all automated continuous integration checks pass before merging is permitted.
- Issues and tracking: GitHub issues track data pipeline bugs, schema alteration requests, and infrastructure technical debt, linking specific problem descriptions directly to resolving commit hashes.

Repository Hygiene and Exclusion Rules:

- The gitignore file: Specifies deliberate untracked files that Git should ignore, preventing non-source artifacts from bloating repository storage or contaminating production deployments.
- What belongs in version control: Airflow DAG definitions, dbt models, custom Python transformation modules, SQL scripts, automated test files, Dockerfiles, and infrastructure configuration files.
- What must never enter version control: Large raw datasets, database backup dumps, pipeline execution logs, virtual environment directories, local cache folders, and private credentials.
- Handling data fixtures: Tools such as Data Version Control or Git Large File Storage manage small versioned sample datasets and machine learning model weights without cluttering the primary Git object database.
- Important: Once sensitive credentials such as database passwords, API tokens, or cloud private keys are committed into a Git repository, they remain in the commit history permanently unless the entire repository history is purged and rewritten.

Key Takeaways:

- Git provides a distributed, auditable, and immutable historical record for all data pipeline source code.
- Moving files through the working directory, staging area, and commit repository allows developers to craft clean, atomic snapshots.
- Trunk-based branching and short-lived feature branches reduce merge conflicts when multiple data engineers work on shared pipelines.
- Pull requests combined with branch protection rules ensure that all pipeline modifications undergo peer review and pass automated checks before release.
- The gitignore file must exclude raw data files, execution logs, and cache folders to maintain a lightweight repository.
- Sensitive access credentials must never be committed to version control and should be managed exclusively through secure environment injection.
