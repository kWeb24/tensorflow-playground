export const getRandomInRange = (min, max) => {
  const minVal = Math.ceil(min);
  const maxVal = Math.floor(max);
  return Math.floor(Math.random() * (maxVal - minVal)) + minVal;
};

export const randomGaussian = () => {
  let randNum = (Math.random() + Math.random()) / 2;
  randNum = (Math.random() + Math.random() + Math.random()) / 3; // eslint-disable-line no-magic-numbers
  randNum = (Math.random() + Math.random() + Math.random() + Math.random()) / 4; // eslint-disable-line no-magic-numbers
  return randNum;
};
