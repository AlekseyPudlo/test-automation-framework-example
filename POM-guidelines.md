# Best Practices for Playwright Tests using Page Object Model (POM)

## Introduction

This document outlines best practices for integrating the Page Object Model (POM) with Playwright in web automation. The aim is to achieve maintainable, reliable, and scalable test scripts.

## The Anatomy of a Page Object

A Page Object encapsulates interactions and elements of a web page within a class, comprising:

- **Element Selectors**: Definitions pointing to specific elements on the web page.
- **Methods**: Functions encapsulating interactions with the web elements.
- **Properties**: Information or attributes related to the page, like its URL.

## Understanding Page Object Model Significance

Using POMs ensures an organized approach to test script creation by abstracting UI interactions into manageable objects, making test scripts resilient to frequent UI changes. This approach also promotes code reusability and reduces code duplication, resulting in a more maintainable and scalable test suite.

## Creating Page Objects

Here's how to create and use Page Objects:

### Identifying Properties

```typescript
import { type Page } from '@playwright/test';

class SignInPage {
  readonly page: Page;
  readonly url: string = 'https://example.com/signin';
  // Constructor
  public constructor(page: Page) {
    this.page = page;
  }
}
```

### Identifying Locators

```typescript
import { type Page, type Locator } from '@playwright/test';

class SignInPage {
  readonly page: Page;
  readonly emailInputLocator: Locator;
  readonly passwordInputLocator: Locator;
  readonly signinButtonLocator: Locator;

  public constructor(page: Page) {
    this.page = page;
    // Locators
    this.emailInputLocator = page.getByLabel('Email');
    this.passwordInputLocator = page.getByLabel('Password');
    this.signInButtonLocator = page.getByRole('button', { name: 'Sign In' });
  }
}
```

### Identifying Actions

```typescript
class SignInPage {
  // ... [previous code]
  async navigate() {
    await this.page.goto(this.url);
  }

  async login(email: string, password: string) {
    await this.emailInputLocator.fill(email);
    await this.passwordInputLocator.fill(password);
    await this.signInButtonLocator.click();
  }
}
```

### Identifying Assertions

```typescript
import { expect } from '@playwright/test';

class SignInPage {
  // ... [previous code]
  async isSignedIn() {
    await expect(this.page.getByTestId('status')).toHaveText('Signed In');
  }
}
```

## Using Page Objects in Tests

Example test using the `SignInPage` object:

```typescript
import { test } from '@playwright/test';
import { SignInPage } from './SignInPage';

test('user signs in', async ({ page }) => {
  const signInPage = new SignInPage(page);
  await signInPage.visit();
  await signInPage.login('foo@example.com', 'bar');
  await signInPage.isSignedIn();
});
```

## Best Practices for Page Objects

- **Single Responsibility Principle (SRP)**: Each page object should be responsible for a single page or a small section of a page. This ensures that the code remains organized and maintainable, with clear boundaries between different areas of functionality.

- **Abstraction**: Page objects should abstract away the details of interacting with the page, such as locators and methods for interacting with elements. By providing a more readable and intuitive interface, abstraction reduces the brittleness of the test code and improves its maintainability.

- **Encapsulation**: Page objects should encapsulate the state and behavior of the page, making it easy to reason about the page’s current state and the actions that can be performed on it. This helps in maintaining a clear separation of concerns and improves the overall readability of the tests.

- **Reusability**: Page objects should be designed to be reusable across different tests, reducing code duplication and improving the efficiency of test development. By creating modular and self-contained page objects, you can easily compose tests from reusable building blocks.

- **Easy to Understand**: The naming of methods and variables in page objects should be self-explanatory, making it easy for anyone to understand the purpose and functionality of the code. Clear and descriptive names enhance the readability and maintainability of the tests.

- **Separation of Concerns**: The test code should focus on the high-level behavior of the page, while the page objects should handle the low-level details of interacting with the page. This separation allows for better code organization and promotes a more maintainable and scalable test suite.
