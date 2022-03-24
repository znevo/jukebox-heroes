<template>
  <div class="navigation-bar">
    <nav class="navbar" role="navigation" aria-label="main navigation" style="background: transparent;">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item" style="text-decoration: none;">
          <span style="font-size:30px; margin-top: 0px;">🎶</span>
          <span style="font-size:40px; margin-top: 0px;">🎙</span>
          <span class="is-size-4 has-text-weight-medium">Jukebox Heroes</span>
        </router-link>
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="primary-navbar" @click="show = !show" :class="show ? 'is-active' : ''">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="primary-navbar" class="navbar-menu" :class="show ? 'is-active' : ''">
        <div class="navbar-end mr-4">
          <div class="navbar-item">
            <router-link to="/jukebox">Jukebox</router-link>
          </div>
          <div class="navbar-item">
            <router-link to="/artists" :class="$route.name == 'artists' ? 'router-link-exact-active' : ''">Artists</router-link>
          </div>
          <div class="navbar-item is-hidden">
            <router-link to="/buy-song" class="button is-rounded is-white is-outlined is-mixed-button" @click.native="$event.target.blur()">Buy SONG</router-link>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavigationBar',
  data() {
    return {
      show: false,
    }
  }
}
</script>
