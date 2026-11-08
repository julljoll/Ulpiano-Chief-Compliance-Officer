/**
 * ULPIANO CCO — Chart.js Visualizations Module
 */
import { DocRegistry } from './registry.js';

let chartDistribution = null;
let chartScope = null;

export function initDashboardCharts() {
  if (typeof Chart === 'undefined') return;

  const latest = DocRegistry.getLatest() || {};
  const defaultLabels = [
    'Título I (Gral)', 'Título II (Institucional)', 'Título III (Técnico)',
    'Título IV (Garantías)', 'Título VII (Integridad)', 'Título VIII (Sanciones)',
    'Título XI (Supremacía)'
  ];
  const defaultData = [6, 4, 3, 2, 4, 8, 5];

  const chartLabels = (latest.reformsDistribution && latest.reformsDistribution.labels) || defaultLabels;
  const chartData = (latest.reformsDistribution && latest.reformsDistribution.data) || defaultData;
  const chartDatasetLabel = `Modificaciones Introducidas (${latest.shortLabel || latest.id || 'V1.1'})`;

  // 1. Distribution of changes chart
  const ctxDist = document.getElementById('chartReformsDistribution');
  if (ctxDist) {
    if (chartDistribution) chartDistribution.destroy();
    chartDistribution = new Chart(ctxDist, {
      type: 'bar',
      data: {
        labels: chartLabels,
        datasets: [{
          label: chartDatasetLabel,
          data: chartData,
          backgroundColor: '#004987',
          borderColor: '#0b1b3d',
          borderWidth: 1,
          borderRadius: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.06)' } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  // 2. Scope distribution chart
  const ctxScope = document.getElementById('chartScope');
  if (ctxScope) {
    if (chartScope) chartScope.destroy();
    chartScope = new Chart(ctxScope, {
      type: 'doughnut',
      data: {
        labels: [
          'Poder Judicial (TSJ y Cortes)',
          'Administración Pública Nacional/Estadal',
          'Ministerio Público',
          'Defensa Pública',
          'Auxiliares y Forenses'
        ],
        datasets: [{
          data: [35, 30, 15, 10, 10],
          backgroundColor: ['#004987', '#2e8540', '#df7e00', '#28a0e0', '#5c6b7e'],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 12, font: { size: 11 } }
          }
        }
      }
    });
  }
}
