import { Page, expect } from '@playwright/test';

export class AgodaHomePage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://www.agoda.com/');
  }

  async acceptCookiesIfVisible() {
    const acceptBtn = this.page.locator('button:has-text("Accept")');
    if (await acceptBtn.isVisible().catch(() => false)) {
      await acceptBtn.click();
    }
  }

  async openFlightsTab() {
    await this.page.getByRole('tab', { name: /Flights/i }).click();
  }

  async fillDeparture(city: string) {
    const fromInput = this.page.getByPlaceholder(/Flying from/i);
    await fromInput.click();
    await fromInput.fill(city);
    await this.page.waitForTimeout(1000);
    await this.page.keyboard.press('Enter');
  }

  async fillDestination(city: string) {
    const toInput = this.page.getByPlaceholder(/Flying to/i);
    await toInput.click();
    await toInput.fill(city);
    await this.page.waitForTimeout(1000);
    await this.page.keyboard.press('Enter');
  }

  async selectDepartureDate(day: number) {
    await this.page.locator('[data-testid="departure-date-field"]').click();

    const dayLocator = this.page.locator(
      `//div[contains(@class,"DayPicker-Day") and not(contains(@class,"disabled")) and text()="${day}"]`
    );

    await dayLocator.first().click();
  }

  async setTwoAdultsEconomy() {
    await this.page.getByText(/1 Adult/i).click();
    await this.page.getByRole('button', { name: '+' }).first().click();
    await this.page.getByText(/Economy/i).click();
  }

  async clickSearch() {
    await this.page.getByRole('button', { name: /Search/i }).click();
  }

  async selectFirstFlight() {
    await this.page.waitForLoadState('networkidle');
    await this.page.locator('[data-testid="flight-card"]').first().click();
  }

  async verifyFlightPriceVisible() {
    await expect(
      this.page.locator('[data-testid="flight-price"]')
    ).toBeVisible();
  }
}
