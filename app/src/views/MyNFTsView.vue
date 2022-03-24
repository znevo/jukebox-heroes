<template>
  <div class="my-nfts">
    <section class="section">
      <div class="container is-fluid">
        <div class="block">
          <navigation-tabs />
        </div>
        <div class="block">
          <div class="box dapp-box">
             <nav class="level">
                <div class="level-item has-text-centered">
                   <div>
                      <p class="heading">Foo</p>
                      <p class="title is-size-6">0.0 <i class="fa-brands fa-ethereum"></i></p>
                   </div>
                </div>
                <div class="level-item has-text-centered">
                   <div>
                      <p class="heading">Bar</p>
                      <p class="title is-size-6">0</p>
                   </div>
                </div>
                <div class="level-item has-text-centered">
                   <div>
                      <p class="heading">Baz</p>
                      <p class="title is-size-6">0</p>
                   </div>
                </div>
                <div class="level-item has-text-centered">
                   <div>
                      <p class="heading">Qux</p>
                      <p class="title is-size-6">0</p>
                   </div>
                </div>
             </nav>
          </div>
        </div>
        <div class="block">
          <div class="box dapp-box">
            <h1 class="title is-size-4 has-text-dark">Governance</h1>
            <h2 class="subtitle is-size-6 has-text-dark">Participation leads to ownership!</h2>
              <table width="100%" class="table">
                <tr>
                   <td class="is-size-6">Lorem</td>
                   <td align="right" class="is-size-6">0</td>
                </tr>
                <tr>
                   <td class="is-size-6">Ipsum</td>
                   <td align="right" class="is-size-6">0</td>
                </tr>
                <tr>
                   <td class="is-size-6">Dolor</td>
                   <td align="right" class="is-size-6">0</td>
                </tr>
              </table>
             <div class="control"><button class="button is-rounded is-gradient-button is-fullwidth is-medium mt-5"> Withdraw </button></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NavigationTabs from '@/components/NavigationTabs'

export default {
  name: 'MyNFTsView',
  components: {
    NavigationTabs
  },
}
</script>
