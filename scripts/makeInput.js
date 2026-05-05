const { poseidon } = require("circomlibjs");
const fs = require("fs");

async function main() {
  const preimage = "123456789"; // secret value
  const hash = poseidon([BigInt(preimage)]);
  const pubHash = hash.toString();

  const input = {
    preimage: preimage.toString(),
    pubHash: pubHash
  };

  fs.writeFileSync("build/input.json", JSON.stringify(input, null, 2), "utf8");
  console.log("✅ build/input.json created. pubHash:", pubHash);
}

main();
