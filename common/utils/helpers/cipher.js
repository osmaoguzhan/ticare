const crypto = require("crypto");

const encrypt = (text) => {
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(
    process.env.ALGORITHM,
    process.env.NEXTAUTH_SECRET,
    iv
  );

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
  };
};

const decrypt = (hash) => {
  hash = JSON.parse(hash);
  const decipher = crypto.createDecipheriv(
    process.env.ALGORITHM,
    process.env.NEXTAUTH_SECRET,
    Buffer.from(hash.iv, "hex")
  );
  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, "hex")),
    decipher.final(),
  ]);
  return decrpyted.toString();
};

module.exports = {
  encrypt,
  decrypt,
};
