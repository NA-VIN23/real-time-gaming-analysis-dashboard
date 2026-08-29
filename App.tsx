import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Controls } from './components/Controls';
import { PredictionChart } from './components/RealTimeChart';
import { AnalysisPanel } from './components/Legend';
import { useRealTimeData } from './hooks/useRealTimeData';
import { PLATFORMS } from './constants';
import { AnalysisResult } from './types';

const App: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[] | null>(null);
  const [lastAnalyzed, setLastAnalyzed] = useState<{timestamp: number, pointsUsed: number} | null>(null);

  const { chartData, lastUpdated, refreshData, runAnalysis } = useRealTimeData(PLATFORMS);

  const handleAnalyze = async () => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);
    const { results, pointsUsed } = await runAnalysis();
    setAnalysisResults(results);
    setLastAnalyzed({ timestamp: Date.now(), pointsUsed });
    setIsAnalyzing(false);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header />
      <main className="flex-grow flex flex-col items-center w-full px-4 md:px-8">
        <Controls 
          onRefresh={refreshData}
          lastUpdated={lastUpdated}
          isAnalyzing={isAnalyzing}
          onAnalyze={handleAnalyze}
        />
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gray-800 rounded-2xl shadow-2xl p-4 sm:p-6 border border-gray-700">
            <div className="h-80 md:h-96 w-full">
              <PredictionChart data={chartData} />
            </div>
          </div>
          <div className="lg:col-span-1">
             <AnalysisPanel analysisResults={analysisResults} lastAnalyzed={lastAnalyzed} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;