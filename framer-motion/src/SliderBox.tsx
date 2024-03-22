import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Box = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  display: flex;
  position: absolute;
  top: 80px;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  initial: {
    x: 500,
    opacity: 0,
    scale: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 1 },
  },
  exit: {
    x: -500,
    opacity: 0,
    // scale: 0,
    rotateX: 180,
    transition: { duration: 1 },
  },
};
function SliderBox() {
  const [visible, setVisible] = useState(1);
  const nextSlide = () => setVisible((prev) => (prev === 10 ? 10 : prev + 1));
  return (
    <>
      <h1>SliderBox</h1>
      <Wrapper>
        <AnimatePresence>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
            (i) =>
              i === visible && (
                <Box
                  key={i}
                  variants={boxVariants}
                  initial="initial"
                  animate="visible"
                  exit="exit"
                >
                  {i}
                </Box>
              )
          )}
        </AnimatePresence>
        <button onClick={nextSlide}>prev</button>
        <button onClick={nextSlide}>next</button>
      </Wrapper>
    </>
  );
}
export default SliderBox;
