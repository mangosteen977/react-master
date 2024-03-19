import { atom } from "recoil";

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
