import { Locator, Page, expect } from '@playwright/test';
import { URLS } from '../utils/constants';

export class CreateTablePage {

  private readonly createTableHeader: Locator;
  private readonly tableNameInput: Locator;
  private readonly hashAtributeNameInput: Locator;
  private readonly submitButton: Locator;
  private readonly alertMessage: Locator;

  constructor(private readonly page: Page) {
    this.createTableHeader = page.getByRole('heading', { name: 'Create Table' });
    this.tableNameInput = page.getByLabel('Table Name');
    this.hashAtributeNameInput = page.getByLabel('Range Attribute Name (');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.alertMessage = page.getByRole('alert');
  }

  public async assertURLIsCreateTablePage(): Promise<void> {
    expect(this.page.url()).toBe(URLS.BASE_URL + 'create-table');
  }

  public async clickSubmitButton(): Promise<void> {
    await this.submitButton.click();
    await this.page.waitForLoadState();
  }

  public async fillTableName(name: string): Promise<void> {
    await this.tableNameInput.fill(name);
  }

  public async fillHashAttributeName(name: string): Promise<void> {
    await this.hashAtributeNameInput.fill(name);
  }

  public async assertAlertMessage(message: string): Promise<void> {
    expect(await this.alertMessage.textContent()).toBe(message);
  }
}
