"use client";
import { useState } from "react";

export default function Counter({ users }) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1> There is {users.length} users</h1>
      <p>Counter Value: {count}</p>

      <button onClick={() => setCount((c) => c + 1)}>Click Me</button>
    </div>
  );
}
