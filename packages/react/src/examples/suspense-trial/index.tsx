import { Suspense, useState, startTransition } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { User } from './User';

export function SuspenseTrial() {
  const [userId, setUserId] = useState(1);

  return (
    <ErrorBoundary fallback={<div>error boundary</div>}>
      <Suspense fallback={<div>suspense fallback</div>}>
        <button onClick={() => startTransition(() => setUserId((prev) => prev + 1))}>next</button>
        <User id={userId} />
      </Suspense>
    </ErrorBoundary>
  );
}
