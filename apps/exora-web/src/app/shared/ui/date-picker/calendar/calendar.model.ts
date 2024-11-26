export interface DayOfWeek {
  name: string;
  shortName: string;
  index: number;
}

export interface CalendarState {
  month: number;
  year: number;
  days?: Days;
}

export interface Day {
  value: number;
  isSelected: boolean;
}

export interface Month {
  index: number;
  fullName: string;
  shortName: string;
}

export type Months = Month[];
export type Days = Day[];

export const DAYS_OF_WEEK: DayOfWeek[] = [
  { name: "Monday", shortName: "Mo", index: 1 },
  { name: "Tuesday", shortName: "Tu", index: 2 },
  { name: "Wednesday", shortName: "We", index: 3 },
  { name: "Thursday", shortName: "Th", index: 4 },
  { name: "Friday", shortName: "Fr", index: 5 },
  { name: "Saturday", shortName: "Sa", index: 6 },
  { name: "Sunday", shortName: "Su", index: 0 },
];

export const MONTHS: Months = [
  { index: 0, fullName: "January", shortName: "Jan" },
  { index: 1, fullName: "February", shortName: "Feb" },
  { index: 2, fullName: "March", shortName: "Mar" },
  { index: 3, fullName: "April", shortName: "Apr" },
  { index: 4, fullName: "May", shortName: "May" },
  { index: 5, fullName: "June", shortName: "Jun" },
  { index: 6, fullName: "July", shortName: "Jul" },
  { index: 7, fullName: "August", shortName: "Aug" },
  { index: 8, fullName: "September", shortName: "Sep" },
  { index: 9, fullName: "October", shortName: "Oct" },
  { index: 10, fullName: "November", shortName: "Nov" },
  { index: 11, fullName: "December", shortName: "Dec" },
];
