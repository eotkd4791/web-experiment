import { createResource } from "./resource";

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: { lat: string; lng: string };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};
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

function fetchUser(id: User["id"]) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
}
