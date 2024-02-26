import styled from "styled-components";

interface ContainerProps {
  bgColor: string;
}
const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
`;

interface CircleProps {
  bgColor: string;
}
// interface : required object shape 설명. 코드 실행 전 확인/에러.
// propType의 경우 코드 실행 후 확인/에러

function Circle({ bgColor }: CircleProps) {
  return <Container bgColor={bgColor} />;
}
export default Circle;
