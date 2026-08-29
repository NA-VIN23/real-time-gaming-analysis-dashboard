import React from 'react';
import { AnalysisResult, Platform } from '../types';
import { PLATFORM_CONFIG } from '../constants';

interface AnalysisPanelProps {
  analysisResults: AnalysisResult[] | null;
  lastAnalyzed: { timestamp: number, pointsUsed: number } | null;
}

const TrendIcon: React.FC<{ summary: string }> = ({ summary }) => {
    if (summary.includes('increase')) {
        return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 011.414 0l-3 3a1 1 0 010 1.414z" clipRule="evenodd" transform="rotate(180 10 10) scale(-1, 1)"/></svg>;
    }
    if (summary.includes('decrease')) {
        return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 011.414 0l-3 3a1 1 0 010 1.414z" clipRule="evenodd" /></svg>;
    }
    return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" /></svg>;
};

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ analysisResults, lastAnalyzed }) => {
  if (!analysisResults || !lastAnalyzed) {
    return (
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 h-full flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-bold text-gray-100 mb-4">Analysis & Suggestions</h2>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
        <p className="text-gray-400">Click the "Analyze" button to generate insights from the live data.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 h-full flex flex-col">
      <div className="flex justify-between items-baseline mb-4">
        <h2 className="text-xl font-bold text-gray-100">Analysis</h2>
         <p className="text-xs text-gray-400" title={`Analyzed using ${lastAnalyzed.pointsUsed} data points.`}>
          {new Date(lastAnalyzed.timestamp).toLocaleTimeString()}
        </p>
      </div>
      <div className="space-y-6 overflow-y-auto">
        {analysisResults.map(result => {
          const config = PLATFORM_CONFIG[result.platform];
          return(
          <div key={result.platform}>
            <div className="flex items-center mb-2">
              <span className="h-3 w-3 rounded-full mr-3" style={{ backgroundColor: config.color }}></span>
              <h3 className="text-lg font-semibold text-gray-200">{config.name}</h3>
            </div>
            <div className="pl-6 border-l-2 border-gray-700">
              <div className="flex items-start space-x-2 text-gray-300 mb-2">
                <TrendIcon summary={result.summary} />
                <p className="text-sm">{result.summary}</p>
              </div>
              {result.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start space-x-2 text-gray-400">
                  <span className="text-green-400 mt-1">&#10148;</span>
                  <p className="text-sm">{suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        )})}
      </div>
    </div>
  );
};