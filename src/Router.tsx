import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chart from './routes/Chart';
import Coin from './routes/Coin';
import Coins from './routes/Coins';
import Price from './routes/Price';
// path={`${process.env.PUBLIC_URL}/`}
const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Coins />}></Route>
      <Route path="/:coinId" element={<Coin />}>
        <Route path="price" element={<Price />} />
        <Route path="chart" element={<Chart />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;