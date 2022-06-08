import React from 'react';
import { useParams } from 'react-router-dom';

interface RouteParams {
  coinId:string;
}

const Coin = ()=>{
  const {coinId} = useParams();
  console.log(coinId);

  return(
    <h1>Coin: {coinId}</h1>
  );
};

export default Coin;