const hidePassword = (password: string) => {
  const passwordLength = password.length;
  return "•".repeat(passwordLength);
};

export default hidePassword;
