export class AgodaHomeLocator {

    // ===== Buttons =====
    static ACCEPT_COOKIES_BUTTON = 'button:has-text("Accept")';
    static SEARCH_BUTTON = { role: 'button', name: /Search/i };
    static SELECT_BUTTON = { role: 'button', name: 'Select' };
    static FLIGHTS_TAB = { role: 'tab', name: /Flights/i };
    static PROMO_CLOSE_BUTTON = { role: 'button', name: /close/i };
  
    // ===== Location Inputs =====
    static FROM_PLACEHOLDER = /Flying from/i;
    static COMBOBOX_FROM = { role: 'combobox', name: /Flying from/i };
    static COMBOBOX_TO = { role: 'combobox', name: /Flying to/i };
    static FIRST_AVAILABLE_OPTION =
      '[role="option"]:not([aria-disabled="true"])';
  
    // ===== Date =====
    static DEPARTURE_LABEL = 'Departure';
    static DATE_BY_VALUE = (date: string) =>
      `[data-selenium-date="${date}"]`;
  
    // ===== Passenger =====
    static ADULT_INCREASE_BUTTON =
      '[data-element-name="flight-occupancy-adult-increase"]';
  
    static ECONOMY_BUTTON =
      '[data-element-object-id="economy"]';
  
    // ===== Flight Result =====
    static EXPAND_FLIGHT_BUTTON =
      'button[aria-label^="Expand flight details"]';
  
    static FLIGHT_PRICE_TEST_ID =
      '[data-testid="flight-price-breakdown"]';
  
    static DEPARTURE_TIME =
      '[data-testid="departure-time"]';
  
    static ARRIVAL_TIME =
      '[data-testid="arrival-time"]';
  
    static TOTAL_TEXT = 'text=Total';

    static FLIGHT_PRICE_REGEX = /\d{1,3}(,\d{3})+/;

  }
  