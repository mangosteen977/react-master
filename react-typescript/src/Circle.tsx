import styled from "styled-components";
import { useState } from "react";

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}
const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
  border: 3px solid ${(props) => props.borderColor};
  text-align: center;
  line-height: 200px;
`;

interface CircleProps {
  bgColor: string;
  borderColor?: string;
}

function Circle({ bgColor, borderColor }: CircleProps) {
  const [counter, setCounter] = useState(0); // default 값에 따라 TS가 state type 인식함.
  // const [counter, setCounter] = useState<number | string>(0);
  // state의 type 1개 이상 직접 지정
  // setCounter("dd") // TS에서 useState init 초기값을 바탕으로 type이 안맞으면 경고
  return <Container bgColor={bgColor} borderColor={borderColor ?? bgColor} />;
}
export default Circle;
