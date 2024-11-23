export interface DayOfWeek {
  name: string;
  shortName: string;
  index: number;
}

export interface Day {
  value: number;
  isSelected: boolean;
}

export const DAYS_OF_WEEK: DayOfWeek[] = [
  { name: "Monday", shortName: "Mo", index: 1 },
  { name: "Tuesday", shortName: "Tu", index: 2 },
  { name: "Wednesday", shortName: "We", index: 3 },
  { name: "Thursday", shortName: "Th", index: 4 },
  { name: "Friday", shortName: "Fr", index: 5 },
  { name: "Saturday", shortName: "Sa", index: 6 },
  { name: "Sunday", shortName: "Su", index: 0 },
];
