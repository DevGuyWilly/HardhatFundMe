const { assert, expect } = require("chai");
const { deployments, ethers, getNamedAccounts } = require("hardhat");

describe("FundMe", async function () {
  let fundMe;
  let mockV3Aggregator;
  const sendValue = ethers.parseEther("1");
  //
  // deploy FundMe Contract using hardhat deploy
  beforeEach(async function () {
    //
    const deploymentResult = await deployments.fixture(["all"]);
    //
    const fundMeAddress = deploymentResult["FundMe"]?.address;
    deployer = fundMeAddress;
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
    it("updated the amount funded data structure", async function () {
      await fundMe.fund({ value: sendValue });
      const [deployer] = await ethers.getSigners();
      const response = await fundMe.getAddressToAmountFunded(deployer.address);
      assert.equal(response.toString(), sendValue.toString());
    });
  });
  //   beforeEach();
});
