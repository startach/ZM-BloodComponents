// See also : src/styles/variables for CSS colors
const documentStyle = getComputedStyle(document.documentElement);

const info = documentStyle.getPropertyValue("--color-info").trim() || "#7E7E7E";
const primary =
  documentStyle.getPropertyValue("--color-primary").trim() || "#4CAF50";
const secondary =
  documentStyle.getPropertyValue("--color-secondary").trim() || "#CB007B";
const gray = "#FF0000";

export const colors = {
  primary,
  secondary,
  info,
  gray,
  white: "#FFFFFF",
};

export default colors;

export enum Color {
  Primary = "primary",
  Secondary = "secondary",
  Default = "default",
}
