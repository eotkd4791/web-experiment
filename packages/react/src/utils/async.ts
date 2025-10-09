export function* take<T>(length: number, iterable: Iterable<T>) {
  const iterator = iterable[Symbol.iterator]();
  while (length--) {
    const { value, done } = iterator.next();
    if (done) break;
    yield value;
  }
}

export function* chunk<T>(size: number, iterable: Iterable<T>) {
  const iterator = iterable[Symbol.iterator]();
  while (true) {
    const arr = [
      ...take(size, {
        [Symbol.iterator]() {
          return iterator;
        },
      }),
    ];
    if (arr.length) yield arr;
    if (arr.length < size) break;
  }
}

export function* map<A, B>(f: (a: A) => B, iterable: Iterable<A>): IterableIterator<B> {
  for (const a of iterable) {
    yield f(a);
  }
}
