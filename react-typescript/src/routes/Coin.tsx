import { useParams } from "react-router";

interface RouteParams {
  coinId: string;
}
function Coin() {
  const { coinId } = useParams<RouteParams>(); // interface로 param type 명시
  //   const { coinId } = useParams<{ coinId: string }>(); // useParams에 param type 직접 명시
  console.log(coinId);
  return <h1> coin : {coinId} </h1>;
}
export default Coin;
