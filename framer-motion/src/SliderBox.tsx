import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  height: 500px;
  width: 100vw;
  position: relative;
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
  top: 30px;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  entry: (customBack: boolean) => ({
    x: customBack ? -500 : 500,
    opacity: 0,
    scale: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
  exit: (customBack: boolean) => ({
    x: customBack ? 500 : -500,
    opacity: 0,
    scale: 0,
    // rotateX: 180,
    transition: { duration: 0.3 },
  }),
};
function SliderBox() {
  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false);
  const nextSlide = async () => {
    await setBack(false);
    // setBack 이전에 setVisible이 먼저 이뤄지면서
    // 새로운 element의 setBack state값이 잘못 들어가서 async+await으로 수정함.
    setVisible((prev) => (prev === 10 ? 10 : prev + 1));
  };
  const prevSlide = async () => {
    await setBack(true);
    setVisible((prev) => (prev === 1 ? 1 : prev - 1));
  };
  return (
    <>
      <h1>SliderBox</h1>
      <Wrapper>
        <AnimatePresence>
          {/* mode="wait" : 이전 애니메이션이 끝나길 기다렸다가 다음 실행 */}
          <Box
            key={visible}
            // 기존 key가 없어지면(변화하면) react는 element가 삭제되었다고 인식해서 exit 효과가 동작함
            variants={boxVariants}
            initial="entry"
            animate="center"
            exit="exit"
            custom={back}
            // custom : variants에 데이터를 보낼 수 있게 해주는 property
            /*
            const variants = {
              visible: (custom) => ({
                opacity: 1,
                transition: { delay: custom * 0.2 }
              })
            }
            */
          >
            {visible}
          </Box>
        </AnimatePresence>
        <button onClick={nextSlide}>next</button>
        <button onClick={prevSlide}>prev</button>
      </Wrapper>
    </>
  );
}
export default SliderBox;
