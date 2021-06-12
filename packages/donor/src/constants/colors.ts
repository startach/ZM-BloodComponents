// See also : src/styles/variables for CSS colors
const documentStyle = getComputedStyle(document.documentElement);

const info = documentStyle.getPropertyValue("--color-info").trim() || "#707070";
const primary =
  documentStyle.getPropertyValue("--color-primary").trim() || "#4CAF50";
const secondary =
  documentStyle.getPropertyValue("--color-secondary").trim() || "#CB007B";

export const colors = {
  primary,
  secondary,
  info,
  white: "#FFFFFF",
};

export default colors;

export enum Color {
  Green = "primary",
  Pink = "secondary",
  Gray = "default",
}
