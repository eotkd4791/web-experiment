onmessage = function (e: MessageEvent) {
  const file = e.data;
  const reader = new FileReader();
  reader.onloadend = () => {
    postMessage(reader.result);
  };
  reader.readAsDataURL(file);
};
