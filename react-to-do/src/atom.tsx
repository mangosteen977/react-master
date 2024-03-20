import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  // recoil-persist : Recoil 라이브러리, 로컬스토리지 저장
  key: "todoLocal",
  storage: localStorage,
});

export const enum Categories { // enum type
  // "TO_DO", // initializer 없으면, TO_DO = 0
  "TO_DO" = "TO_DO", // name = TO_DO
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDO {
  //atom state 배열의 interface
  id: number;
  text: string;
  // category: Categories;
  category: string;
  // 폴더 추가를 위해 카테고리 string 타입으로
}

export const AllCategoryAtom = atom<string[]>({
  // 모든 카테고리
  key: "allCategory",
  default: ["TO_DO", "DOING", "DONE"],
  // recoil-persist
  effects_UNSTABLE: [persistAtom], //
});

export const categoryStateAtom = atom<string>({
  //IToDO["category"] : IToDo interface의 category type
  // 현재 선택 된 카테고리 저장
  key: "category",
  // default: Categories.TO_DO, // enum type으로 교체
  default: "TO_DO",
});

export const toDoStateAtom = atom<IToDO[]>({
  key: "toDo",
  default: [],
  // recoil-persist
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  // selector는 atom state를 수정해 파생 state를 반환.
  // 파생 된 state는 본래 state 변화에 반응
  // useRecoilValue로 읽음.
  key: "toDoSelector",
  get: ({ get }) => {
    // selector의 obj 중 하나인 get()은 atom state를 가져옴.
    const toDos = get(toDoStateAtom);
    const category = get(categoryStateAtom);
    // 현재 선택 된 category만 반환
    return toDos.filter((toDo) => toDo.category == category);
  },
});
