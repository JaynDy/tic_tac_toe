export const determineLineType = (winningLine) => {
  if (!winningLine) return null;
  const [a, b, c] = winningLine;

  if (
    Math.floor(a / 3) === Math.floor(b / 3) &&
    Math.floor(b / 3) === Math.floor(c / 3)
  ) {
    return "horizontal";
  }

  if (a % 3 === b % 3 && b % 3 === c % 3) {
    return "vertical";
  }

  if (a === 2 && c === 6) {
    return "diagonalRight";
  }

  if (a === 0 && c === 8) {
    return "diagonalLeft";
  }

  return null;
};
