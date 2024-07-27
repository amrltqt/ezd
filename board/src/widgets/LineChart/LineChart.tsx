import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

import "./Chart.css";

import { resolveDataset } from "../../hooks";
import { LineChart } from ".";

export function LineChartWidget({
  title,
  dataset,
  xaxis,
  yaxis,
  data,
}: LineChart) {
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
        borderColor: column.color,
        backgroundColor: column.color,
        borderWidth: 1.5,
        pointRadius: 2,
        tension: 0,
        data: resolvedDataset.map((v) => v[column.name]),
      })),
    };

    const canvasElement = ref.current as HTMLCanvasElement;
    const chart = new Chart(canvasElement, {
      type: "line",
      data: values,
      options: {
        font: {
          size: 12,
          family: "Roboto, sans-serif",
        },
        responsive: true,
        animation: false,
        //devicePixelRatio: 3,
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
  }, [data, dataset, xaxis, yaxis]);

  return (
    <div className="chart">
      <canvas ref={ref}></canvas>
      <div className="chart-title">{title}</div>
    </div>
  );
}
