import { MainPage, getRandomTestName, CreateTablePage, TablePage } from 'pages';
import test from '@playwright/test';

test.describe('Playwright', () => {
  const randomTestName = getRandomTestName();
  let mainPage: MainPage;
  let createTablePage: CreateTablePage;
  let tablePage: TablePage;

  test.beforeAll(async ({ browser }): Promise<void> => {
    const page = await browser.newPage();
    mainPage = new MainPage(page);
    createTablePage = new CreateTablePage(page);
    tablePage = new TablePage(page, randomTestName);
  });

  test.beforeEach(async (): Promise<void> => {
    await mainPage.navigateToMainPage();
  });

  test.afterAll(async (): Promise<void> => {
    await mainPage.close();
  });

  test('Should Assert Alert Message', async (): Promise<void> => {
    const alertMessage = "Invalid table/index name.  Table/index names must be between 3 and 255 characters long, and may contain only the characters a-z, A-Z, 0-9, '_', '-', and '.'";

    await mainPage.clickCreateTableButton();
    await createTablePage.assertURLIsCreateTablePage();
    await createTablePage.clickSubmitButton();
    await createTablePage.assertAlertMessage(alertMessage);
  });

  test('Should Create a Table', async (): Promise<void> => {
    await mainPage.clickCreateTableButton();
    await createTablePage.fillTableName(randomTestName);
    await createTablePage.fillHashAttributeName(randomTestName + 'hash');
    await createTablePage.clickSubmitButton();

    await mainPage.assertTableExists(randomTestName);
  });

  test('Should assert Table Tabs Details', async (): Promise<void> => {
    await mainPage.clickTable(randomTestName);
    await tablePage.assertTabsActivity();
  });

  test('Should Delete a Table', async (): Promise<void> => {
    await mainPage.clickTableDeleteButton(randomTestName);
    await mainPage.submitDeleteAction();
    await mainPage.clickTableDeleteButton(randomTestName);

    await mainPage.assertTableDoesNotExist(randomTestName);
  });

});
