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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const boxVariants = {
  hover: { scale: 1.5, rotateZ: 90 },
  click: { scale: 1, borderRadius: "100px" },
  drag: { backgroundColor: "#3498db" }, // 해쉬컬러/rgba로 해야 색이 서서히 전환됨. }
};

function Gestures() {
  return (
    <Box
      drag // drag 붙이면 드래그에 제한이 없는 드래깅
      whileDrag="drag" // whileDrag로 드래그 하는 동안의 동작 정의
      variants={boxVariants}
      whileHover="hover"
      whileTap="click"
    />
  );
}
export default Gestures;
