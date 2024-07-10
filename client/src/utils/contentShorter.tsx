export const contentShorter = (str: string): string => {
  if (str.length < 60) {
    return str.concat("...");
  } else {
    return str.slice(0, 150).concat("...");
  }
};
