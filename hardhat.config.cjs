require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},

    polygon: {
      url: process.env.NETWORK_URL,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY]
    }
  }
};
