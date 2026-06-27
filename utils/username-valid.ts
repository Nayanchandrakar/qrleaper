export const validateInput = (message: string, isValid: boolean) => {
  return message
    ? message
    : isValid
      ? "Username is available"
      : "Enter a unique username"
}

export const validInputClassName = (
  userNameError: boolean,
  isChecking: boolean,
  isUserNameAvailable: boolean
) => {
  return userNameError && !isChecking
    ? "text-destructive"
    : isUserNameAvailable
      ? "text-green-600"
      : "text-gray-600"
}
