import styled from "styled-components";
import { motion } from "framer-motion";

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
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  const myVariants = {
    start: { scale: 0 }, //initial
    end: { scale: 1, rotateZ: 360, transition: { type: "spring", delay: 0.5 } }, //animate
  };
  return (
    <Wrapper>
      {/*  <motion.div></motion.div>
        animation을 적용하고자 하는 element는 motion.element 형태로 써야 함.
        styled-components에서 쓸 수도 있음. */}
      {/* motion: https://www.framer.com/motion/
          animation :  https://www.framer.com/docs/animation */}
      {/* animation */}
      <Box
        transition={{ type: "spring", delay: 0.5 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotateZ: 360 }}
      />
      {/* Variants : 오브젝트 내 프로퍼티명으로 나누어서 props를 줄 수 있음. */}
      <Box variants={myVariants} initial="start" animate="end" />
    </Wrapper>
  );
}

export default App;
