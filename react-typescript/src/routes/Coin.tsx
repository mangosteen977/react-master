import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
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
import CandleStick from "./CandleStick";
import Price from "./Price";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
// fetcher functions from api.tsx (react query)
import backSvg from "../assets/back.svg";
import home from "../assets/home.svg";
import facebook from "../assets/facebook.svg";
import reddit from "../assets/reddit.svg";
import github from "../assets/github.svg";
import youtube from "../assets/youtube.svg";
// *.svg에 대한 TS 타입 추가
// src/custom.d.ts, tsconfig/include에 src.custom.d.ts추가
import Footer from "../components/Footer";
// common
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  /* height: 15vh; */
  height: fit-content;
  margin-top: 5vh;
  margin-bottom: 7vh;
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 10px;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;
const Loader = styled.div`
  text-align: center;
  padding: 54px;
`;
const Img = styled.img`
  width: 35px;
  height: 35px;
`;
// coin
const PriceSummary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;
const Rank = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: center;
  border-radius: 10px;
`;
const CurrentPrice = styled.div<{ $isPositive: boolean }>`
  text-align: right;
  color: ${(props) => (props.$isPositive ? "#E91E63" : "#2E93fA")};
  div:first-child {
    font-size: 30px;
    font-weight: 600;
  }
`;
const PriceChanges = styled.div`
  justify-content: right;
  align-items: baseline;
  display: flex;
  gap: 5px;
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.listColor};
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Description = styled.div`
  padding: 10px 20px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.listColor};
  margin: 20px 0;
`;
const Subtitle = styled.h1`
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 5px;
`;
const Symbol = styled.span`
  font-size: 13px;
  font-weight: 400;
  color: gray;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
  background-color: ${(props) => props.theme.listColor};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.$isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;
const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;
const Btn = styled.div`
  background-color: transparent;
  a {
    display: block;
    width: 35px;
    height: 35px;
    img {
      /* filter: invert(1); // black */
      filter: invert(${(props) => props.theme.backBtn}); // white
      object-fit: cover;
    }
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
  links: {
    facebook: string;
    reddit: string;
    source_code: string;
    website: string;
    youtube: string;
  };
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
  const candleMatch = useRouteMatch("/:coinId/candle-stick");
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
    () => fetchCoinTickers(coinId),
    {
      // refetchInterval: 5000, // 5000ms(5s)
    }
    // fetch interval 설정 (milliseconds 단위)
    // background에서 주기적으로 앱을 업데이트, 데이터 실시간 반영
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
  let rankFormat = "";
  switch (infoData?.rank) {
    case 1:
      rankFormat = "st";
      break;
    case 2:
      rankFormat = "nd";
      break;
    case 3:
      rankFormat = "rd";
      break;
    default:
      rankFormat = "th";
  }
  const isPositive = Number(tickersData?.quotes.USD.percent_change_24h) > 0;
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Nav>
        <Btn>
          <Link to="/">
            <Img src={backSvg} alt="back button" />
          </Link>
        </Btn>
      </Nav>
      <Header>
        <Img
          src={`https://coinicons-api.vercel.app/api/icon/${infoData?.symbol.toLowerCase()}`}
          alt={`${infoData?.name}'s image`}
        />
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
        <Symbol>{infoData?.symbol}</Symbol>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <PriceSummary>
            <Rank>
              <Title>{infoData?.rank}</Title>
              <Subtitle>{rankFormat}</Subtitle>
            </Rank>
            <CurrentPrice $isPositive={isPositive}>
              <div>${tickersData?.quotes.USD.price.toFixed(2)}</div>
              <PriceChanges>
                {isPositive ? <span>&#9652;</span> : <span>&#9662;</span>}
                <span>{tickersData?.quotes.USD.percent_change_24h}%</span>
                <Symbol>(1day)</Symbol>
              </PriceChanges>
            </CurrentPrice>
          </PriceSummary>

          {/* nested router : 중첩 된 route */}
          <Switch>
            <Route path={"/:coinId/price"}>
              <Price />
            </Route>
            <Route path={"/:coinId/chart"}>
              <Chart coinId={coinId} />
            </Route>
            <Route path={"/:coinId/candle-stick"}>
              <CandleStick coinId={coinId} />
            </Route>
          </Switch>
          <Tabs>
            <Tab $isActive={chartMatch !== null ? true : false}>
              <Link to={`/${coinId}/chart`}>LineChart</Link>
            </Tab>
            <Tab $isActive={candleMatch !== null ? true : false}>
              <Link to={`/${coinId}/candle-stick`}>CandleStick</Link>
            </Tab>
            <Tab $isActive={priceMatch !== null ? true : false}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Overview>
            <OverviewItem>
              <Subtitle>Total Suply:</Subtitle>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <Subtitle>Max Supply:</Subtitle>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Description>
            <Subtitle>description</Subtitle>
            <p>{infoData?.description}</p>
          </Description>
          <Overview>
            <Subtitle>Links</Subtitle>

            {infoData?.links.website ? (
              <OverviewItem>
                <a href={infoData.links.website}>
                  <Img src={home} alt="website" title="website" />
                </a>
              </OverviewItem>
            ) : (
              ""
            )}
            {infoData?.links.source_code ? (
              <OverviewItem>
                <a href={infoData.links.source_code}>
                  <Img src={github} alt="github" title="github" />
                </a>
              </OverviewItem>
            ) : (
              ""
            )}
            {infoData?.links.facebook ? (
              <OverviewItem>
                <a href={infoData.links.facebook}>
                  <Img src={facebook} alt="facebook" title="facebook" />
                </a>
              </OverviewItem>
            ) : (
              ""
            )}
            {infoData?.links.reddit ? (
              <OverviewItem>
                <a href={infoData.links.reddit}>
                  <Img src={reddit} alt="reddit" title="reddit" />
                </a>
              </OverviewItem>
            ) : (
              ""
            )}
            {infoData?.links.youtube ? (
              <OverviewItem>
                <a href={infoData.links.youtube}>
                  <Img src={youtube} alt="youtube" title="youtube" />
                </a>
              </OverviewItem>
            ) : (
              ""
            )}
          </Overview>
        </>
      )}
      <Footer />
    </Container>
  );
}
export default Coin;
