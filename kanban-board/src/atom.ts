import { atom, selector } from "recoil";

export const minutesStateAtom = atom<number>({
  key: "minutes",
  default: 0,
});

export const hoursSelectorAtom = selector<number>({
  key: "hours",
  get: ({ get }) => {
    const minutes = get(minutesStateAtom);
    return minutes / 60;
  },
  set: ({ set }, newValue) => {
    //set: ({
    //     set: SetRecoilState; //set(RecoilState명, 설정할 값) :해당 State의 값을 설정
    //     get: GetRecoilValue; // get(RecoilState명) : 해당 State의 값을 가져옴
    //     reset: ResetRecoilState;
    // }, newValue) // newValue : Selector의 set()함수를 사용해 받은 값
    // useRecoilState의 SetterOrUpdater(), 혹은 useSetRecoilState로
    // Selector의 set()함수를 사용하면 newValue로 값을 받을 수 있다.
    const minutes = Number(newValue) * 60;
    set(minutesStateAtom, 88);
  },
});
