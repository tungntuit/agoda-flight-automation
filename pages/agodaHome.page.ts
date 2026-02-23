import { Page, expect } from '@playwright/test';
import { AgodaHomeLocator } from './agodaHome.locator';

export class AgodaHomePage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://www.agoda.com/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });
  }

  async acceptCookiesIfVisible() {
    const acceptBtn = this.page.locator(
      AgodaHomeLocator.ACCEPT_COOKIES_BUTTON
    );

    if (await acceptBtn.isVisible().catch(() => false)) {
      await acceptBtn.click();
    }
  }

  async openFlightsTab() {
    await this.page.getByRole(
      AgodaHomeLocator.FLIGHTS_TAB.role as any,
      { name: AgodaHomeLocator.FLIGHTS_TAB.name }
    ).click();

    await this.closePromoPopupIfVisible();
  }

  async fillDeparture(city: string) {
    const fromInput = this.page.getByPlaceholder(
      AgodaHomeLocator.FROM_PLACEHOLDER
    );

    await fromInput.click();
    await fromInput.fill(city);
    await this.page.keyboard.press('Enter');
  }

  async fillLocation(type: 'from' | 'to', city: string) {
    const combobox =
      type === 'from'
        ? AgodaHomeLocator.COMBOBOX_FROM
        : AgodaHomeLocator.COMBOBOX_TO;

    const input = this.page.getByRole(
      combobox.role as any,
      { name: combobox.name }
    );

    await input.click();
    await input.fill(city);

    const firstOption = this.page
      .locator(AgodaHomeLocator.FIRST_AVAILABLE_OPTION)
      .first();

    await firstOption.waitFor({ state: 'visible' });
    await firstOption.click();
  }

  async selectDepartureDate(date: Date) {
    const departure = this.page.getByText(
      AgodaHomeLocator.DEPARTURE_LABEL
    );

    await departure.click();
    await departure.click();

    const formatted = this.formatDate(date);

    await this.page
      .locator(AgodaHomeLocator.DATE_BY_VALUE(formatted))
      .click();
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  async closePromoPopupIfVisible() {
    const closeBtn = this.page.getByRole(
      AgodaHomeLocator.PROMO_CLOSE_BUTTON.role as any,
      { name: AgodaHomeLocator.PROMO_CLOSE_BUTTON.name }
    );

    try {
      await closeBtn.waitFor({ state: 'visible', timeout: 5000 });
      await closeBtn.click();
      await closeBtn.waitFor({ state: 'detached' });
    } catch {
      console.log('Promo popup did not appear.');
    }
  }

  async setAdults(count: number) {
    const plusBtn = this.page.locator(
      AgodaHomeLocator.ADULT_INCREASE_BUTTON
    );
  
    await plusBtn.waitFor({ state: 'visible' });
  
    // Agoda default = 1 adult
    for (let i = 1; i < count; i++) {
      await plusBtn.click();
    }
  }

  async setCabinClass(cabin: 'Economy' | 'Premium Economy' | 'Business' | 'First') {
    let cabinLocator;
  
    switch (cabin) {
      case 'Economy':
        cabinLocator = AgodaHomeLocator.ECONOMY_BUTTON;
        break;
      case 'Premium Economy':
        cabinLocator = AgodaHomeLocator.PREMIUM_ECONOMY_BUTTON;
        break;
      case 'Business':
        cabinLocator = AgodaHomeLocator.BUSINESS_BUTTON;
        break;
      case 'First':
        cabinLocator = AgodaHomeLocator.FIRST_BUTTON;
        break;
    }
  
    const cabinBtn = this.page.locator(cabinLocator!);
  
    await cabinBtn.waitFor({ state: 'visible' });
    await cabinBtn.click();
  
    await this.page.mouse.click(10, 10);
  }

  async clickSearch() {
    await this.page.getByRole(
      AgodaHomeLocator.SEARCH_BUTTON.role as any,
      { name: AgodaHomeLocator.SEARCH_BUTTON.name }
    ).click();
  }

  async selectFirstFlight() {
    const expandBtn = this.page
      .locator(AgodaHomeLocator.EXPAND_FLIGHT_BUTTON)
      .first();

    await expandBtn.waitFor({ state: 'visible', timeout: 30000 });
    await expandBtn.click();
  }

  normalizePrice(price: string): number {
    return Number(price.replace(/[^\d]/g, ''));
  }

  async getFirstFlightPriceFromSearch(): Promise<number> {
    const priceText = await this.page
      .locator(AgodaHomeLocator.EXPAND_FLIGHT_BUTTON)
      .first()
      .locator('xpath=ancestor::div[contains(@class,"Card")]')
      .locator('text=/₫/')
      .first()
      .textContent();

    return this.normalizePrice(priceText!);
  }

  async clickSelectButton() {
    await this.page.getByRole(
      AgodaHomeLocator.SELECT_BUTTON.role as any,
      { name: AgodaHomeLocator.SELECT_BUTTON.name }
    ).click();
  }

  async getTotalPriceFromDetail(): Promise<number> {
    const totalText = await this.page
      .locator(AgodaHomeLocator.TOTAL_TEXT)
      .locator('..')
      .locator('text=/₫/')
      .textContent();

    return this.normalizePrice(totalText!);
  }

  async verifyFlightPriceVisible() {
    await expect(
      this.page.locator(AgodaHomeLocator.FLIGHT_PRICE_TEST_ID)
    ).toBeVisible();
  }

  async verifyFlightDisplayed() {
    await expect(
      this.page.locator(AgodaHomeLocator.DEPARTURE_TIME).first()
    ).toBeVisible({ timeout: 30000 });

    await expect(
      this.page.locator(AgodaHomeLocator.ARRIVAL_TIME).first()
    ).toBeVisible({ timeout: 30000 });

    await expect(
      this.page.getByText(AgodaHomeLocator.FLIGHT_PRICE_REGEX).first()
    ).toBeVisible();
  }
}
