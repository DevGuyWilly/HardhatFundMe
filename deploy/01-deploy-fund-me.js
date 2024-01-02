// function deployFunc() {
//   console.log("Hi");
// }

const { networkConfig } = require("../helper-hardhat-config.js");

const { network } = require("hardhat");

// module.exports.default = deployFunc;
const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];

module.exports = async ({ getNamedAccounts, deployment }) => {
  const { deploy, log } = deployment;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  //
  if (chainId) {
  }

  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: [],
    log: true,
  });
};
