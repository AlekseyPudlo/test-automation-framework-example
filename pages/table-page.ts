import { Locator, Page, expect } from '@playwright/test';
import { URLS } from '../utils/constants';

export class TablePage {

  private readonly itemsTab: Locator;
  private readonly getTab: Locator;
  private readonly metaTab: Locator;


  constructor(private readonly page: Page, private readonly tablename: string) {
    this.itemsTab = page.getByRole('link', { name: 'Items' });
    this.getTab = page.getByRole('link', { name: 'Get' });
    this.metaTab = page.getByRole('link', { name: 'Meta' });
  }

  public async clickItemsTab(): Promise<void> {
    await this.itemsTab.click();
    await this.page.waitForLoadState();
  }

  public async clickGetTab(): Promise<void> {
    await this.getTab.click();
    await this.page.waitForLoadState();
  }

  public async clickMetaTab(): Promise<void> {
    await this.metaTab.click();
    await this.page.waitForLoadState();
  }

  public async assertURLIsTablePage(): Promise<void> {
    expect(this.page.url()).toBe(URLS.BASE_URL + 'tables/' + this.tablename);
  }

  // Loop through tabs to verify that clicking the tab header changes and renders the corresponding content.
  public async assertTabsActivity(): Promise<void> {
    const tabs = [this.itemsTab, this.getTab, this.metaTab];

    for (const tab of tabs) {
      await tab.click();
      await this.page.waitForLoadState();
      const isActive = await tab.evaluate((element) => element.classList.contains('active'));
      expect(isActive).toBe(true);
    }
  }
  
}
