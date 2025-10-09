type Palette = Record<"red" | "green" | "blue", [number, number, number] | string>;

const palette1: Palette = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [0, 0, 255],
};

// typescript error
// @ts-expect-error 에러가 나는걸 보여주기 위한 예시
const normalizedGreen1 = palette1.green.toUpperCase();

console.log(normalizedGreen1);

const palette2 = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [0, 0, 255],
} satisfies Palette;

const normalizedGreen2 = palette2.green.toUpperCase();

console.log(normalizedGreen2);
