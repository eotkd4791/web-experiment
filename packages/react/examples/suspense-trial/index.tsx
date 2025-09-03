import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { User } from "./User";

export function SuspenseTrial() {
  return (
    <ErrorBoundary fallback={<div>error boundary</div>}>
      <Suspense fallback={<div>suspense fallback</div>}>
        <User id={2} />
      </Suspense>
    </ErrorBoundary>
  );
}
