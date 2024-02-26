import styled from "styled-components";

interface ContainerProps {
  bgColor: string;
  borderColor: string; //required props
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
  bgColor: string; //required
  borderColor?: string; //optional (name?: type)
  text?: string;
}
// interface : object shape 설명. 코드 실행 전 확인/에러.
// propType의 경우 코드 실행 후 확인/에러

function Circle({ bgColor, borderColor, text = "default text" }: CircleProps) {
  // CircleProps.text?: string | undefined : optional
  // default value 설정 => text = "default text"
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      {/* interface ContainerProps > borderColor : required,
          default value 설정 => borderColor={propsName ?? "default"} */}
      {text}
    </Container>
  );
}
export default Circle;
