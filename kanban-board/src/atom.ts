import { atom } from "recoil";

export const toDoStateAtom = atom<string[]>({
  key: "toDo",
  default: ["a", "b", "c", "d", "e", "f", "g"],
});
