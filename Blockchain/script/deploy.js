const hre = require("hardhat");

async function main() {

    const JPTokenFactory = await hre.ethers.getContractFactory("JPTOKEN") 
    const JPToken = await JPTokenFactory.deploy(ethers.constants.AddressZero);
    await JPToken.deployed();
    console.log("JPTOKEN deployed to:", JPToken.address);

     const TokenDistributionFactory = await hre.ethers.getContractFactory("TokenDistribution");
     const TokenDistribution = await TokenDistributionFactory.deploy(JPToken.address, ethers.constants.AddressZero);
     await TokenDistribution.deployed();
     console.log("TokenDistribution deployed to:", TokenDistribution.address);
 
     const CustomTokenWithFeeFactory = await hre.ethers.getContractFactory("CustomTokenWithFee");
     const CustomTokenWithFee = await CustomTokenWithFeeFactory.deploy(ethers.constants.AddressZero);
     await CustomTokenWithFee.deployed();
     console.log("CustomTokenWithFee deployed to:", CustomTokenWithFee.address);

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
