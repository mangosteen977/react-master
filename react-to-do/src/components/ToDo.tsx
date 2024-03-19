import { IToDO } from "../atom";

function ToDo({ text }: IToDO) {
  return (
    <li>
      {text}
      <button>To Do</button>
      <button>Doing</button>
      <button>Done</button>
    </li>
  );
}
export default ToDo;
