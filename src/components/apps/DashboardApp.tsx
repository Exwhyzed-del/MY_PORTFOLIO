'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, GitBranch, CheckCircle, Star } from 'lucide-react';

const problemData = [
  { name: 'Jan', problems: 20 },
  { name: 'Feb', problems: 35 },
  { name: 'Mar', problems: 45 },
  { name: 'Apr', problems: 60 },
  { name: 'May', problems: 75 },
  { name: 'Jun', problems: 90 }
];

const DashboardApp = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-primary mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="glass p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-primary" />
            <span className="text-gray-400 text-sm">Total Visitors</span>
          </div>
          <div className="text-3xl font-bold text-primary">1,234</div>
        </div>
        <div className="glass p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <GitBranch className="w-5 h-5 text-secondary" />
            <span className="text-gray-400 text-sm">Projects</span>
          </div>
          <div className="text-3xl font-bold text-secondary">7</div>
        </div>
        <div className="glass p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-accent" />
            <span className="text-gray-400 text-sm">Problems Solved</span>
          </div>
          <div className="text-3xl font-bold text-accent">300+</div>
        </div>
        <div className="glass p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-gray-400 text-sm">GitHub Stars</span>
          </div>
          <div className="text-3xl font-bold text-yellow-400">500</div>
        </div>
      </div>
      <div className="glass p-6 rounded-xl h-64">
        <h2 className="text-xl font-bold text-secondary mb-4">Problems Solved</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={problemData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip
              contentStyle={{ backgroundColor: '#050505', border: '1px solid #00ff88' }}
              labelStyle={{ color: '#00ff88' }}
            />
            <Bar dataKey="problems" fill="#00ff88" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardApp;
