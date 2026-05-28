export const normalizeCharacter = (str: string): string => {
  return str.replace(/\D/g, "");
};