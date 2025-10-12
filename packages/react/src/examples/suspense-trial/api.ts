import { createResource } from "./resource";
import type { User } from "./types";

const userResourceCache = new Map<User["id"], ReturnType<typeof createResource<User>>>();

export const userResource = (id: User["id"]) => {
  if (!userResourceCache.has(id)) {
    userResourceCache.set(
      id,
      createResource(async () => {
        const res = await fetchUser(id);
        if (!res.ok) throw new Error("Failed");
        return res.json() as Promise<User>;
      }),
    );
  }
  return userResourceCache.get(id)!;
};

export function fetchUser(id: User["id"]) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
}

export function fetchUsers() {
  return fetch("https://jsonplaceholder.typicode.com/users");
}

export function fetchPosts() {
  return fetch("https://jsonplaceholder.typicode.com/posts");
}
