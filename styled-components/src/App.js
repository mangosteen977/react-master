import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display : flex;
`;

const rotaionAnimation = keyframes`
0%{
  transform: rotate(0deg);
  border-radius: 0px;
}
50%{
  border-radius: 100px;
}
100%{
  transform: rotate(360deg);
}
`;
const Emoji = styled.span`
  font-size: 36px;
`;
const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  animation : ${rotaionAnimation} 3s linear infinite;
  /* (js)string interpolation으로 key frame 사용 */
  display: flex;
  justify-content: center;
  align-items: center;
  span:active {
    opacity: 0;
  }
  /* SCSS처럼~, 스타일 컴포넌츠 하위 tag에 대해 selector, psudo selector 사용 가능 */
  ${Emoji} {
    &:hover {
      font-size: 100px;
    }
  }
  /* styled-components 명으로도 하위 컴포넌츠에 대해 css 속성 정의 가능 */
`;

function App() {
  return (
    <Wrapper>
      <Box>
        <Emoji as="p">😎</Emoji>
      </Box>
        <Emoji>😎</Emoji>
    </Wrapper>
  );
}

export default App;
