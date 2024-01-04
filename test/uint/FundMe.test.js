const { assert, expect } = require("chai");
const { deployments, ethers, getNamedAccounts } = require("hardhat");

describe("FundMe", async function () {
  let fundMe;
  let mockV3Aggregator;
  //   const sendVaue = ethers.utils.parseEther("1");
  //
  // deploy FundMe Contract using hardhat deploy
  beforeEach(async function () {
    //
    const deploymentResult = await deployments.fixture(["all"]);
    //
    const fundMeAddress = deploymentResult["FundMe"]?.address;
    fundMe = await ethers.getContractAt("FundMe", fundMeAddress);

    //
    const mockV3AggregatorAddress =
      deploymentResult["MockV3Aggregator"]?.address;
    //
    mockV3Aggregator = await ethers.getContractAt(
      "MockV3Aggregator",
      mockV3AggregatorAddress
    );
  });
  //
  describe("constructor", async function () {
    it("it sets the aggregrator addresses correctly", async function () {
      const response = await fundMe.getPriceFeed();
      mockV3Aggregator = await mockV3Aggregator.getAddress();
      assert.equal(response, mockV3Aggregator);
    });
  });

  describe("fund", async function () {
    it("fails if you dont send enough ETH", async function () {
      expect(fundMe.fund({ value: 0 })).to.be.revertedWith("not enough funds");
    });
    // it("updates the amount Data structures", async function () {
    //   await fundMe.fund({ value: sendVaue });
    //   const response = await fundMe.getAddressToAmountFunded()
    // });
  });
  //   beforeEach();
});
