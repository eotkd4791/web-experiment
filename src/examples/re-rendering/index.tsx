import { useCallback, useEffect, useState } from "react";
import ManyRendering from "./ManyRendering";

export default function Rerender() {
  const [, setState] = useState(0);
  const onClick = useCallback(() => {}, []);

  useEffect(() => {
    setTimeout(() => {
      setState(1);
      console.log("updated");
    }, 1000);
  }, []);

  return (
    <div>
      <ManyRendering onClick={onClick} />
    </div>
  );
}
