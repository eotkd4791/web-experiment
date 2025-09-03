import { useState } from "react";

const times: number[] = [];
const getRandomWithLimit = (min: number, max: number) => {
  const result = (Math.floor(Math.random() * max) + min) % max;
  times.push(result);
  return result;
};

const delay = (value: string, r: boolean) =>
  new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      console.log(`${value} 완료`);
      if (r) {
        resolve(value);
      } else {
        reject(`${value} 실패`);
      }
    }, getRandomWithLimit(500, 5000));
  });

const fruits = [
  "Apple",
  "Banana",
  "Cherry",
  "Date",
  "Elderberry",
  "Fig",
  "Grape",
  "Honeydew",
  "Indian Fig",
  "Jackfruit",
];

const getFruit = (fruitName: string, r: boolean) => {
  console.log(`${fruitName} 시작`);
  return delay(fruitName, r);
};

export default function MultiplePromise() {
  const [result, setResult] = useState<Array<string>>([]);

  const onClick = async () => {
    try {
      console.time("후르츠");

      const response = await Promise.allSettled(fruits.map((f, i) => getFruit(f, Boolean(i % 2))));

      console.log({ response });

      setResult(response.map(({ status }) => `${status === "fulfilled" ? "성공" : "실패"}`));

      const sum = times.reduce((acc, cur) => acc + cur, 0);
      const avg = times.reduce((acc, cur) => acc + cur, 0) / times.length;
      const max = Math.max(...times);

      console.log({ sum, avg, max });

      console.timeEnd("후르츠");
    } catch (error) {
      console.error("에러발생");
      console.error(error);
    }
  };

  return (
    <div>
      <ol>
        {result.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ol>
      <button onClick={onClick}>비동기 시작</button>
    </div>
  );
}
