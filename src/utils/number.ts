export const closestDivisor = (number: number, target: number) => {
  if (target == 2 && number % 2 == 0) return target;
  let currentClosest = number % 2 ? 1 : 2;
  let currentDistance = target - currentClosest;

  for (let i = 3; i <= number / 2; i++) {
    if (number % i) continue;
    const distance = Math.abs(target - i);
    if (distance > currentDistance) return currentClosest;
    currentClosest = i;
    currentDistance = distance;
  }
  return currentClosest;
};

export const wholeNumberRange = (stop: number, divisions: number) => {
  const closest = closestDivisor(stop, divisions);
  // TODO: Fix type error
  return [...Array(closest + 1).keys()].map((num) =>
    Math.floor((stop * num) / closest)
  );
};

export function constrainNumber(number: number, low: number, high: number) {
  if (number < low) return low;
  if (number > high) return high;
  return number;
}
