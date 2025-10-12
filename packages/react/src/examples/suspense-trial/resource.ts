type Pending = { status: "pending"; promise: Promise<void> };
type Fulfilled<T> = { status: "fulfilled"; value: T };
type Rejected = { status: "rejected"; reason: unknown };
type ResponseStatus<T> = Pending | Fulfilled<T> | Rejected;

export function createResource<T>(load: () => Promise<T>) {
  let response: ResponseStatus<T> | null = null;
  return { read, preload, invalidate };

  function read() {
    if (!response) preload();

    const r = response as ResponseStatus<T>;
    switch (r.status) {
      case "pending":
        throw r.promise;
      case "rejected":
        throw r.reason;
      case "fulfilled":
        return r.value;
      default:
        r satisfies never;
    }
  }

  function preload() {
    if (response) return;

    const p = load()
      .then((v) => {
        response = { status: "fulfilled", value: v };
      })
      .catch((e) => {
        response = { status: "rejected", reason: e };
      });
    response = { status: "pending", promise: p.then(() => {}) };
  }

  function invalidate() {
    response = null;
  }
}
