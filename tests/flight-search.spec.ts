import { test } from '@playwright/test';
import { AgodaHomePage } from '../pages/agodaHome.page';
import { getFutureDate } from '../utils/dateHelper';

/*
Test Case: Verify one-way flight price search

Steps:
1. Navigate to Agoda homepage.
2. Accept cookies if displayed.
3. Open Flights tab.
4. Enter departure city as Ho Chi Minh (SGN).
5. Enter destination city as Valencia (VLC).
6. Select departure date as current date + 2 days.
7. Select 2 adults in Economy class.
8. Click Search.
9. Select first available option.
10. Verify flight price is displayed.
*/

test('Verify one-way flight price search', async ({ page }) => {
  const agoda = new AgodaHomePage(page);
  const futureDate = getFutureDate(2);

  await agoda.navigate();
  await agoda.acceptCookiesIfVisible();
  await agoda.openFlightsTab();
  await agoda.fillLocation('from', 'Ho Chi Minh');
  await agoda.fillLocation('to', 'Valencia');
  await agoda.selectDepartureDate(futureDate);
  await agoda.setTwoAdultsEconomy();
  await agoda.clickSearch();
  await agoda.verifyFlightDisplayed();
});
