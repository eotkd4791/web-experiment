import { useNavigate } from "react-router-dom";
import { useCustomHook } from "./useCustomHook";

export default function Second() {
  const navigate = useNavigate();
  const { result } = useCustomHook({ id: 2 });

  return (
    <div>
      <article>
        두번째 컴포넌트 result: {JSON.stringify(result, null, 2)}
      </article>
      <button type="button" onClick={() => navigate("/first")}>
        첫번째 컴포넌트로
      </button>
    </div>
  );
}
