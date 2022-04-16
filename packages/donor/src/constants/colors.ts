// See also : src/styles/variables for CSS colors
const documentStyle = getComputedStyle(document.documentElement);

const primary =
  documentStyle.getPropertyValue("--donor-primary").trim() || "#4CAF51";
const secondary =
  documentStyle.getPropertyValue("--donor-secondary").trim() || "#CB007B";
const light =
  documentStyle.getPropertyValue("--donor-light-gray").trim() || "#dadee0";
const gray = documentStyle.getPropertyValue("--donor-gray").trim() || "#7E7E7E";

export const colors = {
  primary,
  secondary,
  light,
  gray,
  white: "#FFFFFF",
};

export default colors;

export enum Color {
  Primary = "primary",
  Secondary = "secondary",
}
