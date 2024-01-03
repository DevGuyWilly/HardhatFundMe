const { networkConfig } = require("../helper-hardhat-config.js");
const { network } = require("hardhat");
const { developmentChain } = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {

  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  let ethUsdPriceFeedAddress;
  // Local Network
  if (developmentChain.includes(network.name)) {
    // log("Local");
    const ethUsdAggregator = await deployments.get("MockV3Aggregator");
    ethUsdPriceFeedAddress = ethUsdAggregator.address;
  } else {
    // testnet
    ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
  }
  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: [ethUsdPriceFeedAddress],
    log: true,
  });
  // log("-------");
};

module.exports.tags = ["all", "fundme"];
