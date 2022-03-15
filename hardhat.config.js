require("@nomiclabs/hardhat-ethers");
const { alchemyApiKey, privateKeys} = require('./secrets.json');
module.exports = {
    networks: {
        mainnet: {
          url: `https://eth-mainnet.alchemyapi.io/v2/${alchemyApiKey}`,
          accounts: privateKeys,
        }
    },
    solidity: '0.6.12',
};