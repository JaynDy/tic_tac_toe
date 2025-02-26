import { determineLineType } from "./determineLineType";

export const determineLinePosition = (winningLine) => {
  console.log("determineLinePosition", winningLine);
  if (!winningLine) return null;
  const [a, b, c] = winningLine;

  const type = determineLineType(winningLine);
  console.log("type", type);

  if (type === "horizontal") {
    const row = Math.floor(a / 3);
    return {
      top: `${33.33 * row + 15}%`,
    };
  }

  if (type === "vertical") {
    const col = a % 3;
    return {
      left: `${33.33 * col + 15}%`,
    };
  }

  if (type === "diagonalLeft") {
    return {
      top: `${33.33 + 15}%`,
    };
  }

  if (type === "diagonalRight") {
    return {
      right: `${33.33 + 16}%`,
    };
  }
  return null;
};
