const hre = require("hardhat");
require('dotenv').config();

async function main() {
  const [signer] = await ethers.getSigners();

  const accounts = [
    '0x2F7778D8103767251d5282c26544048F47AD4BE4',
    '0x2838b365D1646D693Af11A81Ac644809C4D97a16',
    '0x089474D933Fb6eB207E186b6DA114F9Dcb9d693F',
    '0x13a99Fd6cB1d4F0969aB7e71aa80E0ad2416386B',
    '0x7e89168F4582E77b98a5b1121AA1799e531aefC3',
    '0x872cE4e4372F78FA115F1881002495400a24c0Fb',
    '0x632488BE8CB4161d357627689aB1aA8C58c11E6E',
    '0x3532FF6aa621aA07dfC1bd13a243b7AaD6A98b91',
  ];

  for (let i=0; i<accounts.length; i++) {
      await signer.sendTransaction({
        to: accounts[i],
        value: ethers.utils.parseEther('100')
    });
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
