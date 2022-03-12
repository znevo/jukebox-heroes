<template>
  <div class="my-nfts">
    <section class="section">
      <div class="container is-fluid">
        <div class="block">
          <navigation-tabs />
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
