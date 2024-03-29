import styled from "styled-components";

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
`;
  
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display : flex;
  justify-content: center;
  align-items: center;
  background-color:  ${(props)=> props.theme.backgroundColor};
`;
/*  index.js에서 ThemeProvider의 theme props의 property 이름(textColor, backgroundColor) */
  

function App() {
  return (
    <Wrapper>
      <Title>Hello</Title>
    </Wrapper>
  );
}

export default App;
