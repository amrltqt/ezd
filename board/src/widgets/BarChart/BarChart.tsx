import Chart from "chart.js/auto";

import { useEffect, useRef } from "react";

import { resolveDataset } from "../../hooks";
import { BarChart } from ".";

import "./Chart.css";

export function BarChartWidget({
  title,
  dataset,
  xaxis,
  yaxis,
  data,
}: BarChart) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const resolvedDataset = resolveDataset(dataset, data) || [];
    const values = {
      labels: resolvedDataset.map((row) => row[xaxis]),
      datasets: yaxis.map((column) => ({
        label: column.name,
        backgroundColor: column.color,
        borderWidth: 0,
        pointRadius: 2,
        fill: false,
        tension: 0.1,
        data: resolvedDataset.map((v) => v[column.name]),
      })),
    };
    const canvasElement = ref.current as HTMLCanvasElement;
    const chart = new Chart(canvasElement, {
      type: "bar",
      data: values,
      options: {
        font: {
          size: 16,
          family: "Roboto, sans-serif",
        },
        responsive: true,
        animation: false,
        devicePixelRatio: 3,
        scales: {
          x: {
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
            ticks: {
              font: {
                family: "Roboto, sans-serif",
                weight: "normal",
                size: 10,
              },
            },
          },
          y: {
            grid: {
              display: true,
            },
            border: {
              display: false,
            },
            ticks: {
              font: {
                family: "Roboto, sans-serif",
                weight: "normal",
                size: 10,
              },
            },
          },
        },
        plugins: {
          legend: {
            position: "top",
            align: "end",
            labels: {
              font: {
                family: "Roboto, sans-serif",
                size: 12,
              },
              boxHeight: 5,
              boxWidth: 5,
              usePointStyle: true,
            },
          },
          tooltip: {
            enabled: false,
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [dataset, xaxis, yaxis, data]);

  return (
    <div className="chart">
      <canvas ref={ref}></canvas>
      <div className="chart-title">{title}</div>
    </div>
  );
}
