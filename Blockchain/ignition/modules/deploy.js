const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { ethers } = require("hardhat");

module.exports = buildModule("Deploy", (m) => {
  const address = "0xc0600992575fEfa391a03d14C68cA97bDa2b42A9"

  const token = m.contract("JPTOKEN", [address]);


  console.log(token)

  return { token };
});

// 0xEAD9596eB5f196D0d37FC9cCB9dD95f29474AF25

// 0xEAD9596eB5f196D0d37FC9cCB9dD95f29474AF25

// Deploy#JPTOKEN - 0xEAD9596eB5f196D0d37FC9cCB9dD95f29474AF25
// Deploy#TokenDistribution - 0x438F225D55ad78f18DB991cdDed1d7f24666c904