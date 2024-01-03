const { assert, expect } = require("chai");
const { deployments, ethers, getNamedAccounts } = require("hardhat");

describe("FundMe", async function () {
  let fundMe;
  let mockV3Aggregator;
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
  //   beforeEach();
});
