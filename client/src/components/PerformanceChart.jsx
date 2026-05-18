import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const chartColors = [
  'rgba(99, 102, 241, 0.8)',   // indigo
  'rgba(236, 72, 153, 0.8)',   // pink
  'rgba(168, 85, 247, 0.8)',   // purple
  'rgba(20, 184, 166, 0.8)',   // teal
  'rgba(16, 185, 129, 0.8)',   // emerald
  'rgba(249, 115, 22, 0.8)',   // orange
  'rgba(6, 182, 212, 0.8)',    // cyan
  'rgba(99, 102, 241, 0.6)',   // indigo light
];

const chartBorders = [
  'rgba(99, 102, 241, 1)',
  'rgba(236, 72, 153, 1)',
  'rgba(168, 85, 247, 1)',
  'rgba(20, 184, 166, 1)',
  'rgba(16, 185, 129, 1)',
  'rgba(249, 115, 22, 1)',
  'rgba(6, 182, 212, 1)',
  'rgba(99, 102, 241, 1)',
];

const baseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: { color: '#94a3b8', font: { family: 'Inter' } },
    },
    tooltip: {
      backgroundColor: '#1e293b',
      titleColor: '#e2e8f0',
      bodyColor: '#cbd5e1',
      borderColor: 'rgba(99, 102, 241, 0.3)',
      borderWidth: 1,
      cornerRadius: 12,
      padding: 12,
    },
  },
};

export const DepartmentBarChart = ({ employees }) => {
  // Group by department and calculate average score
  const deptMap = {};
  employees.forEach((emp) => {
    if (!deptMap[emp.department]) {
      deptMap[emp.department] = { total: 0, count: 0 };
    }
    deptMap[emp.department].total += emp.performanceScore;
    deptMap[emp.department].count += 1;
  });

  const labels = Object.keys(deptMap);
  const avgScores = labels.map((dept) => Math.round(deptMap[dept].total / deptMap[dept].count));

  const data = {
    labels,
    datasets: [
      {
        label: 'Avg Performance Score',
        data: avgScores,
        backgroundColor: chartColors.slice(0, labels.length),
        borderColor: chartBorders.slice(0, labels.length),
        borderWidth: 1,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    ...baseOptions,
    scales: {
      x: {
        ticks: { color: '#94a3b8', font: { family: 'Inter' } },
        grid: { color: 'rgba(51, 65, 85, 0.3)' },
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { color: '#94a3b8', font: { family: 'Inter' } },
        grid: { color: 'rgba(51, 65, 85, 0.3)' },
      },
    },
  };

  return (
    <div className="h-72">
      <Bar data={data} options={options} />
    </div>
  );
};

export const PerformanceDoughnut = ({ employees }) => {
  const categories = {
    'Outstanding (90-100)': employees.filter((e) => e.performanceScore >= 90).length,
    'Excellent (80-89)': employees.filter((e) => e.performanceScore >= 80 && e.performanceScore < 90).length,
    'Good (60-79)': employees.filter((e) => e.performanceScore >= 60 && e.performanceScore < 80).length,
    'Needs Improvement (40-59)': employees.filter((e) => e.performanceScore >= 40 && e.performanceScore < 60).length,
    'Critical (<40)': employees.filter((e) => e.performanceScore < 40).length,
  };

  // Filter out zero categories
  const filtered = Object.entries(categories).filter(([, v]) => v > 0);
  const labels = filtered.map(([k]) => k);
  const values = filtered.map(([, v]) => v);

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(234, 179, 8, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ].slice(0, labels.length),
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(234, 179, 8, 1)',
          'rgba(249, 115, 22, 1)',
          'rgba(239, 68, 68, 1)',
        ].slice(0, labels.length),
        borderWidth: 2,
        cutout: '60%',
      },
    ],
  };

  return (
    <div className="h-72">
      <Doughnut data={data} options={baseOptions} />
    </div>
  );
};
