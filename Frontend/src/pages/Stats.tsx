import React, { useEffect, useRef, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { toPng } from 'html-to-image';
import './Stats.css';

interface ChartData {
  name: string;
  value: number;
}

interface CompanyProgress {
  company: string;
  total: number;
  completed: number;
}

const Stats: React.FC = () => {
  const [statusData, setStatusData] = useState<ChartData[]>([]);
  const [categoryData, setCategoryData] = useState<ChartData[]>([]);
  const [difficultyData, setDifficultyData] = useState<ChartData[]>([]);
  const [companyData, setCompanyData] = useState<ChartData[]>([]);
  const [companyProgress, setCompanyProgress] = useState<CompanyProgress[]>([]);

  const statusRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const difficultyRef = useRef<HTMLDivElement>(null);
  const companyRef = useRef<HTMLDivElement>(null);

  const downloadChartAsPNG = async (
    ref: React.RefObject<HTMLDivElement | null>,
    fileName: string
  ) => {
    if (!ref.current) return;
    try {
      const dataUrl = await toPng(ref.current);
      const link = document.createElement('a');
      link.download = fileName;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error generating PNG:', err);
    }
  };
useEffect(() => {
  const fetchStats = async () => {
    try {
      const [statusRes, categoryRes, difficultyRes, companyRes, progressRes] = await Promise.all([
        fetch('http://localhost:8080/api/stats/status'),
        fetch('http://localhost:8080/api/stats/category'),
        fetch('http://localhost:8080/api/stats/difficulty'),
        fetch('http://localhost:8080/api/stats/company'),
        fetch('http://localhost:8080/api/stats/company-progress'),
      ]);

      const progressJson = await progressRes.json();

      // Ensure it's always an array
      const safeProgress = Array.isArray(progressJson) ? progressJson : [];

      setStatusData(await statusRes.json());
      setCategoryData(await categoryRes.json());
      setDifficultyData(await difficultyRes.json());
      setCompanyData(await companyRes.json());
      setCompanyProgress(safeProgress);  // ✅ Fix applied here
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  fetchStats();
}, []);


  const STATUS_COLORS = ['#8884d8', '#00C49F', '#FFBB28'];
  const CATEGORY_COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#9b59b6', '#2ecc71'];
  const DIFFICULTY_COLORS = ['#4CAF50', '#FF9800', '#F44336'];

  return (
    <div className="stats-page">
      <h2>📊 Interview Prep Tracker Stats</h2>

      <div className="charts-row">
        {/* Status */}
        <div className="chart-wrapper" ref={statusRef}>
          <h3>Status Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
               label={({ percent }: { percent?: number }) =>
  percent !== undefined ? `${(percent * 100).toFixed(0)}%` : ''
}

              >
                {statusData.map((_, index) => (
                  <Cell key={index} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <button onClick={() => downloadChartAsPNG(statusRef, 'status-overview.png')}>📥 Download PNG</button>
        </div>

        {/* Category */}
        <div className="chart-wrapper" ref={categoryRef}>
          <h3>Category Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ percent }: { percent?: number }) =>
  percent !== undefined ? `${(percent * 100).toFixed(0)}%` : ''
}

              >
                {categoryData.map((_, index) => (
                  <Cell key={index} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <button onClick={() => downloadChartAsPNG(categoryRef, 'category-breakdown.png')}>📥 Download PNG</button>
        </div>
      </div>

      <div className="charts-row">
        {/* Difficulty */}
        <div className="chart-wrapper" ref={difficultyRef}>
          <h3>Difficulty Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={difficultyData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ percent }: { percent?: number }) =>
  percent !== undefined ? `${(percent * 100).toFixed(0)}%` : ''
}

              >
                {difficultyData.map((_, index) => (
                  <Cell key={index} fill={DIFFICULTY_COLORS[index % DIFFICULTY_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <button onClick={() => downloadChartAsPNG(difficultyRef, 'difficulty-breakdown.png')}>📥 Download PNG</button>
        </div>

        {/* Company */}
        <div className="chart-wrapper" ref={companyRef}>
          <h3>Company-wise Questions</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={companyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
          <button onClick={() => downloadChartAsPNG(companyRef, 'company-questions.png')}>📥 Download PNG</button>
        </div>
      </div>

      {/* Company-wise Progress */}
      <div className="progress-wrapper">
        <h3>📶 Company-wise Progress</h3>
        {companyProgress.map((item, idx) => {
          const percent = ((item.completed / item.total) * 100).toFixed(0);
          return (
            <div key={idx} className="progress-item">
              <div className="progress-label">
                {item.company}: {item.completed}/{item.total} completed ({percent}%)
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${percent}%` }}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stats;
