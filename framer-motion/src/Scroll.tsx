import styled from "styled-components";
import {
  motion,
  useMotionValueEvent,
  useTransform,
  useScroll,
} from "framer-motion";

const Wrapper = styled(motion.div)`
  height: 200vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Box = styled(motion.div)`
  /* styled(motion.elements) : styled-components에 motion.elements를 적용 */
  width: 300px;
  height: 300px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {};

function Scroll() {
  const { scrollYProgress } = useScroll();
  // useScroll : 스크롤 발생 값(scroll(X/Y), scroll(X/Y)Progress)등을 받아옴

  //scroll y progress 콘솔
  // useMotionValueEvent(scrollYProgress, "change", () =>
  // console.log(scrollYProgress.get())
  // );
  const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);
  return (
    <Wrapper>
      <Box style={{ scale }} />
    </Wrapper>
  );
}
export default Scroll;
