<template>
  <div class="audioplayer">

    <div id="white-player">
      <div class="white-player-top">
        <div>
          &nbsp;
        </div>

        <div class="center">
          <span class="now-playing">Now Playing</span>
        </div>

        <div>
            <img src="https://521dimensions.com/img/open-source/amplitudejs/examples/dynamic-songs/show-playlist.svg" class="show-playlist" @click="showPlaylist" />
        </div>
      </div>

      <div id="white-player-center">
        <img data-amplitude-song-info="cover_art_url" class="main-album-art"/>

        <div class="song-meta-data">
          <span data-amplitude-song-info="name" class="song-name"></span>
          <span data-amplitude-song-info="artist" class="song-artist"></span>
        </div>

        <div class="time-progress">
          <div id="progress-container">
            <input type="range" class="amplitude-song-slider"/>
            <progress id="song-played-progress" class="amplitude-song-played-progress"></progress>
            <progress id="song-buffered-progress" class="amplitude-buffered-progress" value="0"></progress>
          </div>

          <div class="time-container">
            <span class="current-time">
              <span class="amplitude-current-minutes"></span>:<span class="amplitude-current-seconds"></span>
            </span>
            <span class="duration">
                <span class="amplitude-duration-minutes"></span>:<span class="amplitude-duration-seconds"></span>
              </span>
          </div>
        </div>
      </div>

      <div id="white-player-controls">
        <div class="amplitude-shuffle amplitude-shuffle-off" id="shuffle"></div>
        <div class="amplitude-prev" id="previous"></div>
        <div class="amplitude-play-pause" id="play-pause"></div>
        <div class="amplitude-next" id="next"></div>
        <div class="amplitude-repeat" id="repeat"></div>
      </div>

      <div id="white-player-playlist-container" ref="playlist">
        <div class="white-player-playlist-top">
          <div>
            &nbsp;
          </div>
          <div>
            <span class="queue">Queue</span>
          </div>
          <div>
              <img src="https://521dimensions.com/img/open-source/amplitudejs/examples/dynamic-songs/close.svg" class="close-playlist"  @click="hidePlaylist" />
          </div>
         </div>

        <div class="white-player-up-next">
          Up Next
        </div>

        <div class="white-player-playlist">
          <div class="white-player-playlist-song amplitude-song-container amplitude-play-pause" :data-amplitude-song-index="index"  v-for="(song, index) in playlist" :key="index">
            <img :src="song.cover_art_url"/>

            <div class="playlist-song-meta">
              <span class="playlist-song-name">{{ song.name }}</span>
              <span class="playlist-artist-album">{{ song.artist }}</span>
            </div>
          </div>
        </div>

        <div class="white-player-playlist-controls">
          <img data-amplitude-song-info="cover_art_url" class="playlist-album-art"/>

          <div class="playlist-controls">
            <div class="playlist-meta-data">
                <span data-amplitude-song-info="name" class="song-name"></span>
                <span data-amplitude-song-info="artist" class="song-artist"></span>
            </div>

            <div class="playlist-control-wrapper">
              <div class="amplitude-prev" id="playlist-previous"></div>
              <div class="amplitude-play-pause" id="playlist-play-pause"></div>
              <div class="amplitude-next" id="playlist-next"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'AudioPlayer',
  data() {
    return {
      initialized: true,
      playlist: [
        {
          "name": "Terrain",
          "artist": "pg.lost",
          "album": "Key",
          "url": "https://521dimensions.com/songs/Terrain-pglost.mp3",
          "cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/key.jpg",
        }
      ],
    }
  },
  methods: {
    showPlaylist() {
      this.$refs.playlist.classList.remove('slide-out-top');
      this.$refs.playlist.classList.add('slide-in-top');
      this.$refs.playlist.style.display = "block";
    },
    hidePlaylist() {
      this.$refs.playlist.classList.remove('slide-in-top');
      this.$refs.playlist.classList.add('slide-out-top');
      this.$refs.playlist.style.display = "none";
    },
    addSong(song) {
      this.$amplitude.addSong(song);
      this.$nextTick(() => {
        this.$amplitude.bindNewElements();
        // this.$amplitude.getPlayerState() != "playing" &&
        this.$amplitude.playSongAtIndex(this.playlist.length-1);
      });
    },
  },
  mounted() {
    this.$amplitude.init({ songs: this.playlist });
    this.$amplitude.bindNewElements();
  }
}
</script>
