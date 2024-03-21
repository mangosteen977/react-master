import { useRecoilState, useRecoilValue } from "recoil";
import { hoursSelectorAtom, minutesStateAtom } from "./atom";

function App() {
  const [minutes, setMinutes] = useRecoilState(minutesStateAtom);
  const [hours, setHours] = useRecoilState(hoursSelectorAtom);
  // [get()값, set()값]
  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);
    // string숫자 앞에 + => number
  };
  const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
    setHours(+event.currentTarget.value);
    // string숫자 앞에 + => number
  };
  return (
    <div>
      <input
        value={minutes}
        onChange={onMinutesChange}
        type="number"
        placeholder="Minutes"
      />
      <span>분</span>
      <div>↔</div>
      <input
        value={hours}
        onChange={onHoursChange}
        type="number"
        placeholder="Hours"
      />
      <span>시간</span>
    </div>
  );
}

export default App;
