import styled from "styled-components";
import { MotionValue, motion } from "framer-motion";
// motion: https://www.framer.com/motion/
// animation :  https://www.framer.com/docs/animation
import Variants from "./Variants";
import Gestures from "./Gestures";
import MotionValueBox from "./MotionValueBox";
import Scroll from "./Scroll";
import LineDraw from "./LineDraw";
import AnimatePresenceBox from "./AnimatePresenceBox";
import SliderBox from "./SliderBox";
import ShareLayout from "./ShareLayout";
import ChallengePage from "./ChallengePage";

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
      <ChallengePage />
      <ShareLayout />
      <SliderBox />
      <AnimatePresenceBox />
      <LineDraw />
      <Scroll />
      <MotionValueBox />
      <Gestures />
      <Variants />
    </Wrapper>
  );
}

export default App;
