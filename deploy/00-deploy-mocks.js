const { network } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployment }) => {
  const { deploy, log } = deployment;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
};
