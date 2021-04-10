// See also : src/styles/variables for CSS colors
const documentStyle = getComputedStyle(document.documentElement);
const colors = {
  primary: documentStyle.getPropertyValue("--color-primary").trim(),
  secondary: documentStyle.getPropertyValue("--color-secondary").trim(),
  info: documentStyle.getPropertyValue("--color-info").trim(),
};

export default colors;
