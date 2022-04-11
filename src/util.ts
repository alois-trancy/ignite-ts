export const smallImage = (imagePath: string, size: number) => {
  return imagePath ? imagePath.replace(/\/media\/(?<url>screenshots|games)/, `/media/resize/${size}/-/$<url>`) : imagePath;
};