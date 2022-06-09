import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchCoinHistory } from './api';
import ApexChart from "react-apexcharts";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number; // 종가
  volume: number;
  market_cap: number;
}

const Chart = () => {
  const { coinId } = useParams();
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId!));
  return (
    <div>
      {isLoading ?
        "Loading chart..." :
        <ApexChart
          type='line'
          series={[
            {
              name: "sales",
              data: data?.map(price => price.close)!
            },
          ]}
          options={{
            theme: { mode: "dark" },
            chart: { height: 500, width: 500, toolbar: { show: false }, background: "transparent" },
            grid: { show: false },
            stroke: { curve: "smooth" },
            yaxis: { show: false },
            xaxis: { axisBorder: { show: false }, axisTicks: { show: false }, labels: { show: false } },
          }}
        />
      }
    </div>
  );
};

export default Chart;