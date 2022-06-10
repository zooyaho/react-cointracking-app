import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchCoinHistory } from './api';
import ApexChart from "react-apexcharts";
import ModeContext from '../store/mode-context';

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
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId!), { refetchInterval: 10000 });
  const modeCtx = useContext(ModeContext);
  
  return (
    <div>
      {isLoading ?
        "Loading chart..." :
        <ApexChart
          type='candlestick'
          series={[
            {
              data: data?.map((price) => {
                return { 
                  x: price.time_close, 
                  y: [
                    price.open.toFixed(2), 
                    price.high.toFixed(2), 
                    price.low.toFixed(2), 
                    price.close.toFixed(2)] 
                  }
              })!
            },
          ]}
          options={{
            theme: { mode: modeCtx.isLightMode? "light" :"dark" },
            chart: { height: 350, width: 500, toolbar: { show: false }, background: "transparent" },
            grid: { show: true },
            yaxis: { 
              show: true,
              labels: {
                formatter: function(val) {
                  return val.toFixed(2);
                }
              },
             },
            xaxis: {
              labels: { show: true },
              type: 'datetime',
            },
          }}
        />
      }
    </div>
  );
};

export default Chart;