export interface WeeklyTrendChartDatum {
  day: string;
  tickets: number;
}

export const DUMMY_WEEKLY_TREND_DATA: WeeklyTrendChartDatum[] = [
  { day: "Mon", tickets: 8 },
  { day: "Tue", tickets: 12 },
  { day: "Wed", tickets: 10 },
  { day: "Thu", tickets: 15 },
  { day: "Fri", tickets: 18 },
  { day: "Sat", tickets: 6 },
  { day: "Sun", tickets: 9 },
];
