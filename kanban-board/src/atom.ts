import { atom } from "recoil";

interface IToDoStateAtom {
  [key: string]: string[];
}
export const toDoStateAtom = atom<IToDoStateAtom>({
  key: "toDo",
  default: {
    "To Do": ["a", "b", "g"],
    Doing: ["c", "d", "e"],
    Done: ["f"],
  },
});
