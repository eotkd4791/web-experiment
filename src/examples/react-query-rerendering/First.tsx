import { useCustomHook } from "./useCustomHook";
import { useNavigate } from "react-router-dom";

export default function First() {
  const navigate = useNavigate();
  const { result } = useCustomHook({ id: 2 });

  return (
    <div>
      <article>
        첫번째 컴포넌트 result: {JSON.stringify(result, null, 2)}
      </article>
      <button type="button" onClick={() => navigate("/second")}>
        두번째 컴포넌트로
      </button>
    </div>
  );
}
