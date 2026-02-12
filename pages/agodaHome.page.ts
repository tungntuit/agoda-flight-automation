import { Page, expect } from '@playwright/test';

export class AgodaHomePage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://www.agoda.com/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });
  }

  async acceptCookiesIfVisible() {
    const acceptBtn = this.page.locator('button:has-text("Accept")');
    if (await acceptBtn.isVisible().catch(() => false)) {
      await acceptBtn.click();
    }
  }

  async openFlightsTab() {
    await this.page.getByRole('tab', { name: /Flights/i }).click();
    await this.closePromoPopupIfVisible();

  }

  async fillDeparture(city: string) {
    const fromInput = this.page.getByPlaceholder(/Flying from/i);
    await fromInput.click();
    await fromInput.fill(city);
    await this.page.waitForTimeout(1000);
    await this.page.keyboard.press('Enter');
  }

  async fillLocation(type: 'from' | 'to', city: string) {
    const input = this.page.getByRole('combobox', {
      name: type === 'from' ? /Flying from/i : /Flying to/i,
    });
  
    await input.click();
    await input.fill(city);
  
    const firstOption = this.page
      .locator('[role="option"]:not([aria-disabled="true"])')
      .first();
  
    await firstOption.waitFor({ state: 'visible' });
    await firstOption.click();
  }

  async selectDepartureDate(date: Date) {
    const departure = this.page.getByText('Departure');
  
    await departure.click();
    await departure.click();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    const formatted = `${year}-${month}-${day}`;
  
    console.log('Selecting date:', formatted);
  
    await this.page
      .locator(`[data-selenium-date="${formatted}"]`)
      .click();
  }
  
  async closePromoPopupIfVisible() {
    const closeBtn = this.page.getByRole('button', { name: /close/i });
  
    try {
      // chờ tối đa 5 giây cho popup xuất hiện
      await closeBtn.waitFor({ state: 'visible', timeout:5000 });
  
      await closeBtn.click();
  
      // chờ popup biến mất hẳn
      await closeBtn.waitFor({ state: 'detached' });
  
    } catch (error) {
      // Không xuất hiện thì thôi, bỏ qua
      console.log('Promo popup did not appear.');
    }
  }


  async setTwoAdultsEconomy() {
    const plusBtn = this.page.locator(
      '[data-element-name="flight-occupancy-adult-increase"]'
    );
    
    await plusBtn.waitFor({ state: 'visible' });
    await plusBtn.click();

    const economyBtn = this.page.locator(
      '[data-element-object-id="economy"]'
    );

    await economyBtn.waitFor({ state: 'visible' });
    await economyBtn.click();
 
    const passengerPopup = this.page.locator('[data-element-name="flight-occupancy-adult-increase"]').first();
    await this.page.mouse.click(10, 10);
    await passengerPopup.waitFor({ state: 'hidden' });

  }

  async clickSearch() {
    await this.page.getByRole('button', { name: /Search/i }).click();
  }

  async selectFirstFlight() {
    const expandBtn = this.page.locator(
      'button[aria-label^="Expand flight details"]'
    ).first();
  
    await expandBtn.waitFor({ state: 'visible', timeout: 30000 });
    await expandBtn.click();
  }

  normalizePrice(price: string): number {
    return Number(
      price.replace(/[^\d]/g, '')
    );
  }

  async getFirstFlightPriceFromSearch(): Promise<number> {

    const priceText = await this.page
      .locator('button[aria-label^="Expand flight details"]')
      .first()
      .locator('xpath=ancestor::div[contains(@class,"Card")]')
      .locator('text=/₫/')
      .first()
      .textContent();
  
    console.log('Search price raw:', priceText);
  
    return this.normalizePrice(priceText!);
  }

  async clickSelectButton() {
    await this.page.getByRole('button', { name: 'Select' }).click();
  }

  async getTotalPriceFromDetail(): Promise<number> {

    const totalText = await this.page
      .locator('text=Total')
      .locator('..')
      .locator('text=/₫/')
      .textContent();
  
    console.log('Detail price raw:', totalText);
  
    return this.normalizePrice(totalText!);
  }

  async verifyFlightPriceVisible() {
    await expect(
      this.page.locator('[data-testid="flight-price"]')
    ).toBeVisible();
  }

  async verifyFlightDisplayed() {

  // Airline
  const airline = this.page.locator("//p[normalize-space()]").first();
  await expect(airline).toBeVisible();

  // Departure
  await expect(
    this.page.locator('[data-testid="departure-time"]').first()
  ).toBeVisible({ timeout: 30000 });

  // Arrival
  await expect(
    this.page.locator('[data-testid="arrival-time"]').first()
  ).toBeVisible({ timeout: 30000 });

  // Price
  await expect(
    this.page.getByText(/\d{1,3}(,\d{3})+/).first()
  ).toBeVisible();

  }
}
