<template>
  <div class="artists">
    <section class="section">
      <div class="container is-max-desktop">
        <div class="block">
          <navigation-tabs />
        </div>
        <div class="block">
          <div class="columns">
            <div class="column is-one-third">

              <div class="block">
                <div class="box" style="border-radius: 24px;">
                  <h1 class="title is-size-4 has-text-dark">My Revenue</h1>
                  <h2 class="subtitle is-size-6 has-text-dark">Withdraw your revenue anytime!</h2>
                    <table width="100%" class="table">
                      <tr>
                         <td class="is-size-6">NFTs Launched</td>
                         <td align="right" class="is-size-6">{{ myNFTs.length }}</td>
                      </tr>
                      <tr>
                         <td class="is-size-6">Revenue</td>
                         <td align="right" class="is-size-6">{{ creatorRevenue }} <i class="fa-brands fa-ethereum"></i></td>
                      </tr>
                      <tr>
                         <td class="is-size-6">Charity</td>
                         <td align="right" class="is-size-6">{{ charityRevenue }} <i class="fa-brands fa-ethereum"></i></td>
                      </tr>
                      <tr>
                         <td class="is-size-6">Jukebox</td>
                         <td align="right" class="is-size-6">{{ jukeboxRevenue }} <i class="fa-brands fa-ethereum"></i></td>
                      </tr>
                      <tr>
                         <td class="is-size-6">Super Fans</td>
                         <td align="right" class="is-size-6">{{ mintersRevenue }} <i class="fa-brands fa-ethereum"></i></td>
                      </tr>
                      <tr>
                         <td class="is-size-6">Total Revenue</td>
                         <td align="right" class="is-size-6">{{ totalRevenue }} <i class="fa-brands fa-ethereum"></i></td>
                      </tr>
                    </table>
                  <div class="control">
                    <button class="button is-rounded is-gradient-button is-fullwidth is-normal is-medium mt-5"
                      @click="withdraw()">
                      Withdraw
                    </button>
                  </div>
                </div>
              </div>

            </div>
            <div class="column">

              <div class="box" style="border-radius: 24px;">
                <a href="" class="button is-small is-pulled-right is-rounded is-light" @click.prevent="demo()">demo</a>
                <h1 class="title is-size-4 has-text-dark">Launch Your NFT</h1>
                <h1 class="subtitle is-size-6 has-text-dark">Add a song to raise funds and become a Jukebox Superhero!</h1>

                <div class="field">
                  <label class="label">Audio</label>
                  <div class="control">

                    <div class="file has-name is-fullwidth is-normal">
                      <label class="file-label">
                        <input class="file-input" type="file" name="resume" @change="uploadAudioFile" ref="audioFile">
                        <span class="file-cta" style="border-radius: 20px 0 0 20px;">
                          <span class="file-icon">
                            <i class="fas fa-upload"></i>
                          </span>
                          <span class="file-label">
                            Choose a file…
                          </span>
                        </span>
                        <span class="file-name" style="border-radius: 0 20px 20px 0;">{{ this.form.audioFile }}</span>
                      </label>
                    </div>

                    <a :href="this.form.audioFileURI" target="_blank" class="is-size-7">{{ this.form.audioFileURI }}</a>
                  </div>
                </div>

                <div class="field">
                  <label class="label">Cover Art</label>
                  <div class="control">

                    <div class="file has-name is-fullwidth is-normal">
                      <label class="file-label">
                        <input class="file-input" type="file" name="resume" @change="uploadImageFile" ref="imageFile">
                        <span class="file-cta" style="border-radius: 20px 0 0 20px;">
                          <span class="file-icon">
                            <i class="fas fa-upload"></i>
                          </span>
                          <span class="file-label">
                            Choose a file…
                          </span>
                        </span>
                        <span class="file-name" style="border-radius: 0 20px 20px 0;">{{ form.imageFile }}</span>
                      </label>
                    </div>

                    <a :href="this.form.imageFileURI" target="_blank" class="is-size-7 has-text-weight-normal">{{ this.form.imageFileURI }}</a>

                  </div>
                </div>

                <div class="field">
                  <label class="label">Name</label>
                  <div class="control">
                    <input class="input is-normal is-rounded" type="text" placeholder="A Day In The Life" v-model="form.name">
                  </div>
                </div>

                <div class="field">
                  <label class="label">Description</label>
                  <div class="control">
                    <input class="input is-normal is-rounded" type="email" placeholder="I read the news today, oh boy!" v-model="form.description">
                  </div>
                </div>

                <div class="columns">
                  <div class="column">
                    <div class="field">
                      <label class="label">Token Name</label>
                      <div class="control">
                        <input class="input is-normal is-rounded" type="text" placeholder="The Beatles" v-model="form.tokenName">
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <div class="field">
                      <label class="label">Token Symbol</label>
                      <div class="control">
                        <input class="input is-normal is-rounded" type="text" placeholder="FAB4" v-model="form.tokenSymbol">
                      </div>
                    </div>
                  </div>
                </div>

                <div class="columns">
                  <div class="column">
                    <div class="field">
                      <label class="label">Limited Edition Supply</label>
                      <div class="control">
                        <input class="input is-normal is-rounded" type="number" step="100" placeholder="100 Records" v-model="form.ltdSupply">
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <div class="field">
                      <label class="label">Limited Edition Price</label>
                      <div class="control">
                        <input class="input is-normal is-rounded" type="number" step="0.1" placeholder="0.1 ETH" v-model="form.ltdPrice">
                      </div>
                    </div>
                  </div>
                </div>

                <div class="columns">
                  <div class="column">
                    <div class="field">
                      <label class="label">Revenue Distribution</label>
                      <div class="control">
                        <div class="select is-rounded is-normal is-fullwidth">
                          <select v-model="form.charityRoyalty">
                            <option selected disabled value="default">Charity</option>
                            <option value=100>100%</option>
                            <option value=90>90%</option>
                            <option value=80>80%</option>
                            <option value=70>70%</option>
                            <option value=60>60%</option>
                            <option value=50>50%</option>
                            <option value=40>40%</option>
                            <option value=30>30%</option>
                            <option value=20>20%</option>
                            <option value=10>10%</option>
                            <option value=0>0%</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <div class="field">
                      <label class="label is-hidden-mobile">&nbsp;</label>
                      <div class="control">
                        <div class="select is-rounded is-normal is-fullwidth">
                          <select v-model="form.mintersRoyalty">
                            <option selected disabled value="default">Super Fans</option>
                            <option value=5>5%</option>
                            <option value=4>4%</option>
                            <option value=3>3%</option>
                            <option value=2>2%</option>
                            <option value=1>1%</option>
                            <option value=0>0%</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <div class="field">
                      <label class="label is-hidden-mobile">&nbsp;</label>
                      <div class="control">
                        <div class="select is-rounded is-normal is-fullwidth">
                          <select v-model="form.jukeboxRoyalty">
                            <option selected disabled value="default">Jukebox</option>
                            <option value=5>5%</option>
                            <option value=4>4%</option>
                            <option value=3>3%</option>
                            <option value=2>2%</option>
                            <option value=1>1%</option>
                            <option value=0>0%</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="columns">
                  <div class="column">
                    <div class="field">
                      <label class="label">Charitable Organization</label>
                      <div class="control">
                        <div class="select is-rounded is-normal is-fullwidth">
                          <select v-model="form.charity">
                            <option selected disabled value="default">Make A Selection</option>
                            <option value="0x2838b365D1646D693Af11A81Ac644809C4D97a16">United Way Worldwide</option>
                            <option value="0x2838b365D1646D693Af11A81Ac644809C4D97a16">Feeding America</option>
                            <option value="0x2838b365D1646D693Af11A81Ac644809C4D97a16">Salvation Army</option>
                            <option value="0x2838b365D1646D693Af11A81Ac644809C4D97a16">St. Jude Children's Research Hospital</option>
                            <option value="0x2838b365D1646D693Af11A81Ac644809C4D97a16">Direct Relief</option>
                            <option value="0x2838b365D1646D693Af11A81Ac644809C4D97a16">Habitat for Humanity International</option>
                            <option value="0x2838b365D1646D693Af11A81Ac644809C4D97a16">Americares</option>
                            <option value="0x2838b365D1646D693Af11A81Ac644809C4D97a16">YMCA of the USA</option>
                            <option value="0x2838b365D1646D693Af11A81Ac644809C4D97a16">Boys & Girls Clubs of America</option>
                            <option value="0x2838b365D1646D693Af11A81Ac644809C4D97a16">Compassion International</option>
                            <option value="0x2838b365D1646D693Af11A81Ac644809C4D97a16">Catholic Charities USA</option>
                            <option value="0x2838b365D1646D693Af11A81Ac644809C4D97a16">Task Force for Global Health</option>
                            <option value="0x2838b365D1646D693Af11A81Ac644809C4D97a16">Step Up for Students</option>
                            <option value="0x2838b365D1646D693Af11A81Ac644809C4D97a16">Good 360</option>
                            <option value="0x2838b365D1646D693Af11A81Ac644809C4D97a16">Nature Conservancy</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <div class="field">
                      <label class="label">Minimum Donation</label>
                      <div class="control">
                        <input class="input is-normal is-rounded" type="number" step="0.0001" placeholder="0.0005 ETH" v-model="form.price">
                      </div>
                    </div>
                  </div>
                </div>

                <div class="has-text-centered">
                  <p class="control"><button class="button is-gradient-button is-medium is-rounded is-fullwidth" @click="launch">Launch</button></p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NavigationTabs from '@/components/NavigationTabs';
import Jukebox from '../../artifacts/contracts/Jukebox.sol/Jukebox';
import { ethers } from 'ethers';
import { create } from 'ipfs-http-client';
const ipfs = create("https://ipfs.infura.io:5001");

export default {
  name: 'ArtistsView',
  components: {
    NavigationTabs
  },
  data() {
    return {
      form: {
        audioFile: null,
        audioFileURI: null,
        imageFile: null,
        imageFileURI: null,
        metadataURI: null,
        name: null,
        description: null,
        tokenName: null,
        tokenSymbol: null,
        ltdSupply: null,
        ltdPrice: null,
        price: null,
        charity: 'default',
        charityRoyalty: 'default',
        mintersRoyalty: 'default',
        jukeboxRoyalty: 'default',
      }
    }
  },
  computed: {
    myNFTs() {
      return this.$store.state.catalog.filter(record => record.creator == this.$metamask.user);
    },
    totalRevenue() {
      const total = this.myNFTs.reduce((sum, record) => {
        return sum + parseInt(record.revenue__721) + parseInt(record.revenue__1155);
      }, 0);
      return ethers.utils.formatEther(total.toString());
    },
    creatorRevenue() {
      const revenue = ethers.utils.parseEther(this.totalRevenue)
        - ethers.utils.parseEther(this.charityRevenue)
        - ethers.utils.parseEther(this.jukeboxRevenue)
        - ethers.utils.parseEther(this.mintersRevenue);
      return ethers.utils.formatEther(revenue.toString());
    },
    charityRevenue() {
      const charity = this.myNFTs.reduce((sum, record) => {
        const revenue = parseInt(record.revenue__721) + parseInt(record.revenue__1155);
        return sum + ((revenue / 100) * record.charityRoyalty);
      }, 0);
      return ethers.utils.formatEther(charity.toString());
    },
    jukeboxRevenue() {
      const jukebox = this.myNFTs.reduce((sum, record) => {
        const revenue = parseInt(record.revenue__721) + parseInt(record.revenue__1155);
        return sum + ((revenue / 100) * record.jukeboxRoyalty);
      }, 0);
      return ethers.utils.formatEther(jukebox.toString());

    },
    mintersRevenue() {
      const minters = this.myNFTs.reduce((sum, record) => {
        const revenue = parseInt(record.revenue__1155);
        const mintersRoyalty = (revenue / 100) * record.mintersRoyalty
        const microRoyalty = mintersRoyalty / record.ltdSupply;
        const microRevenue = microRoyalty * record.ltdMinters;
        return sum + microRevenue;
      }, 0);
      return ethers.utils.formatEther(minters.toString());
    },
  },
  methods: {
    demo() {
        this.form.name = 'Astral Groove';
        this.form.description = 'Intergalactic Jam';
        this.form.tokenName = 'Cosmic';
        this.form.tokenSymbol = 'COSMIC';
        this.form.ltdSupply = 100;
        this.form.ltdPrice = 0.1;
        this.form.price = 0.0005;
        this.form.charity = '0x2838b365D1646D693Af11A81Ac644809C4D97a16';
        this.form.charityRoyalty = 40;
        this.form.mintersRoyalty = 5;
        this.form.jukeboxRoyalty = 5;
    },
    async launch() {
      await this.uploadMetadataFile();

      const provider = new ethers.providers.Web3Provider(this.$metamask.provider);
      const signer = await provider.getSigner();
      const jukebox = new ethers.Contract(this.$store.state.jukeboxAddress, Jukebox.abi, signer);

      const pressTx = await jukebox.pressRecord(
        this.form.tokenName,
        this.form.tokenSymbol,
        this.form.metadataURI,
        this.form.ltdSupply,
        ethers.utils.parseEther(this.form.ltdPrice.toString()),
        ethers.utils.parseEther(this.form.price.toString()),
        this.form.charity,
        this.form.charityRoyalty,
        this.form.mintersRoyalty,
        this.form.jukeboxRoyalty
      );

      this.$flash.wait('Your transaction has been submitted and is awaiting confirmation!');
      const receipt = await pressTx.wait();

      this.$flash.msg('Your NFT has been launched and is now available for minting in the jukebox!');
      const [recordAddr__721, recordAddr__1155] = receipt.events.find(x => x.event === 'RecordPressed').args;
      console.log("Jukebox pressed a Record__721 clone to:", recordAddr__721);
      console.log("Jukebox pressed a Record__1155 clone to:", recordAddr__1155);
    },
    async withdraw() {
      const provider = new ethers.providers.Web3Provider(this.$metamask.provider);
      const signer = await provider.getSigner();
      const jukebox = new ethers.Contract(this.$store.state.jukeboxAddress, Jukebox.abi, signer);

      const records = this.myNFTs.map(record => record.__721);

      const withdrawTx = await jukebox.distributeRevenue(records);
      this.$flash.wait('Your transaction has been submitted and is awaiting confirmation!');

      const receipt = await withdrawTx.wait();
      this.$flash.msg('Your revenue has been distrbuted and the profits transferred to your wallet!');
      console.log(receipt);

      // todo: fetch the real data rather than locally updating
      const catalog = this.$store.state.catalog.map(record => {
        if ( record.creator == this.$metamask.user ) {
          record.revenue__721 = 0;
          record.revenue__1155 = 0;
        }
        return record;
      });
      this.$store.commit('setCatalog', catalog);
    },
    uploadAudioFile(e) {
      if (e.target.files.length > 0) {
        this.form.audioFile = e.target.files[0].name;

        const file = this.$refs.audioFile.files[0];
        let reader = new window.FileReader();
        reader.readAsArrayBuffer(file);

        var that = this;
        reader.onloadend = async () => {
          const buffer = await Buffer.from(reader.result);
          that.form.audioFileURI = await this.ipfsUpload(buffer);
        };
      }
    },
    uploadImageFile(e) {
      if (e.target.files.length > 0) {
        this.form.imageFile = e.target.files[0].name;

        const file = this.$refs.imageFile.files[0];
        let reader = new window.FileReader();
        reader.readAsArrayBuffer(file);

        var that = this;
        reader.onloadend = async () => {
          const buffer = await Buffer.from(reader.result);
          that.form.imageFileURI = await this.ipfsUpload(buffer);
        };
      }
    },
    async uploadMetadataFile() {
      const file = {
        path: '/',
        content: JSON.stringify({
          name: this.form.name,
          description: this.form.description,
          image: this.form.imageFileURI,
          animation_url: this.form.audioFileURI
        })
      };
      this.form.metadataURI = await this.ipfsUpload(file);
    },
    async ipfsUpload(file) {
      const { path } = await ipfs.add(file);
      return `https://gateway.ipfs.io/ipfs/${path}`;
    }
  }
}
</script>
