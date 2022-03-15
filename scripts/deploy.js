const hre = require("hardhat");
const { expect } = require("chai");
const { ethers } = require("hardhat");

let jukebox;
let record__721;
let record__1155;

async function main() {
  const RecordFactory__721 = await hre.ethers.getContractFactory("Record__721");
  record__721 = await RecordFactory__721.deploy();
  await record__721.deployed();
  console.log("Record__721 deployed to:", record__721.address);

  const RecordFactory__1155 = await hre.ethers.getContractFactory("Record__1155");
  record__1155 = await RecordFactory__1155.deploy();
  await record__1155.deployed();
  console.log("Record__1155 deployed to:", record__1155.address);

  const JukeboxFactory = await ethers.getContractFactory("Jukebox");
  jukebox = await JukeboxFactory.deploy(record__721.address, record__1155.address);
  await jukebox.deployed();
  console.log("Jukebox deployed to:", jukebox.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
