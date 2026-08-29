import { Platform, AnalysisResult } from '../types';
import { EMA_ALPHA, SUGGESTIONS } from '../constants';

/**
 * Calculates a simple Exponential Moving Average (EMA) for the next data point.
 * @param series - An array of historical numbers.
 * @param alpha - The smoothing factor (0 to 1).
 * @returns The predicted next value.
 */
export const predictWithEMA = (series: number[], alpha: number = EMA_ALPHA): number => {
  if (series.length === 0) return 0;
  if (series.length === 1) return series[0];

  let ema = series[0];
  for (let i = 1; i < series.length; i++) {
    ema = alpha * series[i] + (1 - alpha) * ema;
  }
  return Math.round(ema);
};

/**
 * Generates a brief analysis and suggestion based on trend.
 * @param platform The platform being analyzed.
 * @param actual The latest actual value.
 * @param predicted The predicted next value.
 * @returns An object with a summary and a suggestion.
 */
export const generateAnalysis = (platform: Platform, actual: number, predicted: number): AnalysisResult => {
  if (actual === 0) {
    return {
      platform,
      lastValue: actual,
      predictedNext: predicted,
      pctChange: 0,
      trend: 'stable',
      summary: "Awaiting data to establish a trend.",
      suggestions: ["Monitor initial user adoption closely."],
    };
  }

  const percentChange = ((predicted - actual) / actual) * 100;
  let trend: 'rising' | 'falling' | 'stable';
  let summary: string;

  if (percentChange > 1) {
    trend = 'rising';
    summary = `Trend is positive, with a predicted increase of ~${percentChange.toFixed(1)}%.`;
  } else if (percentChange < -1) {
    trend = 'falling';
    summary = `Trend is negative, with a predicted decrease of ~${Math.abs(percentChange).toFixed(1)}%.`;
  } else {
    trend = 'stable';
    summary = "User count is stable with minor fluctuations expected.";
  }

  return {
    platform,
    lastValue: actual,
    predictedNext: predicted,
    pctChange: parseFloat(percentChange.toFixed(1)),
    trend,
    summary,
    suggestions: [SUGGESTIONS[trend][platform]],
  };
};