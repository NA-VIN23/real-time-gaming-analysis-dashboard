import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { ChartData } from '../types';
import { PLATFORM_CONFIG } from '../constants';

interface PredictionChartProps {
  data: ChartData[];
}

export const PredictionChart: React.FC<PredictionChartProps> = ({ data }) => {
    
  const formatYAxis = (tickItem: number) => {
    return tickItem >= 1000 ? `${(tickItem / 1000).toFixed(0)}k` : tickItem.toString();
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
        <XAxis 
            dataKey="name" 
            stroke="#a0aec0"
            tick={{ fill: '#a0aec0', fontSize: 14 }}
            axisLine={false}
            tickLine={false}
        />
        <YAxis 
            stroke="#a0aec0"
            tick={{ fill: '#a0aec0', fontSize: 12 }}
            tickFormatter={formatYAxis}
            axisLine={false}
            tickLine={false}
            width={40}
        />
        <Tooltip
            cursor={{fill: 'rgba(107, 114, 128, 0.2)'}}
            contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563', borderRadius: '0.5rem' }}
            labelStyle={{ color: '#d1d5db', fontWeight: 'bold' }}
            formatter={(value: number, name: string) => [value.toLocaleString(), name.charAt(0).toUpperCase() + name.slice(1)]}
        />
        <Legend wrapperStyle={{paddingTop: '20px', color: '#d1d5db'}} />
        <Bar dataKey="actual" name="Actual" radius={[4, 4, 0, 0]}>
            {data.map((entry) => {
                const platformKey = Object.keys(PLATFORM_CONFIG).find(p => PLATFORM_CONFIG[p as keyof typeof PLATFORM_CONFIG].name === entry.name) as keyof typeof PLATFORM_CONFIG;
                return <Cell key={`cell-actual-${entry.name}`} fill={platformKey ? PLATFORM_CONFIG[platformKey].color : '#8884d8'} />;
            })}
        </Bar>
        <Bar dataKey="predicted" name="Predicted" radius={[4, 4, 0, 0]}>
            {data.map((entry) => {
                const platformKey = Object.keys(PLATFORM_CONFIG).find(p => PLATFORM_CONFIG[p as keyof typeof PLATFORM_CONFIG].name === entry.name) as keyof typeof PLATFORM_CONFIG;
                return <Cell key={`cell-predicted-${entry.name}`} fill={platformKey ? PLATFORM_CONFIG[platformKey].predictedColor : '#82ca9d'} />;
            })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};