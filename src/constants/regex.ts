export const MINIMUM_PASSWORD_PATTERN = /^.{8,}$/;
export const UPPERCASE_PATTERN = /^(?=.*[A-Z])/;
export const LOWERCASE_PATTERN = /^(?=.*[a-z])/;
export const INTEGER_PATTERN = /^(?=.*\d)/;
export const SYMBOL_PATTERN = /[$&+,:;=?@#|'<>.^*()%!-]/;
export const EMAIL_PATTERN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
export const PASSWORD_PATTERN =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
