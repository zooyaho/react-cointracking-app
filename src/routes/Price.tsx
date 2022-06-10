import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoinTickers } from './api';
import ApexChart from "react-apexcharts";

interface IpriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    }
  };
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const PriceInroWrap = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid ${(props) => props.theme.accentColor};
  border-radius: 10px;
`;
const PriceInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 20px;
`;
const PriceInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
    margin-top: 10px;
  }
`;
const ChartSection = styled.div`
  margin-top: 20px;
`;


const Price = () => {
  const { coinId } = useParams();
  const { isLoading, data } = useQuery<IpriceData>(["price", coinId], () => fetchCoinTickers(coinId!), { refetchInterval: 10000 });
  // price: {data?.quotes.USD.price.toFixed(2)}
  return (
    <>
      {isLoading ? "Loading..." :
        <Container>
          <PriceInroWrap>
            <PriceInfo>
              <PriceInfoItem>
                <span>Volume_24h:</span>
                <span>{data?.quotes.USD.volume_24h.toFixed(2)}</span>
              </PriceInfoItem>
              <PriceInfoItem>
                <span>Change_24h:</span>
                <span>{data?.quotes.USD.volume_24h_change_24h.toFixed(2)}</span>
              </PriceInfoItem>
            </PriceInfo>
            <PriceInfo>
              <PriceInfoItem>
                <span>Market_cap:</span>
                <span>{data?.quotes.USD.market_cap.toFixed(2)}</span>
              </PriceInfoItem>
              <PriceInfoItem>
                <span>Change_24h:</span>
                <span>{data?.quotes.USD.market_cap_change_24h.toFixed(2)}</span>
              </PriceInfoItem>
            </PriceInfo>
            <PriceInfo>
              <PriceInfoItem>
                <span>Ath_price:</span>
                <span>{data?.quotes.USD.ath_price.toFixed(2)}</span>
              </PriceInfoItem>
              <PriceInfoItem>
                <span>Ath_date:</span>
                <span>{data?.quotes.USD.ath_date}</span>
              </PriceInfoItem>
            </PriceInfo>
          </PriceInroWrap>
          <ChartSection>
            {isLoading ? (
              "Loading chart..."
            ) : (
              <ApexChart
                type="line"
                series={[
                  {
                    name: "Percent",
                    data: [
                      +data?.quotes.USD.percent_change_15m.toFixed(2)!,
                      +data?.quotes.USD.percent_change_30m.toFixed(2)!,
                      +data?.quotes.USD.percent_change_1h.toFixed(2)!,
                      +data?.quotes.USD.percent_change_6h.toFixed(2)!,
                      +data?.quotes.USD.percent_change_12h.toFixed(2)!,
                      +data?.quotes.USD.percent_change_24h.toFixed(2)!,
                      +data?.quotes.USD.percent_change_7d.toFixed(2)!,
                      +data?.quotes.USD.percent_change_30d.toFixed(2)!,
                      +data?.quotes.USD.percent_change_1y.toFixed(2)!,
                    ],
                  },
                ]}
                options={{
                  theme: {
                    mode: "dark",
                  },
                  chart: {
                    height: 300,
                    width: 500,
                    toolbar: {
                      show: false,
                    },
                    background: "transparent",
                  },
                  dataLabels: {
                    enabled: false
                  },
                  title: {
                    text: 'Percent Change',
                    align: 'left'
                  },
                  stroke: {
                    curve: "smooth",
                    width: 4,
                  },
                  colors: ['#7d5fff'],
                  grid: {
                    show: false,
                  },
                  yaxis: {
                    show: false,
                  },
                  xaxis: {
                    categories: ['15m', '30m', '1h', '6h', '12h', '24h', '7d', '30d', '1y'],
                  }
                }}
              />)}
          </ChartSection>
        </Container>}
    </>
  );
};

export default Price;