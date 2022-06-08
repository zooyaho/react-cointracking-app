import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

const CoinsList = styled.ul``;

const Coin = styled.li`
  height: 13vh;
  display: flex;
  align-items:center;
  font-weight: bold;
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 10px;
  margin-bottom: 10px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: block;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
const coins = [
  {
    "id": "btc-bitcoin",
    "name": "Bitcoin",
    "symbol": "BTC",
    "rank": 1,
    "is_new": false,
    "is_active": true,
    "type": "coin"
  },
  {
    "id": "eth-ethereum",
    "name": "Ethereum",
    "symbol": "ETH",
    "rank": 2,
    "is_new": false,
    "is_active": true,
    "type": "coin"
  },
  {
    "id": "usdt-tether",
    "name": "Tether",
    "symbol": "USDT",
    "rank": 3,
    "is_new": false,
    "is_active": true,
    "type": "token"
  }
];
const Coins = () => {
  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      <CoinsList>
        {coins.map((coin) => (
          <Coin key={coin.id}>
            <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
          </Coin>
        ))}
      </CoinsList>
    </Container>
  );
};

export default Coins;