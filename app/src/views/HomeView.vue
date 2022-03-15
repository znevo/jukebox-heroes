<template>
  <div class="home">
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="block mb-6">
            <p>
              <span style="font-size:60px;">🎶</span>
              <span style="font-size:80px;">🎙</span>
            </p>
            <p class="title has-text-white">
              Jukebox Heroes
            </p>
            <p class="subtitle has-text-white is-size-6">
              Music, NFTs, Charity ❤️
            </p>
          </div>
          <div class="block pt-4">
            <template v-if="! $metamask.installed">
              <a href="https://metamask.io/" target="_blank" class="button is-rounded is-light is-outlined is-medium is-hero-button">Install MetaMask</a>
            </template>

            <template v-if="$metamask.installed && ! $metamask.user">
              <button class="button is-rounded is-light is-outlined is-medium is-hero-button" @click="connect">Rock On</button>
            </template>

            <template v-if="$metamask.user && ! ($metamask.ready('rinkeby') || $metamask.ready('hardhat'))">
              <button class="button is-rounded is-light is-outlined is-medium is-hero-button" @click="chain">Connect To Rinkeby</button>
            </template>
          </div>
        </div>
      </div>
      <div class="hero-foot has-text-centered pb-4">
        <ul>
          <li><a href="" target="_blank" rel="noopener">Discord</a></li>
          <li><a href="" target="_blank" rel="noopener">Twitter</a></li>
          <li><a href="" target="_blank" rel="noopener">Telegram</a></li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  methods: {
    connect() {
      this.$metamask.connect();
    },
    chain() {
      this.$metamask.chain('rinkeby');
    }
  }
}
</script>
