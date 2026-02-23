export type CabinType =
  | 'Economy'
  | 'Premium Economy'
  | 'Business'
  | 'First';

export interface FlightSearchData {
  futureDay: string;
  locationFrom: string;
  locationTo: string;
  passenger: number;
  class: CabinType;
}