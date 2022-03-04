export const emailDomain = () => ({
  pattern: {
    value:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
    message: "Must be an email",
  },
});
export const username = () => ({
  pattern: {
    value: /\w{8,}/g,
    message: "Username must be at least 8 characters long",
  },
});

export const password = () => ({
  pattern: {
    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
    message:
      "Password must be at least 8 characters long and contain 1 uppercase letter, 1 lowercase letter and 1 number",
  },
});
export const repeatPassword = (password: string) => ({
  validate: (value: string) => value === password || "Passwords must be equal",
});
