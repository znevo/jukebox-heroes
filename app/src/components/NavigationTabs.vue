<template>
  <div class="navigation-tabs">
    <div class="tabs is-toggle is-toggle-rounded is-centered">
      <ul>
        <li :class="$route.name === 'my-nfts' ? 'is-active' : ''">
          <router-link to="/my-nfts">
            <span class="icon is-small"><i class="fa-solid fa-heart"></i></span>
            <span>Heroes</span>
          </router-link>
        </li>
        <li :class="$route.name === 'artists' ? 'is-active' : ''">
          <router-link to="/artists">
            <span class="icon is-small"><i class="fa-solid fa-music"></i></span>
            <span>Artists</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavigationTabs',
}
</script>
