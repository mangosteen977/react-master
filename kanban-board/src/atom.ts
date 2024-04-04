import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "trelloBoardLocal",
  storage: localStorage,
});

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
    "To Do": [],
    Doing: [],
    Done: [],
  },
  effects_UNSTABLE: [persistAtom],
});

//Dark/Light Mode
export const ToggleThemeAtom = atom<boolean>({
  key: "toggleTheme",
  default: true,
  effects_UNSTABLE: [persistAtom],
});
