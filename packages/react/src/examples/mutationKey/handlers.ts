import { http, HttpResponse } from "msw";
import { fakerKO as faker } from "@faker-js/faker";

const list = [
  {
    id: 1,
    title: faker.music.songName(),
    body: faker.music.genre(),
  },
  {
    id: 2,
    title: faker.music.songName(),
    body: faker.music.genre(),
  },
  {
    id: 3,
    title: faker.music.songName(),
    body: faker.music.genre(),
  },
  {
    id: 4,
    title: faker.music.songName(),
    body: faker.music.genre(),
  },
];

export const handlers = [
  http.get("http://localhost:5173/posts", () => {
    return HttpResponse.json(list);
  }),
  http.post("http://localhost:5173/posts", async ({ request }) => {
    const requestBody = await request.json();
    const url = new URL(request.url);
    const isError = url.searchParams.get("error") === "true";

    return isError
      ? new HttpResponse(null, { status: 400 })
      : HttpResponse.json([...list, requestBody]);
  }),
];
