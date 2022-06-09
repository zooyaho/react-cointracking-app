/*
const [coins, setCoins] = useState<coinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const json = await (await fetch("https://api.coinpaprika.com/v1/coins")).json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);
*/


export const fetchCoins = async () => {
  // json data의 promise를 리턴해줘야 함.
  return await (await fetch("https://api.coinpaprika.com/v1/coins")).json();

}