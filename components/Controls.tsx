import React from 'react';

interface ControlsProps {
  onRefresh: () => void;
  lastUpdated: number | null;
  isAnalyzing: boolean;
  onAnalyze: () => void;
}

const RefreshIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" /></svg>;
const AnalyzeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>;
const LoadingSpinner = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


export const Controls: React.FC<ControlsProps> = ({ onRefresh, lastUpdated, isAnalyzing, onAnalyze }) => {
  return (
    <div className="w-full max-w-7xl mx-auto flex items-center justify-between mb-6 px-4 sm:px-0">
        <div className="flex items-center space-x-2 sm:space-x-4">
            <button
                onClick={onAnalyze}
                disabled={isAnalyzing}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transition-colors disabled:bg-blue-800 disabled:opacity-75 disabled:cursor-not-allowed"
                aria-label="Analyze data"
            >
                {isAnalyzing ? <LoadingSpinner /> : <AnalyzeIcon />}
                <span>{isAnalyzing ? 'Analyzing...' : 'Analyze'}</span>
            </button>
            <button
                onClick={onRefresh}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transition-colors"
                aria-label="Refresh data"
            >
                <RefreshIcon />
                <span>Refresh</span>
            </button>
        </div>
        <div className="text-sm text-gray-400">
            {lastUpdated ? `Live: ${new Date(lastUpdated).toLocaleTimeString()}`: 'Updating...'}
        </div>
    </div>
  );
};