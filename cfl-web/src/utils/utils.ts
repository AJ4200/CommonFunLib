// Function to lighten a color
export const lighten = (color: string, amount: number): string => {
  const colorCode = parseInt(color.replace("#", ""), 16);
  const red = (colorCode >> 16) + amount;
  const green = ((colorCode >> 8) & 0xff) + amount;
  const blue = (colorCode & 0xff) + amount;
  const newColor = (blue | (green << 8) | (red << 16)).toString(16);
  return "#" + newColor.padStart(6, "0");
};
