import styled from "styled-components";

const Father = styled.div`
 display : flex;
`;
//back tick (`)으로 사이에 css코드를 적어서 스타일 컴포넌츠 생성
const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color : ${(props) => props.bgColor};
`;
//styled-components에서 'bgColor'로 props를 보내서 css 속성 적용
const Circle = styled(Box)`
  border-radius : 50px;
`;
// styled-components 확장 (기존 + 추가 속성)

function App() {
  return (
    <Father>
      <Circle bgColor="tomato" />
      <Box bgColor="teal" />
    </Father>
  );
}

export default App;
