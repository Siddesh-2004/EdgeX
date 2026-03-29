const decodeBase64 = (str) => {
  if (!str) return null;
  return Buffer.from(str, "base64").toString("utf-8").trim();
};

export default decodeBase64;