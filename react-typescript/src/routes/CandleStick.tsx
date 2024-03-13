import { useQuery } from "react-query";
import { fetchCoinHisttory } from "../api";
import ApexCharts from "react-apexcharts";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { isDarkModeAtom } from "../atoms";

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
  const { isLoading, data } = useQuery<IHistorical[] & IHistoricalError>(
    ["candleStick", coinId],
    () => fetchCoinHisttory(coinId)
  );
  const isDarkMode = useRecoilValue(isDarkModeAtom);

  return (
    <div>
      {!isLoading && (!data || data.error) ? (
        <Loader>
          {data && data.error ? `Sorry, ${data.error}` : "Loading chart..."}
        </Loader>
      ) : (
        <ApexCharts
          type="candlestick"
          series={[
            {
              data:
                data && !data.error
                  ? data.map((price) => {
                      return {
                        x: price.time_open * 1000,
                        y: [price.open, price.high, price.low, price.close],
                      };
                    })
                  : [],
            },
          ]}
          options={{
            chart: {
              width: 500,
              height: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            theme: { mode: isDarkMode ? "dark" : "light" },
            grid: { show: false },
            yaxis: {
              axisBorder: { show: false },
              labels: { show: false },
              tooltip: {
                enabled: true,
              },
            },
            xaxis: {
              type: "datetime",
              axisBorder: { show: false },
              labels: { show: false },
              tooltip: {
                enabled: true,
              },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#0de25e",
                  downward: "#fe120e",
                },
                wick: {
                  useFillColor: true,
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
