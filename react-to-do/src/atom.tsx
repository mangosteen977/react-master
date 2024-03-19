import { atom, selector } from "recoil";

export interface IToDO {
  //atom state 배열의 interface
  id: number;
  text: string;
  category: "TO_DO" | "DOING" | "DONE";
}

export const toDoStateAtom = atom<IToDO[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  // selector는 atom state를 수정해 파생 state를 반환.
  // 파생 된 state는 본래 state 변화에 반응
  // useRecoilValue로 읽음.
  key: "toDoSelector",
  get: ({ get }) => {
    // selector의 obj 중 하나인 get()은 atom state를 가져옴.
    const toDos = get(toDoStateAtom);
    return [
      toDos.filter((toDo) => toDo.category == "TO_DO"),
      toDos.filter((toDo) => toDo.category == "DOING"),
      toDos.filter((toDo) => toDo.category == "DONE"),
    ];
  },
});
