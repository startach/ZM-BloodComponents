// See also : src/styles/variables for CSS colors
const documentStyle = getComputedStyle(document.documentElement);

const info = documentStyle.getPropertyValue("--color-info").trim() || "#f3f5f7";
const primary =
  documentStyle.getPropertyValue("--color-primary").trim() || "#c7007d";
const secondary =
  documentStyle.getPropertyValue("--color-secondary").trim() || "#347d8d";

export const colors = {
  primary,
  secondary,
  info,
};

export default colors;
