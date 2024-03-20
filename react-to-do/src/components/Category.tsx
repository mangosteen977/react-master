import { useRecoilState } from "recoil";
import { categoryStateAtom, AllCategoryAtom } from "../atom";
import styled from "styled-components";

const CategoryBar = styled.div`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
  button:last-child {
    background-color: #a37009;
    &:hover {
      background-color: #845a06;
    }
  }
`;
const Button = styled.button`
  border: none;
  background-color: #fbc531;
  width: 70px;
  height: 30px;
  border-radius: 5px;
  color: #fff;
  font-weight: 600;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    background-color: #faab0d;
  }
`;
function Category() {
  const [allCategory, setallCategory] = useRecoilState(AllCategoryAtom);
  const [category, setCategory] = useRecoilState(categoryStateAtom);
  const onclick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setCategory(name);
  };
  console.log(category, "category");
  const newCategory = () => {
    const newCate = prompt("추가 할 폴더 이름을 입력하세요.");
    newCate && setallCategory((old) => [...old, newCate]);
  };
  return (
    <CategoryBar>
      {allCategory.map((cate, i) => (
        <Button key={i} onClick={onclick} name={cate}>
          {cate.replace("_", " ")}
        </Button>
      ))}
      <Button onClick={newCategory}>+폴더</Button>
    </CategoryBar>
  );
}
export default Category;
