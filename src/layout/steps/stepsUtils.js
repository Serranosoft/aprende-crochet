export function getCurrentStepNumber(current) {
  return current + 1;
}

export function isLastStep(current, stepsLength) {
  return current + 1 === stepsLength;
}

export function hasNextStep(current, stepsLength) {
  return current + 1 < stepsLength;
}

export function getNextStepIndex(current, stepsLength) {
  return hasNextStep(current, stepsLength) ? current + 1 : current;
}
