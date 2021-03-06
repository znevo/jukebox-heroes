const hre = require("hardhat");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { create } = require("ipfs-http-client");
const records = require("./records.json");

const projectId = process.env.INFURA_ID;
const projectSecret = process.env.INFURA_SECRET;
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

async function main() {
  const jukebox = await hre.ethers.getContractAt("Jukebox", "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0");
  const provider = new ethers.providers.JsonRpcProvider();
  const artist = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  for ( let i = 0; i < records.length; i++ ) {
    const record = records[i];

    const file = {
      path: '/',
      content: JSON.stringify({
        name: record.metadata.name,
        description: record.metadata.description,
        animation_url: record.metadata.animation_url,
        image: record.metadata.image,
      })
    };

    const { path } = await ipfs.add(file);
    const metadataURI = `https://gateway.ipfs.io/ipfs/${path}`;

    const pressTx = await jukebox.connect(artist).pressRecord(
      record.name,
      record.symbol,
      metadataURI,
      record.ltdSupply,
      ethers.utils.parseEther(record.ltdPrice.toString()),
      ethers.utils.parseEther(record.price.toString()),
      record.charity,
      record.charityRoyalty,
      record.mintersRoyalty,
      record.jukeboxRoyalty
    );

    const receipt = await pressTx.wait();
    const [recordAddr__721, recordAddr__1155] = receipt.events.find(x => x.event === 'RecordPressed').args;

    console.log(`Jukebox pressed a record: ${record.metadata.name} (${record.name})`);
    console.log(`Record__721 address: ${ recordAddr__721 }`);
    console.log(`Record__1155 address: ${ recordAddr__1155 }\n`);
  };
}

async function uploadMetadataFile(metadata) {

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
