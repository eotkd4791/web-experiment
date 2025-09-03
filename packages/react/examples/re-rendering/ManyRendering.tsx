import { memo } from "react";

type Props = {
  onClick: () => void;
};

export default memo(function ManyRendering({ onClick }: Props) {
  return (
    <ol>
      {Array.from({ length: 100 }, (_, i) => {
        if (i === 99) {
          console.log("99th logged");
        }
        return (
          <li key={i} onClick={onClick}>
            {i}
          </li>
        );
      })}
    </ol>
  );
});
