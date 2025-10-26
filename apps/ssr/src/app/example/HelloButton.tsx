"use client";

import { useState } from "react";

export default function HelloButton() {
  const [count, setCount] = useState(0);

  return (
    <button aria-label="hello" onClick={() => setCount((c) => c + 1)} className="p-2 border rounded">
      Clicked {count} times
    </button>
  );
}
