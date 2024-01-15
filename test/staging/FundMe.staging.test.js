const { ethers, getNamedAccounts, network } = require("hardhat");
const { developmentChain } = require("../../helper-hardhat-config");
const { assert, expect } = require("chai");

developmentChain.includes(network.name)
  ? describe.skip
  : describe("FundMe", async function () {
      let fundMe;
      let deployer;
      const sendValue = ethers.parseEther("1");

      beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer;
        fundMe = await ethers.getContractAt("FundMe", deployer);
      });

      it("allow people to fund and withdraw", async function () {
        await fundMe.fund({ value: sendValue });
        await fundMe.withdraw();
        const endingBal = await ethers.provider.getBalance(fundMe.target);
        assert.equal(endingBal.toString(), 0);
      });
    });
