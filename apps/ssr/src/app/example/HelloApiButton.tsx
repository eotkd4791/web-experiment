"use client";

import { useState } from "react";

export default function HelloApiButton() {
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    const res = await fetch("/api/hello");
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div>
      <button aria-label="fetch" onClick={handleClick}>
        Fetch Greeting
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
