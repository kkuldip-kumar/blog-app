function isBase64Image(str) {
  return /^data:image\/[^;]+;base64,/.test(str);
}
export { isBase64Image };
