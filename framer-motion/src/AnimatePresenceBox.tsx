import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Box = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  position: absolute;
  top: 100px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateZ: 360,
  },
  leaving: {
    // exit : element가 사라졌을 때의 style설정
    opacity: 0,
    scale: 0,
    y: 10,
  },
};
function AnimatePresenceBox() {
  const [showing, setShowing] = useState(false);
  const toggleShowing = () => setShowing((prev) => !prev);
  return (
    <>
      <Wrapper>
        <h1>AnimatePresence</h1>
        <button onClick={toggleShowing}>Click</button>
        <AnimatePresence>
          {/* AnimatePresence : 자식요소가 visible/envisible에 대한 애니메이션
            AnimatePresence가 visible 이고, children에 key, condition(조건문)과
            exit(사라졌을 때 효과) prop이 있어야 함 */}
          {showing ? (
            <Box
              key="showBox"
              variants={boxVariants}
              initial="initial"
              animate="visible"
              exit="leaving" // exit : element가 사라졌을 때의 style설정
            />
          ) : null}
        </AnimatePresence>
      </Wrapper>
    </>
  );
}
export default AnimatePresenceBox;
