import styled from "styled-components";
import up from "../assets/up.svg";
import down from "../assets/down.svg";

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;
const PercentChanges = styled.div<{ $isPositive: boolean; $isLong?: boolean }>`
  border-radius: 10px;
  background-color: ${(props) => props.theme.listColor};
  text-align: center;
  padding: 10px 0;
  div:nth-child(2) {
    font-size: ${(props) => (props?.$isLong ? "26px" : "30px")};
    font-weight: 400;
    color: ${(props) => (props.$isPositive ? "#E91E63" : "#2E93fA")};
  }
`;
const PercentChange = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;
const Subtitle = styled.h1`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
  padding: 0 20px;
`;
const Symbol = styled.span`
  font-size: 13px;
  font-weight: 400;
  color: gray;
`;
const Img = styled.img`
  width: 30px;
  height: 30px;
`;
/*
<PercentChanges $isPositive={positiveCheck(percent_change_12h)}>
  <Subtitle>12hour</Subtitle>
  <PercentChange>
    <Img src={positiveCheck(percent_change_12h) ? up : down} />
    <div>{percent_change_12h}%</div>
    </PercentChange>
</PercentChanges>
*/
interface IPriceProps {
  percent_change_1y: number | undefined;
  percent_change_30d: number | undefined;
  percent_change_7d: number | undefined;
  percent_change_24h: number | undefined;
  percent_change_12h: number | undefined;
  percent_change_6h: number | undefined;
  percent_change_1h: number | undefined;
  volume_24h: number | undefined; // 24H 거래량
  volume_24h_change_24h: number | undefined; // 24H 거래 변동률
}
function Price({
  percent_change_1y,
  percent_change_30d,
  percent_change_7d,
  percent_change_24h,
  percent_change_12h,
  percent_change_6h,
  percent_change_1h,
  volume_24h, // 24H 거래량
  volume_24h_change_24h, // 24H 거래 변동률
}: IPriceProps) {
  const positiveCheck = function (price: number | undefined) {
    return price === undefined || price < 0 ? false : true;
  };
  const longCheck = function (price: number | undefined) {
    return String(price).length >= 10 ? true : false;
  };
  return (
    <>
      <Subtitle>change in price</Subtitle>
      <Tabs>
        {/* 가격 변화율 1시간 */}
        <PercentChanges $isPositive={positiveCheck(percent_change_1h)}>
          <Subtitle>1hour</Subtitle>
          <PercentChange>
            <Img src={positiveCheck(percent_change_1h) ? up : down} />
            <div>{percent_change_1h}%</div>
            {/* <Symbol>(1 hours)</Symbol> */}
          </PercentChange>
        </PercentChanges>
        {/* 가격 변화율 6시간 */}
        <PercentChanges $isPositive={positiveCheck(percent_change_6h)}>
          <Subtitle>6hour</Subtitle>
          <PercentChange>
            <Img src={positiveCheck(percent_change_6h) ? up : down} />
            <div>{percent_change_6h}%</div>
            {/* <Symbol>(6 hours)</Symbol> */}
          </PercentChange>
        </PercentChanges>
        {/* 가격 변화율 12시간 */}
        <PercentChanges $isPositive={positiveCheck(percent_change_12h)}>
          <Subtitle>12hour</Subtitle>
          <PercentChange>
            <Img src={positiveCheck(percent_change_12h) ? up : down} />
            <div>{percent_change_12h}%</div>
            {/* <Symbol>(12 hours)</Symbol> */}
          </PercentChange>
        </PercentChanges>
        {/* 가격 변화율 24시간 */}
        <PercentChanges $isPositive={positiveCheck(percent_change_24h)}>
          <Subtitle>24hour</Subtitle>
          <PercentChange>
            <Img src={positiveCheck(percent_change_24h) ? up : down} />
            <div>{percent_change_24h}%</div>
            {/* <Symbol>(24 hours)</Symbol> */}
          </PercentChange>
        </PercentChanges>
        {/* 가격 변화율 1주 */}
        <PercentChanges $isPositive={positiveCheck(percent_change_7d)}>
          <Subtitle>1week</Subtitle>
          <PercentChange>
            <Img src={positiveCheck(percent_change_7d) ? up : down} />
            <div>{percent_change_7d}%</div>
            {/* <Symbol>(7days)</Symbol> */}
          </PercentChange>
        </PercentChanges>
        {/* 가격 변화율 1달 */}
        <PercentChanges $isPositive={positiveCheck(percent_change_30d)}>
          <Subtitle>1month</Subtitle>
          <PercentChange>
            <Img src={positiveCheck(percent_change_30d) ? up : down} />
            <div>{percent_change_30d}%</div>
            {/* <Symbol>(30 days)</Symbol> */}
          </PercentChange>
        </PercentChanges>
        {/* 가격 변화율 1년 */}
        <PercentChanges $isPositive={positiveCheck(percent_change_1y)}>
          <Subtitle>1year</Subtitle>
          <PercentChange>
            <Img src={positiveCheck(percent_change_1y) ? up : down} />
            <div>{percent_change_1y}%</div>
            {/* <Symbol>(1 year)</Symbol> */}
          </PercentChange>
        </PercentChanges>
      </Tabs>
      <Subtitle>Trading volume & change</Subtitle>
      <Tabs>
        {/* 거래량 24시간*/}
        <PercentChanges
          $isPositive={positiveCheck(volume_24h)}
          $isLong={longCheck(volume_24h)}
        >
          <Subtitle>volume(24hour)</Subtitle>
          <PercentChange>
            <Img src={positiveCheck(volume_24h) ? up : down} />
            <div>{Number(volume_24h).toFixed(0)}</div>
            {/* <div>{Number(volume_24h).toFixed(2)}</div> */}
            {/* <Symbol>(24 hours)</Symbol> */}
          </PercentChange>
        </PercentChanges>
        {/* 거래량 변화율 24시간*/}
        <PercentChanges $isPositive={positiveCheck(volume_24h_change_24h)}>
          <Subtitle>change(24hour)</Subtitle>
          <PercentChange>
            <Img src={positiveCheck(volume_24h_change_24h) ? up : down} />
            <div>{volume_24h_change_24h}%</div>
            {/* <Symbol>(24 hours)</Symbol> */}
          </PercentChange>
        </PercentChanges>
      </Tabs>
    </>
  );
}

export default Price;
