import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-4 mt-8">
      <div className="text-center text-sm text-gray-500">
        <p>Data is simulated for demonstration purposes. Forecasting by Exponential Moving Average (EMA).</p>
        <p>&copy; {new Date().getFullYear()} Gaming Analysis Dashboard. All rights reserved.</p>
      </div>
    </footer>
  );
};
