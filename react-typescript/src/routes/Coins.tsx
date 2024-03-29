import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import Footer from "../components/Footer";
// common
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;
const Loader = styled.div`
  text-align: center;
  padding: 54px;
`;
// coins
const CoinList = styled.ul``;
const Coin = styled.li`
  background-color: ${(props) => props.theme.listColor};
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  border-radius: 15px;
  a {
    display: flex;
    gap: 10px;
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
const Img = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 35px;
`;
// interface of json data
interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<CoinInterface[]>("allCoins", fetchCoins);
  // { isLoading, data } = useQuery("query key(unique)", fetcher function);

  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // // state의 type을 interface로 명시
  // // 배열 형태의 CoinInterface임으로 <CoinInterface[]>로 표기
  // useEffect(() => {
  //   (async () => {
  //     const response = await (
  //       await fetch("https://api.coinpaprika.com/v1/coins")
  //     ).json();
  //     setCoins(response.slice(0, 100));
  //     setLoading(false);
  //   })();
  //   /*
  //     1. (() => ...)(); => 즉시 실행되는 function.
  //     2. coinpaprika 코인파프리카 API : 가상 화폐 정보, 2024.03.09기준 67636개
  //       https://api.coinpaprika.com/v1/coins

  //   */
  // }, []);
  // console.log(coins);
  return (
    <Container>
      <Helmet>
        <title>Coin</title>
        <Title>Coin</Title>
      </Helmet>
      <Header>
        <Title>Coin</Title>
      </Header>
      {isLoading ? (
        <Loader>loading...</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `${process.env.PUBLIC_URL}/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                {/* Link to ={{object 형태로 전달}}, pathname/search/hash/state */}
                <Img
                  // src={`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol.toLowerCase()}`}
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                  alt={`${coin.name}'s image`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
            // &rarr; :  →
          ))}
        </CoinList>
      )}
      <Footer />
    </Container>
  );
}
export default Coins;
