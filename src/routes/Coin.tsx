import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 25vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

interface RouteState {
  state: {
    name: string;
  };
  // react-router-dom v6 부터 제네릭을 지원하지 않음.
}

interface IinfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

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

const Coin = () => {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams(); // react-router-dom 버전 6부터는 타입지정 안해도 됨.
  const { state } = useLocation() as RouteState;
  // API 요청 전, state를 통한 coin.name을 전달할 수 있으므로 화면에 재빨리 표시할 수 있음.
  // 다만 문제는 <Coin> ⇒ <Coins> 가 아닌 바로 <Coins> 로 접근했을 때는 받아올 coin.name이 없으므로 안전장치가 필요함. => {state?.name || 'Loading'}
  const [info, setInfo] = useState<IinfoData>();
  const [priceInfo, setPriceInfo] = useState<IpriceData>();

  useEffect(() => {
    (async () => {
      const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
      const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();

      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>{state?.name || 'Loading'}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : priceInfo?.quotes.USD.ath_date}
    </Container>
  );
};

export default Coin;