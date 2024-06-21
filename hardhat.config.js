require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  allowUnlimitedContractSize: true,
  paths: {
    artifacts: './frontend/src/artifacts'
  },
  networks: {
    hardhat:{
      chainId: 1337,
      // gas: 2100000,
      // gasPrice: 8000000000
    }
  },


};
