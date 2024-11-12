import { produce } from "immer";
import { memo, useReducer } from "react";

const initialState = { x: 0, y: 0 };

const enum Dir {
  UP = "UP",
  RIGHT = "RIGHT",
  DOWN = "DOWN",
  LEFT = "LEFT",
}

function reducer(state: Record<"x" | "y", number>, action: { type: `${Dir}` }) {
  return produce(state, (draft) => {
    switch (action.type) {
      case Dir.UP:
        draft.y++;
        break;
      case Dir.RIGHT:
        draft.x++;
        break;
      case Dir.DOWN:
        draft.y--;
        break;
      case Dir.LEFT:
        draft.x--;
        break;
      default:
        return draft;
    }
  });
}

export default function ExampleWithUseReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <Horizontal x={state.x} />
      <Vertical y={state.y} />
      <ol>
        <li>
          <button onClick={() => dispatch({ type: Dir.UP })}>상</button>
        </li>
        <li>
          <button onClick={() => dispatch({ type: Dir.DOWN })}>하</button>
        </li>
        <li>
          <button onClick={() => dispatch({ type: Dir.LEFT })}>좌</button>
        </li>
        <li>
          <button onClick={() => dispatch({ type: Dir.RIGHT })}>우</button>
        </li>
      </ol>
    </div>
  );
}

const Horizontal = memo(({ x }: { x: number }) => {
  console.log("horizontal rendering");
  return <section>{x}</section>;
});

const Vertical = memo(({ y }: { y: number }) => {
  console.log("vertical rendering");
  return <section>{y}</section>;
});
