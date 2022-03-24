const { expect } = require("chai");
const { ethers } = require("hardhat");

const Record__721 = require('../app/artifacts/contracts/Record__721.sol/Record__721');
const Record__1155 = require('../app/artifacts/contracts/Record__1155.sol/Record__1155');

const debug = false;

let jukebox;
let record__721;
let record__1155;
let cloneAddr__721;
let cloneAddr__1155;

const name = 'CosmicNFT';
const symbol = 'COSMIC';
const uri = 'https://gateway.ipfs.io/ipfs/QmYBovxZWHEML6tRHVFmdqZNTRgDuohzfaaVpt1dhyWM3X';
const ltdSupply = 100;
const ltdPrice = ethers.utils.parseEther('0.1');
const price = ethers.utils.parseEther('0.0005');
const charity = '0x2838b365D1646D693Af11A81Ac644809C4D97a16';
const charityRoyalty = 40;
const mintersRoyalty = 5;
const jukeboxRoyalty = 5;

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

  describe("constructor()", function () {
    it("should deploy", async function () {
      const JukeboxFactory = await ethers.getContractFactory("Jukebox");
      jukebox = await JukeboxFactory.deploy(record__721.address, record__1155.address);
      await jukebox.deployed();
      debug && console.log("Jukebox deployed to:", jukebox.address);
    });
  });

  describe("press__721()", function () {
    it ("should press Record__721 clones", async function() {
      const cloneTx__721 = await jukebox.press__721(name, symbol, uri, ltdSupply, ltdPrice);
      const receipt__721 = await cloneTx__721.wait();
      cloneAddr__721 = receipt__721.events.find(x => x.event === 'RecordPressed__721').args[0]
      debug && console.log("Jukebox deployed a Record__721 clone to:", cloneAddr__721);
    });

    it("record clones should only allow owner to mint", async function () {
      const [signer] = await ethers.getSigners();
      const clone__721 = await hre.ethers.getContractAt("Record__721", cloneAddr__721);
      // const mintTx__721 = await clone__721.mint(signer.address, ltdPrice);
      // await mintTx__721.wait();
      await expect(clone__721.mint(signer.address, price)).to.be.reverted;
      debug && console.log("Record__721 clone minted an NFT!");
    });
  });

  describe("press__1155()", function () {
    it ("should press Record__1155 clones", async function() {
      const cloneTx__1155 = await jukebox.press__1155(name, symbol, uri, price);
      const receipt__1155 = await cloneTx__1155.wait();
      cloneAddr__1155 = receipt__1155.events.find(x => x.event === 'RecordPressed__1155').args[0]
      debug && console.log("Jukebox deployed a Record__1155 clone to:", cloneAddr__1155);
    });

    it("record clones should only allow owner to mint", async function () {
      const [signer] = await ethers.getSigners();
      const clone__1155 = await hre.ethers.getContractAt("Record__1155", cloneAddr__1155);
      // const mintTx__1155 = await clone__1155.mint(signer.address, price);
      // await mintTx__1155.wait();
      await expect(clone__1155.mint(signer.address, price)).to.be.reverted;
      debug && console.log("Record__1155 clone minted an NFT!");
    });
  });

  describe("pressRecord()", function () {
    it ("should press records", async function() {
      const [signer, creator, ltdMinter, minter] = await ethers.getSigners();
      const pressTx = await jukebox.connect(creator).pressRecord(
        name,
        symbol,
        uri,
        ltdSupply,
        ltdPrice,
        price,
        charity,
        charityRoyalty,
        mintersRoyalty,
        jukeboxRoyalty
      );
      const receipt = await pressTx.wait();
      const [recordAddr__721, recordAddr__1155] = receipt.events.find(x => x.event === 'RecordPressed').args;
      debug && console.log("Jukebox pressed a Record__721 clone to:", recordAddr__721);
      debug && console.log("Jukebox pressed a Record__1155 clone to:", recordAddr__1155);
    });

    it ("should add pressed records to the catalog", async function() {
      const genesisRecord = await jukebox.catalog(0);
      expect(genesisRecord['__721']).to.be.properAddress;
      expect(genesisRecord['__1155']).to.be.properAddress;
    });
  });

  describe("getCatalog()", function () {
    it ("should return a catalog of records", async function() {
      const catalog = await jukebox.getCatalog();
      expect(catalog.length == 1);
      expect(catalog[0]['__721']).to.be.properAddress;
      expect(catalog[0]['__1155']).to.be.properAddress;
    });
  });

  describe("recordIndex()", function () {
    it ("should locate records in the catalog", async function() {
      const pressTx = await jukebox.pressRecord(
        name,
        symbol,
        uri,
        ltdSupply,
        ltdPrice,
        price,
        charity,
        100,
        mintersRoyalty,
        jukeboxRoyalty
      );
      const receipt = await pressTx.wait();
      const [recordAddr__721, recordAddr__1155] = receipt.events.find(x => x.event === 'RecordPressed').args;
      const recordIndex = await jukebox.recordIndex(recordAddr__721);
      const foundRecord = await jukebox.catalog(recordIndex);
      const foundRoyalty = parseInt(foundRecord['charityRoyalty']);
      expect(foundRoyalty).to.equal(100);
    });
  });

  describe("mintRecord()", function () {
    it ("should mint limited edition records", async function() {
      const [signer, creator, ltdMinter, minter] = await ethers.getSigners();
      const catalog = await jukebox.getCatalog();

      const __721 = new ethers.Contract(catalog[0]['__721'], Record__721.abi, signer);
      const mintTx__721 = await jukebox.connect(ltdMinter).mintRecord(catalog[0]['__721'], { value: ltdPrice });
      const receipt__721 = await mintTx__721.wait();
      const balance__721 = parseInt(await __721.balanceOf(ltdMinter.address));
      expect(balance__721).to.equal(1);

      // check for an increase in total supply
      const supply__721 = parseInt(await __721.totalSupply());
      expect(supply__721).to.equal(1);
    });

    it ("should mint standard issue records", async function() {
      const [signer, creator, ltdMinter, minter] = await ethers.getSigners();
      const catalog = await jukebox.getCatalog();

      const __1155 = new ethers.Contract(catalog[0]['__1155'], Record__1155.abi, signer);
      const mintTx__1155 = await jukebox.connect(minter).mintRecord(catalog[0]['__1155'], { value: price });
      const receipt__1155 = await mintTx__1155.wait();
      const balance__1155 = await __1155.balanceOf(minter.address, 1);
      expect(balance__1155).to.equal(1);
    });

    it ("should store jukebox revenue on the contract", async function() {
      const balance = await ethers.provider.getBalance(jukebox.address);
      const revenue = ltdPrice.add(price);
      expect(balance).to.equal(revenue);
    });

    it ("should track revenue earned on a per record basis", async function() {
      const record = await jukebox.getRecord(cloneAddr__721);
      expect(record['revenue__721']).to.equal(ltdPrice);
      expect(record['revenue__1155']).to.equal(price);
    });
  });

  describe("distributeRevenue()", function () {
    it ("should distribute revenue to artists, charities, and ltd. minters", async function() {
      const [signer, creator, ltdMinter, minter] = await ethers.getSigners();

      const total = ltdPrice.add(price);

      const revenue = {};
      revenue.charity = total.div(100).mul(charityRoyalty);
      revenue.jukebox = total.div(100).mul(jukeboxRoyalty);
      revenue.ltdMinter = price.div(100).mul(mintersRoyalty).div(ltdSupply);
      revenue.creator = total.sub(revenue.charity).sub(revenue.jukebox).sub(revenue.ltdMinter);

      const before = {
        creator: await ethers.provider.getBalance(creator.address),
        charity: await ethers.provider.getBalance(charity),
        ltdMinter: await ethers.provider.getBalance(ltdMinter.address),
      };

      await jukebox.distributeRevenue([cloneAddr__721]);
      const record = await jukebox.getRecord(cloneAddr__721);

      const after = {
        creator: await ethers.provider.getBalance(creator.address),
        charity: await ethers.provider.getBalance(charity),
        ltdMinter: await ethers.provider.getBalance(ltdMinter.address),
      };

      expect(after.creator).to.equal(before.creator.add(revenue.creator));
      expect(after.charity).to.equal(before.charity.add(revenue.charity));
      expect(after.ltdMinter).to.equal(before.ltdMinter.add(revenue.ltdMinter));
      expect(record['revenue__1155']).to.equal(0);
      expect(record['revenue__721']).to.equal(0);
    });
  });
});
