import { Locator, Page, expect } from '@playwright/test';
import { URLS } from '../utils/constants';
import { checkElementVisibility } from '.';

export class MainPage {

  private readonly createTableButton: Locator;
  private readonly purgeAllTablesButton: Locator;
  private readonly deleteAllTablesButton: Locator;
  private readonly filterTables: Locator;
  private readonly table: (name: string) => Locator;
  private readonly tableDeleteButton: (name: string) => Locator;

  constructor(private readonly page: Page) {
    this.createTableButton = page.getByRole('link', { name: 'Create table' });
    this.purgeAllTablesButton = page.getByRole('link', { name: 'Purge all tables' });
    this.deleteAllTablesButton = page.getByRole('link', { name: 'Delete all tables' });
    this.filterTables = page.getByPlaceholder('Filter tables');
    this.table = (name: string) => page.getByText(name + ' Delete Purge');
    this.tableDeleteButton = (name: string) => this.table(name).getByRole('link', { name: 'Delete' });
  }

  public async pause(): Promise<void> {
    await this.page.pause();
  }

  public async close(): Promise<void> {
    await this.page.close();
  }

  public async reload(
    options?:
      | {
          timeout?: number;
          waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' | 'commit';
        }
      | undefined,
  ): Promise<void> {
    await this.page.reload(options);
  }

  public async navigateToMainPage(): Promise<void> {
    await this.page.goto('/');
    await this.page.waitForLoadState();
    await this.assertURLIsMainPage();
  }

  public async clickCreateTableButton(): Promise<void> {
    await this.createTableButton.click();
    await this.page.waitForLoadState();
  }

  public async clickPurgeAllTablesButton(): Promise<void> {
    await this.purgeAllTablesButton.click();
    await this.page.waitForLoadState();
  }

  public async clickDeleteAllTablesButton(): Promise<void> {
    await this.deleteAllTablesButton.click();
    await this.page.waitForLoadState();
  }

  public async clickTableDeleteButton(name: string): Promise<void> {
    await this.tableDeleteButton(name).click();
    await this.page.waitForLoadState();
  }

  public async submitDeleteAction(): Promise<void> { 
    this.page.on('dialog', async dialog => {
      await dialog.accept();
    });
  }

  public async clickTable(name: string): Promise<void> {
    await this.table(name).getByRole('link', { name: name }).click();
    await this.page.waitForLoadState();
  }

  // Assertions

  public async assertURLIsMainPage(): Promise<void> {
    expect(this.page.url()).toBe(URLS.BASE_URL);
  }

  public async assertTableExists(name: string): Promise<void> {
    const isVisible: boolean = await checkElementVisibility(this.table(name));
    expect(isVisible).toBe(true);
  }

  public async assertTableDoesNotExist(name: string): Promise<void> {
    const isVisible: boolean = await checkElementVisibility(this.table(name));
    expect(isVisible).toBe(false);
  }


}
