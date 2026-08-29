import { useState, useEffect, useRef, useCallback } from 'react';
import { DataPoint, Platform, ChartData, AnalysisResult } from '../types';
import { MAX_DATA_POINTS, PLATFORM_CONFIG, UPDATE_INTERVAL_MS } from '../constants';
import { predictWithEMA, generateAnalysis } from '../services/forecasting';

export const useRealTimeData = (platforms: Platform[]) => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  const dataHistoryRef = useRef<{ [key in Platform]: number[] }>(
    platforms.reduce((acc, platform) => {
      acc[platform] = [];
      return acc;
    }, {} as { [key in Platform]: number[] })
  );

  const generateNewData = useCallback(() => {
    const newTimestamp = Date.now();
    const newDataPoint: DataPoint = { timestamp: newTimestamp };
    const newChartData: ChartData[] = [];

    platforms.forEach(platform => {
      const history = dataHistoryRef.current[platform];
      const lastValue = history.length > 0 ? history[history.length - 1] : PLATFORM_CONFIG[platform].baseUsers;
      
      const fluctuation = (Math.random() - 0.5) * (lastValue * 0.02);
      const actual = Math.max(0, Math.round(lastValue + fluctuation));

      history.push(actual);
      if (history.length > MAX_DATA_POINTS) {
        history.shift();
      }
      
      const predicted = predictWithEMA(history);
      
      newDataPoint[platform] = actual;
      newChartData.push({ name: PLATFORM_CONFIG[platform].name, actual, predicted });
    });

    setData(prevData => {
      const updatedData = [...prevData, newDataPoint];
      return updatedData.length > MAX_DATA_POINTS ? updatedData.slice(1) : updatedData;
    });
    
    setChartData(newChartData);
    setLastUpdated(newTimestamp);
  }, [platforms]);

  const runAnalysis = useCallback(async (): Promise<{results: AnalysisResult[], pointsUsed: number}> => {
    // Simulate async work to make loading state visible
    await new Promise(resolve => setTimeout(resolve, 750));

    const analysisResults: AnalysisResult[] = [];
    let pointsUsed = 0;
    
    platforms.forEach(platform => {
        const history = dataHistoryRef.current[platform];
        if (history.length > 0) {
            const actual = history[history.length - 1];
            const predicted = predictWithEMA(history);
            const analysis = generateAnalysis(platform, actual, predicted);
            analysisResults.push(analysis);
            pointsUsed = Math.max(pointsUsed, history.length);
        }
    });
    return { results: analysisResults, pointsUsed };
  }, [platforms]);


  useEffect(() => {
    // Initial data load
    generateNewData();

    const interval = setInterval(() => {
      generateNewData();
    }, UPDATE_INTERVAL_MS);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generateNewData]);

  const refreshData = () => {
    // Reset history and generate new data immediately
    platforms.forEach(platform => {
      dataHistoryRef.current[platform] = [];
    });
    generateNewData();
  };

  return { chartData, lastUpdated, refreshData, runAnalysis };
};