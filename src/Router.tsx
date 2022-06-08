import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Coin from './routes/Coin';
import Coins from './routes/Coins';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/:coinId"><Coin /></Route>
      <Route path="/"><Coins /></Route>
    </Switch>
  </BrowserRouter>
);

export default Router;