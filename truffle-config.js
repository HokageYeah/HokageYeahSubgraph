require('babel-register')
require('babel-polyfill')
const dotenv = require('dotenv');
const HDWalletProvider = require('truffle-hdwallet-provider')

const result = dotenv.config();
if (result.error) {
  throw result.error;
}
console.log('process.env.PRIVATE_KEY----', process.env.PRIVATE_KEY);
console.log('process.env.SEPOLIA_INFURA_API_KEY----', process.env.SEPOLIA_INFURA_API_KEY);

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
    },
    sepolia: {
      provider: function() {
        return new HDWalletProvider(
          process.env.PRIVATE_KEY,
          `https://eth-sepolia.g.alchemy.com/v2/${process.env.SEPOLIA_ALCHEMY_API_KEY}`
          // `https://sepolia.infura.io/v3/${process.env.SEPOLIA_INFURA_API_KEY}`
        )
      },
      network_id: '11155111',
      gas: 6000000,
      gasPrice: 20000000000,
      networkCheckTimeout: 60000,
      timeoutBlocks: 200,
    },
  },
  compilers: {
    solc: {
      version: '0.8.19'    // Fetch exact version from solc-bin (default: truffle's version)
    }
  }
}
