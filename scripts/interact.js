const hre = require("hardhat");

async function main() {
  // Replace with your deployed contract address
  const registryAddress = "0xD778378536Ee2a3a0b3f7ED282674F5dc9847822";

  // Get signer from network
  const [deployer] = await hre.ethers.getSigners();

  // Connect to the deployed contract
  const DIDRegistry = await hre.ethers.getContractFactory("DIDRegistry");
  const registry = DIDRegistry.attach(registryAddress);

  // Example: register a DID
  const tx = await registry.connect(deployer).registerDID("did:example:123456789");
  await tx.wait();
  console.log("DID registered successfully");

  // Example: read the DID back
  const did = await registry.getDID(deployer.address);
  console.log("DID for deployer:", did);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
