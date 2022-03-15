const { expect } = require("chai");
const { ethers } = require("hardhat");

const debug = false;

let jukebox;
let record__721;
let record__1155;

const name__721 = 'CosmicNFT';
const symbol__721 = 'COSMIC';
const uri__721 = 'https://gateway.ipfs.io/ipfs/QmYBovxZWHEML6tRHVFmdqZNTRgDuohzfaaVpt1dhyWM3X';

const name__1155 = 'CosmicNFT';
const symbol__1155 = 'COSMIC';
const uri__1155 = 'https://gateway.ipfs.io/ipfs/QmYBovxZWHEML6tRHVFmdqZNTRgDuohzfaaVpt1dhyWM3X';

describe("Record__721", function () {
  it("should deploy", async function () {
    const RecordFactory__721 = await hre.ethers.getContractFactory("Record__721");
    record__721 = await RecordFactory__721.deploy();
    await record__721.deployed();
    debug && console.log("Record__721 deployed to:", record__721.address);
  });
});

describe("Record__1155", function () {
  it("should deploy", async function () {
    const RecordFactory__1155 = await hre.ethers.getContractFactory("Record__1155");
    record__1155 = await RecordFactory__1155.deploy();
    await record__1155.deployed();
    debug && console.log("Record__1155 deployed to:", record__1155.address);
  });
});

describe("Jukebox", function () {
  it("should deploy", async function () {
    const JukeboxFactory = await ethers.getContractFactory("Jukebox");
    jukebox = await JukeboxFactory.deploy(record__721.address, record__1155.address);
    await jukebox.deployed();
    debug && console.log("Jukebox deployed to:", jukebox.address);
  });

  it ("should press Record__721 clones", async function() {
    const cloneTx__721 = await jukebox.press__721(name__721, symbol__721, uri__721);
    const receipt__721 = await cloneTx__721.wait();
    const cloneAddr__721 = receipt__721.events.find(x => x.event === 'RecordPressed').args[0]
    debug && console.log("Jukebox deployed a Record__721 clone to:", cloneAddr__721);

    describe("Record__721 clone", function () {
      it("should mint NFTs", async function () {
        const clone__721 = await hre.ethers.getContractAt("Record__721", cloneAddr__721);
        const mintTx__721 = await clone__721.mint();
        await mintTx__721.wait();
        debug && console.log("Record__721 clone minted an NFT!");
      });
    });
  });

  it ("should press Record__1155 clones", async function() {
    const cloneTx__1155 = await jukebox.press__1155(name__1155, symbol__1155, uri__1155);
    const receipt__1155 = await cloneTx__1155.wait();
    const cloneAddr__1155 = receipt__1155.events.find(x => x.event === 'RecordPressed').args[0]
    debug && console.log("Jukebox deployed a Record__1155 clone to:", cloneAddr__1155);

    describe("Record__1155 clone", function () {
      it("should mint NFTs", async function () {
        const clone__1155 = await hre.ethers.getContractAt("Record__1155", cloneAddr__1155);
        const mintTx__1155 = await clone__1155.mint();
        await mintTx__1155.wait();
        debug && console.log("Record__1155 clone minted an NFT!");
      });
    });
  });
});
