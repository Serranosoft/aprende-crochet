export function isLastStep(current, stepsLength) {
  return current + 1 === stepsLength;
}

export function hasNextStep(current, stepsLength) {
  return (current + 1) < stepsLength;
}
