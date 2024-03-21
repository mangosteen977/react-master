import styled from "styled-components";
import { motion } from "framer-motion";
// motion: https://www.framer.com/motion/
// animation :  https://www.framer.com/docs/animation
import Variants from "./Variants";
import Gestures from "./Gestures";

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <Wrapper>
      <Gestures />
      <Variants />
    </Wrapper>
  );
}

export default App;
