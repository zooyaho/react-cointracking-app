import React, { useState } from 'react';
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

const Coin = () => {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams(); // react-router-dom 버전 6부터는 타입지정 안해도 됨.
  const {state} = useLocation()  as RouteState;
  // API 요청 전, state를 통한 coin.name을 전달할 수 있으므로 화면에 재빨리 표시할 수 있음.
  // 다만 문제는 <Coin> ⇒ <Coins> 가 아닌 바로 <Coins> 로 접근했을 때는 받아올 coin.name이 없으므로 안전장치가 필요함.

  return (
    <Container>
      <Header>
        <Title>{state?.name || 'Loading'}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
};

export default Coin;