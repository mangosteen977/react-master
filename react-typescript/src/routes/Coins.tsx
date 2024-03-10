import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
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
  background-color: white;
  color: ${(props) => props.theme.bgColor};
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
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // state의 type을 interface로 명시
  // 배열 형태의 CoinInterface임으로 <CoinInterface[]>로 표기
  useEffect(() => {
    (async () => {
      const response = await (
        await fetch("https://api.coinpaprika.com/v1/coins")
      ).json();
      setCoins(response.slice(0, 100));
      setLoading(false);
    })();
    /*
      1. (() => ...)(); => 즉시 실행되는 function.
      2. coinpaprika 코인파프리카 API : 가상 화폐 정보, 2024.03.09기준 67636개
        https://api.coinpaprika.com/v1/coins
      
    */
  }, []);
  // console.log(coins);
  return (
    <Container>
      <Header>
        <Title>Coin</Title>
      </Header>
      {loading ? (
        <Loader>loading...</Loader>
      ) : (
        <CoinList>
          {coins.map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                {/* Link to ={{object 형태로 전달}}, pathname/search/hash/state */}
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  alt={`${coin.name}'s image`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
            // &rarr; :  →
          ))}
        </CoinList>
      )}
    </Container>
  );
}
export default Coins;