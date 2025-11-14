/*
Function which returns a light backhround color based on the given input number.
- input: number between 1 and 37 (inclusive)
output: corresponding hex color code as a string
*/
export default function getBackgroundColor(num: number): string {
  // generate a color based on the input number by doing a calculation
  const hue = (num * 137) % 360; // use a prime number to spread out the hues
  return `hsl(${hue}, 70%, 90%)`; // light color with high saturation and lightness
}
