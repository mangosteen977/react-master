import styled from "styled-components";
import { motion } from "framer-motion";
import Variants from "./Variants";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Box = styled(motion.div)`
  /* styled(motion.elements) : styled-components에 motion.elements를 적용 */
  width: 200px;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  background-color: white;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  height: 80px;
  width: 80px;
  place-self: center;
  /* place-self : gird, flexbox 하위 요소, align-self 속성과 justify-self 속성 값을 한번에 작성 */
  border-radius: 40px;
`;
const boxVariants = {
  start: {
    opacity: 0,
    scale: 0.5,
  },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0.5,
      // delayChildren: 0.5, // 자식 요소 딜레이
      staggerChildren: 0.2, // 자동으로 자식 요소 순차적 딜레이
    },
  },
};

const circleVariants = {
  start: {
    opacity: 0,
    y: 10, // Motion에만 있는 속성. x, y 위치
  },
  end: {
    opacity: 1,
    y: 0,
  },
};
function App() {
  return (
    <Wrapper>
      {/* motion: https://www.framer.com/motion/
          animation :  https://www.framer.com/docs/animation */}
      <Box></Box>
      <Variants />
    </Wrapper>
  );
}

export default App;