<template>
  <div class="jukebox">

    <div class="container is-fluid">
      <div class="block pt-5">
        <audio-player ref="player"></audio-player>
      </div>
      <div class="columns is-multiline pt-6 pb-6">
        <div class="column is-one-quarter-desktop is-one-third-tablet is-one-fifth-widescreen"
        v-for="(record, index) in catalog" :key="index">
          <div class="card" xstyle="border-radius: 12px;">
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="record.image" alt="Placeholder image" xstyle="border-radius: 12px 12px 0px 0px;">
              </figure>
            </div>
            <div class="card-content has-text-left">
              <div class="content">
                <template v-if="record.minted < record.ltdSupply">
                  <span class="tag is-info is-light mb-4">{{ record.minted }}/{{ record.ltdSupply }} minted</span>
                </template>
                <template v-else>
                  <span class="tag is-danger is-light mb-4">sold out</span>
                </template>
                <!-- <p class="subtitle is-7 mb-5">10/100 minted</p> -->
                <p class="title is-5">{{ record.artist }}</p>
                <p class="subtitle is-6">{{ record.name }}</p>
                <div class="buttons">
                  <button class="button is-primary is-light is-small" @click="mint(record, '__721', record.ltdPrice)" :disabled="record.minted == record.ltdSupply">
                    <span class="icon is-small">
                     <i class="fa-solid fa-heart"></i>
                    </span>
                    <span>Mint</span>
                  </button>
                  <button class="button is-success is-light is-small"
                    @click="play(record)"
                    v-if="record.isOwner__1155 || record.isOwner__721">
                    <span class="icon is-small">
                      <i class="fa-solid fa-play"></i>
                    </span>
                    <span>Play</span>
                  </button>
                  <button class="button is-success is-light is-small" @click="mint(record, '__1155', record.price)" v-else>
                    <span class="icon is-small">
                      <i class="fa-solid fa-music"></i>
                    </span>
                    <span>Buy</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import AudioPlayer from '@/components/AudioPlayer'
import Jukebox from '../../artifacts/contracts/Jukebox.sol/Jukebox';
import Record__721 from '../../artifacts/contracts/Record__721.sol/Record__721';
import Record__1155 from '../../artifacts/contracts/Record__1155.sol/Record__1155';
import { ethers } from 'ethers';
const axios = require('axios').default;

export default {
  name: 'JukeboxView',
  components: {
    AudioPlayer
  },
  data() {
    return {
      catalog: this.$store.state.catalog,
    }
  },
  async mounted() {
    await this.refreshCatalog();
  },
  methods: {
    async refreshCatalog() {
      const provider = new ethers.providers.Web3Provider(this.$metamask.provider);
      const signer = await provider.getSigner();
      const jukebox = new ethers.Contract(this.$store.state.jukeboxAddress, Jukebox.abi, signer);
      const rawCatalog = await jukebox.getCatalog();

      const catalog = [];
      for (let i=0; i<rawCatalog.length; i++) {
        const __721 = new ethers.Contract(rawCatalog[i]['__721'], Record__721.abi, signer);
        const __1155 = new ethers.Contract(rawCatalog[i]['__1155'], Record__1155.abi, signer);

        const metadataURI = await __721._uri();
        const { data: metadata } = await axios.get(metadataURI);

        catalog.unshift({
          __721: __721.address,
          __1155: __1155.address,
          artist: await __721.name(),
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
          animation_url: metadata.animation_url,
          minted: parseInt(await __721.totalSupply()),
          ltdSupply: parseInt(await __721._maxSupply()),
          ltdPrice: parseInt(await __721._price()),
          ltdMinters: parseInt(rawCatalog[i]['ltdMinters']),
          price: parseInt(await __1155._price()),
          creator: rawCatalog[i]['creator'].toLowerCase(),
          charity: rawCatalog[i]['charity'].toLowerCase(),
          charityRoyalty: parseInt(rawCatalog[i]['charityRoyalty']),
          mintersRoyalty: parseInt(rawCatalog[i]['mintersRoyalty']),
          jukeboxRoyalty: parseInt(rawCatalog[i]['jukeboxRoyalty']),
          revenue__721: parseInt(rawCatalog[i]['revenue__721']),
          revenue__1155: parseInt(rawCatalog[i]['revenue__1155']),
          isOwner__721: (parseInt(await __721.balanceOf(this.$metamask.user)) > 0),
          isOwner__1155: await __1155.isOwner(this.$metamask.user),
        });

        // if it's the first time, let's show them immediately upon load
        this.$store.state.catalog.length == 0 && (this.catalog = catalog);
      }

      this.catalog = catalog;
      this.$store.commit('setCatalog', this.catalog);
    },
    async mint(record, type, price) {
      const provider = new ethers.providers.Web3Provider(this.$metamask.provider);
      const signer = await provider.getSigner();
      const jukebox = new ethers.Contract(this.$store.state.jukeboxAddress, Jukebox.abi, signer);


      const mintTx = await jukebox.mintRecord(record[type], {
        value: ethers.utils.parseUnits(price.toString(), 'wei')
      });

      this.$flash.wait('Your transaction has been submitted and is awaiting confirmation!');
      await mintTx.wait();

      this.$flash.msg('Your NFT has been minted and is now available for playback in the jukebox!');
      this.play(record);

      this.refreshCatalog();
    },
    play(record) {
      this.$refs.player.addSong({
        name: record.name,
        artist: record.artist,
        url: record.animation_url,
        cover_art_url: record.image,
      });
    },
  },
}
</script>
