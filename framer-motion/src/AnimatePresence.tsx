import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled(motion.div)`
  height: 200vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const Svg = styled.svg`
  width: 50vh;
  height: 50vh;
  color: white;
`;
const svg = {
  start: {
    pathLength: 0,
    // pathLength : path의 지점, 0~1
    fill: "rgba(255,255,255,0)",
  },
  end: {
    pathLength: 1,
    fill: "rgba(255,255,255,1)",
    transition: {
      //animate 별로 transition을 다르게
      default: { duration: 5 },
      fill: { duration: 2, delay: 3 },
    },
  },
};

function AnimatePresence() {
  return (
    <>
      <h1>AnimatePresence</h1>
      <Box />
    </>
  );
}
export default AnimatePresence;
