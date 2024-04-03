import { atom } from "recoil";

export interface IToDo {
  id: number;
  text: string;
}
interface IToDoStateAtom {
  [key: string]: IToDo[];
}
export const toDoStateAtom = atom<IToDoStateAtom>({
  key: "toDo",
  default: {
    "To Do": [
      { id: 1, text: "todo1" },
      { id: 2, text: "todo2" },
    ],
    Doing: [{ id: 3, text: "doing" }],
    Done: [
      { id: 4, text: "done1" },
      {
        id: 5,
        text: "오늘은 밥을 먹고 양치를 하고 커피를 마셨다. 아뿔싸 또 다시 양치를 해야하는구나!",
      },
    ],
  },
});
