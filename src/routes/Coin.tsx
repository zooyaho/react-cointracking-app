import { Helmet } from 'react-helmet'; //문서의 <head>의 <title>을 변경할 수 있음.
import { useQuery } from 'react-query';
import { useParams, useLocation, useMatch, Outlet, Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoinInfo, fetchCoinTickers } from './api';

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

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
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
  const { coinId } = useParams(); // react-router-dom 버전 6부터는 타입지정 안해도 됨.
  const { state } = useLocation() as RouteState;
  // API 요청 전, state를 통한 coin.name을 전달할 수 있으므로 화면에 재빨리 표시할 수 있음.
  // 다만 문제는 <Coin> ⇒ <Coins> 가 아닌 바로 <Coins> 로 접근했을 때는 받아올 coin.name이 없으므로 안전장치가 필요함. => {state?.name || 'Loading'}
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  // 각각의 고유 id로 coinId가 적절하지만 두 쿼리 모두 같은 아이디를 가리키고 있어 캐시에 저장되는 쿼리를 식별하기에 적절하지 않음. => 배열로 저장되어 있기때문에 식별 문자를 추가하면 됨.
  const { isLoading: infoLoading, data: infoData } = useQuery<IinfoData>(["info", coinId], () => fetchCoinInfo(coinId!));
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IpriceData>(
    ["tickers", coinId], 
    () => fetchCoinTickers(coinId!), 
    {
      refetchInterval: 5000
    }
  );
  // !:  non-null assertion 연산자를 써서 피연산자가 null이나 undefined가 아닐 거라고(=항상 값이 할당될 거라고) 주장할 수 있음.

  /*
  const [loading, setLoading] = useState(true);
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
  }, [coinId]);
  // coinId은 컴포넌트의 일생동안 변하지 않기 때문에 의존성에 추가해도 한번만 실행하므로 괜찮음.
  */
  const isLoading = infoLoading && tickersLoading;

  return (
    <>
      <Helmet>
        <title>
          {state?.name ? state.name : isLoading ? 'MyCoins' : infoData?.name}
        </title>
      </Helmet>
      <Container>
        <Header>
          <Title>
            {/* Coins로부터 들어온게 아니라 바로 Coin화면으로 들어왔을 경우 API로부터 받은 name으로 title 출력 */}
            {state?.name ? state.name : isLoading ? "Loading..." : infoData?.name}
          </Title>
        </Header>
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <>
            <Overview>
              <OverviewItem>
                <span>Rank:</span>
                <span>{infoData?.rank}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Symbol:</span>
                <span>${infoData?.symbol}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Price:</span>
                <span>{tickersData?.quotes.USD.price.toFixed(2)}</span>
              </OverviewItem>
            </Overview>
            <Description>{infoData?.description}</Description>
            <Overview>
              <OverviewItem>
                <span>Total Suply:</span>
                <span>{tickersData?.total_supply}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Max Supply:</span>
                <span>{tickersData?.max_supply}</span>
              </OverviewItem>
            </Overview>
            <Tabs>
              {/* isActive에 true/false 할당해야하니까 */}
              <Tab isActive={chartMatch !== null}>
                <Link to={`/${coinId}/chart`}>Chart</Link>
              </Tab>
              <Tab isActive={priceMatch !== null}>
                <Link to={`/${coinId}/price`}>Price</Link>
              </Tab>
            </Tabs>
            {/* Chart, Price 화면 전환을 위한 하위 route 표시 */}
            <Outlet />
          </>
        )}
      </Container>
    </>
  );
};

export default Coin;