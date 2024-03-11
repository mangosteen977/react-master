import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import {
  Switch,
  Route,
  useParams,
  useLocation,
  useRouteMatch,
} from "react-router";
// useRouteMatch : 특정 URL에 있는 지 여부를 확인
import { Link } from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
// fetcher functions from api.tsx (react query)
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
// coin
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

const Tab = styled.span<{ $isActive: boolean }>`
  // $isActive: Tab에서 props로 전달된 값(useRouteMatch로 url 매치 확인)
  // $붙은 이유 : React18 이후 일관성을 높이고, 사용자 혼동을 방지하기 위해
  // prop의 이름은 소문자나 앞에 $가 있어야만 사용자 지정 속성으로 인식
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.$isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;
// interface
interface RouteParams {
  coinId: string;
}
interface RouteState {
  name: string;
}
// interface of json data
interface InfoData {
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

interface PriceData {
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
    };
  };
}

function Coin() {
  const { coinId } = useParams<RouteParams>(); // interface로 param type 명시
  //   const { coinId } = useParams<{ coinId: string }>(); // useParams에 param type 직접 명시
  const { state } = useLocation<RouteState>();
  // useLocation() : Link to={{}} object로 전달한 값 가져옴
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  // useRouteMatch : URL이 일치하는 지 여부를 확인 (isExact : true / null)

  // argument를 필요로하는 fetcher 함수 (react query / useQuery)
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    // useQuery의 return값의 이름을 바꿈(js).
    // object의 property를 가져와 syntax(:)로 이름 수정(isLoading: infoLoading).
    ["info", "coinId"], // unique key를 동일하게 coinId를 사용하기 때문에 추가 key를 배열형태로 씀.
    // 첫번 째 key가 카테고리 역할을 하고(info), 두번 째 key가 unique key역할을 함.
    () => fetchCoinInfo(coinId) // 해당 fetcher함수에 argument를 넘겨야 하기 때문에 익명함수를 만들어서 fetcher함수를 불러서 return함
    // 만약 argument가 없다면 익명함수[()=>]없이 fetcher함수만 씀.
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", "coinId"],
    () => fetchCoinTickers(coinId)
  );

  // reactQuery 대신 useEffect+useState hoock 사용하는 방법
  // const [loading, setLoading] = useState<boolean>(true);
  // const [info, setInfo] = useState<InfoData>();
  // const [priceInfo, setPriceInfo] = useState<PriceData>();
  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //     ).json();
  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();
  //     setInfo(infoData);
  //     setPriceInfo(priceData);
  //     setLoading(false);
  //   })();
  // }, [coinId]);

  const loading = tickersLoading || infoLoading;
  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      {loading ? (
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
              <span>Open Source:</span>
              <span>{infoData?.open_source ? "Yes" : "No"}</span>
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
            <Tab $isActive={chartMatch !== null ? true : false}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab $isActive={priceMatch !== null ? true : false}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          {/* nested router : 중첩 된 route */}
          <Switch>
            <Route path={"/:coinId/price"}>
              <Price />
            </Route>
            <Route path={"/:coinId/chart"}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}
export default Coin;
