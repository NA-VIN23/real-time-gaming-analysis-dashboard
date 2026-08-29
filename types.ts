export type Platform = 'mobile' | 'console' | 'cloud';

// Raw data point from the source
export interface DataPoint {
  timestamp: number;
  mobile?: number;
  console?: number;
  cloud?: number;
  [key: string]: number | undefined;
}

// Data format for the bar chart
export interface ChartData {
  name: string; // e.g., 'Mobile'
  actual: number;
  predicted: number;
}

// Data format for the analysis panel
export interface AnalysisResult {
  platform: Platform;
  lastValue: number;
  predictedNext: number;
  pctChange: number;
  trend: 'rising' | 'falling' | 'stable';
  summary: string;
  suggestions: string[];
}