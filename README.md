# Playwright Testing Guide

This document provides instructions on how to set up and run end-to-end tests for a project using Playwright, as well as details on the Jenkins pipeline configuration used for continuous integration and delivery.

## Prerequisites

- Node.js installed on your machine.
- Docker installed if you plan to use Docker for running tests.

## Setting Up Your Environment

1. **Clone the repository:**

```bash
git clone https://github.com/AlekseyPudlo/test-automation-framework-example.git
```

2. **Install Dependencies:**

```bash
cd test-automation-framework-example
pnpm install
```
3. **Install Playwright:**

```bash
pnpm run install-playwright
```

## Running Tests Locally

**Start Required Services:**

```bash
pnpm run docker-start
```

**Run End-to-End Tests:**

```bash
# Run all e2e tests in headless mode for development
pnpm run e2e-dev

# Run all e2e tests in headless mode for production
pnpm run e2e-prod

# Run e2e tests in headed mode for development
pnpm run e2e-dev-headed

# Debug e2e tests
pnpm run e2e-dev-debug
```

## Jenkins Pipeline Overview

The Jenkins pipeline configured for this project automates the process of running e2e tests and managing test artifacts. Here’s a breakdown of the pipeline stages:

### Stages
**1. Install dependencies:**

- Install all project dependencies.
- Specifically installs Playwright, ensuring all browser binaries are present.

**2. Execute e2e tests:**

- Retrieves necessary credentials securely from a vault.
- Depending on the parameter TEST_ENV, runs tests against the development or production environment.
- Uses a lock to prevent parallel execution of tests which could lead to conflicts.

### Post Actions

- Generate HTML Report:<br/>
After test execution, an HTML report is generated and published, accessible from the Jenkins job interface. This report provides a detailed view of test execution results.

## Additional Information
**CI/CD Integration:**
- The Jenkins pipeline is set up to trigger on code pushes or periodically, ensuring continuous testing feedback.

**Environment Variables:**
- The BRANCH_NAME environment variable is used within the Jenkinsfile to perform branch-specific operations.