import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchCoins } from './api';
import { Helmet } from 'react-helmet';

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
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const CoinImg = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
};

const Coins = () => {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  /*
  const [coins, setCoins] = useState<ICoin[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const json = await (await fetch("https://api.coinpaprika.com/v1/coins")).json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);
  */
  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
      </Header>
      <CoinsList>
        {isLoading ? <Loader>Loading...</Loader> : data?.slice(0, 100).map((coin) => (
          <Coin key={coin.id}>
            <Link to={`/${coin.id}`} state={{ name: coin.name }} >
              <CoinImg src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} alt={coin.id} />{coin.name} &rarr;
            </Link>
          </Coin>
        ))}
      </CoinsList>
    </Container>
  );
};

export default Coins;