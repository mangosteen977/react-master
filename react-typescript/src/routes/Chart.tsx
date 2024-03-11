import { useQuery } from "react-query";
// import { useParams } from "react-router-dom";
import { fetchCoinHisttory } from "../api";
import ApexCharts from "react-apexcharts";
import styled from "styled-components";

const Loader = styled.div`
  text-align: center;
  padding: 54px;
`;

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}
interface IHistoricalError {
  error: string;
}
interface IChartProps {
  coinId: string;
}

function Chart({ coinId }: IChartProps) {
  // 선택 된 coinID 가져오기
  // 방법 1) react-router-dom에서 useParams로 parameter를 가져오기
  // const param = useParams();
  // 방법 2) 부모 컴포넌츠에서 props로 전달 받기.
  const { isLoading, data } = useQuery<IHistorical[] & IHistoricalError>(
    ["chart", coinId],
    () => fetchCoinHisttory(coinId)
  );

  // alert(typeof data);
  // startDate~endDate의 api 데이터 조회용이었으나, api 유료화로 api 변경.
  // const endDate = Math.floor(Date.now() / 1000);
  // // Date.now()는 현재 시간을 밀리초로 나타냄, 1000으로 나눠서 초로 바꿈.
  // const startDate = endDate - 60 * 60 * 24 * 7;
  // // 1주전 시간초 : 현재 시간 - 1주에 해당하는 초.
  return (
    <div>
      {!isLoading && (!data || data.error) ? (
        <Loader>
          {data && data.error ? `Sorry, ${data.error}` : "Loading chart..."}
        </Loader>
      ) : (
        <ApexCharts
          type="line"
          series={[
            {
              name: "Close price",
              data:
                data && !data.error
                  ? data.map((price) => Number(price.close))
                  : [],
              // data: data?.map((price) => Number(price.close)) ?? [],
              // data 없거나 error반환인 경우 빈 배열, 있을 경우 string->Number로 종가(close)만 반환
            },
          ]}
          options={{
            chart: {
              width: 500,
              height: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            theme: { mode: "dark" },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 5,
            },
            yaxis: { show: false },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
            },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["#fbc531"],
                stops: [0, 100],
              },
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
