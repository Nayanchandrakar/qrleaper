export const regexPatterns = {
  instagram: /^@/,
  facebook: /^(https:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9\.\/]+)$/,
  youtube:
    /^(https:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_\-]+)$/,
  googleDocs: /^https?:\/\/(docs\.google\.com)\/document\//,
  phoneRegex: /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
  passwordRegex:
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  specialCharacters: /^[a-zA-Z0-9_]+$/,
}
