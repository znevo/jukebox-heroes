<template>
  <div id="app">
    <navigation-bar v-if="$route.name != 'home'" />
    <router-view/>
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar'

export default {
  components: {
    NavigationBar
  },
}
</script>
