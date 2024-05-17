const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Token Contracts", function () {
  let JPTOKEN;
  let jptoken;
  let owner;

  before(async () => {
    [owner] = await ethers.getSigners();
    JPTOKEN = await ethers.getContractFactory("JPTOKEN");
    jptoken = await JPTOKEN.deploy(owner.address);
    // const address = jptoken.getAddress();
    // console.log(address)
    // expect(address).length(42)
    // await jptoken.deployed();

    // CustomTokenWithFee = await ethers.getContractFactory("CustomTokenWithFee");
    // customTokenWithFee = await CustomTokenWithFee.deploy("");
    // await customTokenWithFee.deployed();

    // tokenDistribution = await TokenDistribution.deploy(jptoken.address, owner.address);
    // await tokenDistribution.deployed();
  });

  it("deploy JPTOKEN", async () => {
    expect(jptoken.address).to.not.equal(0);
    // expect(customTokenWithFee.address).to.not.equal(0);
    // expect(tokenDistribution.address).to.not.equal(0);
    return jptoken.address, owner
  })


 
  // describe("Deployment", function () {
  //   it("Should deploy JPTOKEN, CustomTokenWithFee, and TokenDistribution contracts", async function () {
  //     expect(jptoken.address).to.not.equal(0);
  //     expect(customTokenWithFee.address).to.not.equal(0);
  //     expect(tokenDistribution.address).to.not.equal(0);
  //   });
  // });

  // describe("Token Distribution", function () {
  //   it("Should claim tokens", async function () {
  //     await expect(tokenDistribution.claimTokens())
  //       .to.emit(jptoken, "Transfer")
  //       .withArgs(owner.address, addr1.address, 500 * 10 ** 18);

  //     const claimedTokens = await tokenDistribution.claimedTokens(owner.address);
  //     expect(claimedTokens).to.equal(500 * 10 ** 18);
  //   });

  //   // Add more tests as needed
  // });
  
  // describe("CustomTokenWithFee", function () {
  //   it("Should transfer tokens with fee deducted", async function () {
  //     // Transfer tokens from owner to addr1
  //     await customTokenWithFee.transfer(addr1.address, 1000 * 10 ** 18);
  
  //     // Check balances before and after transfer
  //     const ownerBalanceBefore = await customTokenWithFee.balanceOf(owner.address);
  //     const addr1BalanceBefore = await customTokenWithFee.balanceOf(addr1.address);
  
  //     // Calculate expected amounts after fee deduction
  //     const fee = (1000 * 5) / 100; // 5% fee
  //     const amountAfterFee = 1000 - fee;
  
  //     // Check balances after transfer
  //     const ownerBalanceAfter = await customTokenWithFee.balanceOf(owner.address);
  //     const addr1BalanceAfter = await customTokenWithFee.balanceOf(addr1.address);
  
  //     // Check if balances are updated correctly after transfer with fee deducted
  //     expect(ownerBalanceAfter).to.equal(ownerBalanceBefore.sub(1000));
  //     expect(addr1BalanceAfter).to.equal(addr1BalanceBefore.add(amountAfterFee));
  //   });
  
  //   // Add more tests for fee distribution logic if implemented
  // });
  

});
