export const convertFileToBase64 = (file: File | Blob) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export const convertFileToBase64WithWorker = (file: File) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL("./worker.ts", import.meta.url), {
      type: "module",
    });
    worker.onmessage = (e) => resolve(e.data);
    worker.onerror = (error) => reject(error);
    worker.postMessage(file);
  });
};

export const converFileToBase64WithStream = async (file: File) => {
  const chunkSize = 1024 * 1024;
  const chunks = Math.ceil(file.size / chunkSize);

  let offset = 0;
  let base64Result = "";

  for (let i = 0; i < chunks; i++) {
    const slice = file.slice(offset, offset + chunkSize);
    const base64Chunk = await convertFileToBase64(slice);
    base64Result += base64Chunk.split(",")[1];
    offset += chunkSize;
  }

  return `data:${file.type};base64,${base64Result}`;
};
