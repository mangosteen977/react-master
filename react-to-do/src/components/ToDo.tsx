import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  IToDO,
  toDoStateAtom,
  //Categories,
  AllCategoryAtom,
} from "../atom";
import styled from "styled-components";

const ToDoListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 20px;
  border-bottom: 3px dashed #fbf8db;
  &:nth-of-type(1) {
    border-top: 3px dashed #fbf8db;
  }
  div {
    display: none;
    button:last-child {
      background-color: #ff5100;
    }
  }
  &:hover {
    background-color: #fbf8db;
    div {
      display: block;
    }
  }
`;
const Button = styled.button`
  border: none;
  background-color: #fbc531;
  width: 50px;
  height: 25px;
  border-radius: 5px;
  color: #fff;
  font-weight: 300;
  font-size: 10px;
  overflow: hidden;
  margin-left: 5px;
  cursor: pointer;
  &:hover {
    background-color: #faab0d;
  }
`;
function ToDo({ text, category, id }: IToDO) {
  // TS) interface의 property type 항목 하나만 설정 하기. Iinterface["property"]
  // ex) newCategory: IToDO["category"]
  const setToDos = useSetRecoilState(toDoStateAtom);
  const allCategory = useRecoilValue(AllCategoryAtom);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      // 선택 된 category(변경할 category)
      currentTarget: { name },
    } = event; // event.currentTarget.name

    setToDos((oldToDos) => {
      // category 수정해서 새 배열 반환
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id); // 수정할 index
      const newToDo = { text, id, category: name as any }; // 수정할 내용(category 변경)
      //  TS) as any : TS에 type 체크 X 하도록
      return [
        ...oldToDos.slice(0, targetIndex), // 0번 노드 ~ 수정 index 이전 배열 펼쳐서
        newToDo, // 수정 index자리에 수정된 내용
        ...oldToDos.slice(targetIndex + 1), // 수정 index +1 노드부터 마지막 배열까지 펼쳐서
      ];
    });
  };
  const delToDo = () => {
    setToDos((oldToDos) => oldToDos.filter((toDo) => toDo.id != id));
  };
  return (
    <ToDoListItem>
      {text}
      <div>
        {allCategory.map(
          (cate) =>
            cate !== category && (
              <Button name={cate} onClick={onClick}>
                {cate}
              </Button>
            )
        )}
        <Button onClick={delToDo}>Del</Button>
      </div>
    </ToDoListItem>
  );
}
export default ToDo;
/* {category !== Categories.TO_DO && (
    <button name={Categories.TO_DO} onClick={onClick}>
      To Do
    </button>
  )}
  {category !== Categories.DOING && (
    <button name={Categories.DOING} onClick={onClick}>
      Doing
    </button>
  )}
  {category !== Categories.DONE && (
    <button name={Categories.DONE} onClick={onClick}>
      Done
    </button>
  )} */
