import { useState, Show, For } from "@builder.io/mitosis";

export default function Component(props) {
  const state = useState({ count: 0 });

  return (
    <div>
      <Show when={state.count < 3}>
        <h1>Click the button!</h1>
      </Show>
      <button onClick={() => state.set({ count: state.count + 1 })}>
        Click me
      </button>
    </div>
  );
}
