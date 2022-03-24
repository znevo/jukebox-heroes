require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");
require("dotenv").config();

module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "./app/artifacts",
  },
  networks: {
    hardhat: {
      mining: {
        auto: true,
        interval: 2000
      }
    },
    rinkeby: {
      url: process.env.RINKEBY_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 40,
    coinmarketcap: process.env.COINMARKETCAP_KEY,
    enabled: false
  }
};
