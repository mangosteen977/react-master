import styled from "styled-components";
import { motion } from "framer-motion";
import { useRef } from "react";

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
const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 40px;
  overflow: hidden;
`;
const boxVariants = {
  hover: { scale: 1.5, rotateZ: 90 },
  click: { scale: 1, borderRadius: "100px" },
  drag: { backgroundColor: "#3498db" }, // 해쉬컬러/rgba로 해야 색이 서서히 전환됨. }
};

function Gestures() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  return (
    <BiggerBox ref={biggerBoxRef}>
      <Box
        drag
        dragConstraints={biggerBoxRef}
        /* drag 이동 범위
        아무 속성 없으면 제한 없음
        drag ="x/y : 해당 축으로만 드래그가 가능하게 제한
        dragConstraints={{ top: -200, bottom: 200, left: -200, right: 200 }} : top/bottom/left/right 픽셀로 제한
        dragConstraints={biggerBoxRef} : 부모객체 ref, 부모객체 안으로 제한
        */
        dragSnapToOrigin // 드래그 이후 원자리로 돌아옴
        dragElastic={0.5} // 드래그에 탄력을 줌 (0~1)
        whileDrag="drag" // whileDrag로 드래그 하는 동안의 동작 정의
        variants={boxVariants}
        whileHover="hover"
        whileTap="click"
      />
    </BiggerBox>
  );
}
export default Gestures;
