import { expect } from '@playwright/test';
import { test } from '../hooks/hooks';
import { AgodaHomePage } from '../../pages/agodaHome.page';
import { getFutureDate } from '../../utils/dateHelper';
import { FlightSearchData } from '../../utils/flightTypes';
import flightDataJson from '../../test-data/flightData.json';
const flightData = flightDataJson as FlightSearchData[];

test.describe('Flight Search - Data Driven', () => {

  test.describe.configure({
    mode: 'serial',
    retries: 2,
  });

  for (const data of flightData) {

    test(`Flight ${data.locationFrom} → ${data.locationTo}`, async ({ page }) => {

      const agoda = new AgodaHomePage(page);
      const futureDate = getFutureDate(Number(data.futureDay));

      await agoda.navigate();
      await agoda.acceptCookiesIfVisible();
      await agoda.openFlightsTab();

      await agoda.fillLocation('from', data.locationFrom);
      await agoda.fillLocation('to', data.locationTo);

      await agoda.selectDepartureDate(futureDate);
      await agoda.setAdults(data.passenger);
      await agoda.setCabinClass(data.class);
      await agoda.clickSearch();

      await agoda.verifyFlightDisplayed();
    });

  }

});
