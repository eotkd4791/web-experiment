import { ChangeEvent } from "react";
import compressImage from "browser-image-compression";
import { convertFileToBase64, convertFileToBase64WithWorker, converFileToBase64WithStream } from "./utils";

export default function Base64ImageTest() {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      (async function test1() {
        console.time("test1: base64로 바로 변환");
        const compressedImage = await compressImage(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        });
        const base64 = await convertFileToBase64(compressedImage);
        console.log("test1", base64);
        console.timeEnd("test1: base64로 바로 변환");
      })();
      //

      (async function test2() {
        console.time("test2: worker로 변환");
        const compressedImage = await compressImage(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        });
        const base64 = await convertFileToBase64WithWorker(compressedImage);
        console.log("test2", base64);
        console.timeEnd("test2: worker로 변환");
      })();

      (async function test3() {
        console.time("test3: stream으로 변환");
        const compressedImage = await compressImage(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        });
        const base64 = await converFileToBase64WithStream(compressedImage);
        console.log("test3", base64);
        console.timeEnd("test3: stream으로 변환");
      })();
    }
  };

  return (
    <div>
      <input type="file" onChange={onChange} />
    </div>
  );
}
