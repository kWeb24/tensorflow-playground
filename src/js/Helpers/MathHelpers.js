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

export const getRelativeAngleBetween = (sourceX, sourceY, compareX, compareY) => {
  const a2 = Math.atan2(sourceY, sourceX);
  const a1 = Math.atan2(compareY, compareX);
  const sign = a1 > a2 ? 1 : -1;
  const K = -sign * Math.PI * 2;
  const angle = a1 - a2;
  return Math.abs(K + angle) < Math.abs(angle) ? K + angle : angle;
};
