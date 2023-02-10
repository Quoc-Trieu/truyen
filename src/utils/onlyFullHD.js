export const onlyFullHD = () => {
  const execute = () => {
    const body = document.querySelector("body");
    const wWidth = window.innerWidth;
    const wHeight = window.innerHeight;
    const bWidth = 1600;
    const scaleUp = (1 / wWidth) * bWidth;
    const scaleDown = (1 / bWidth) * wWidth;

    body.style.width = `${bWidth}px`;
    body.style.height = `${wHeight * scaleUp}px`;
    body.style.transform = `scale(${scaleDown})`;
  };

  window.onresize = () => execute();
  execute();
};
