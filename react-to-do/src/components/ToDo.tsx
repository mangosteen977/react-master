import { useSetRecoilState } from "recoil";
import { IToDO, toDoStateAtom } from "../atom";

function ToDo({ text, category, id }: IToDO) {
  // TS) interface의 property type 항목 하나만 설정 하기. Iinterface["property"]
  // ex) newCategory: IToDO["category"]
  const setToDos = useSetRecoilState(toDoStateAtom);
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

  return (
    <li>
      {text}
      {category !== "TO_DO" && (
        <button name="TO_DO" onClick={onClick}>
          To Do
        </button>
      )}
      {category !== "DOING" && (
        <button name="DOING" onClick={onClick}>
          Doing
        </button>
      )}
      {category !== "DONE" && (
        <button name="DONE" onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}
export default ToDo;
