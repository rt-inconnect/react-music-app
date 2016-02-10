var alt                     = require('../alt');
var PlayerActions           = require('../actions/PlayerActions');

var config                  = require('../../config');

class PlayerStore {
  constructor(){
    this.playing = {};
    this.playlist = [];
    this.volume = 100;
    this.muted = false;
    this.shuffle = false;
    this.repeat = false;
    this.errorMessage = null;

    if (typeof soundManager !== 'undefined') this.onInit();
    
    this.bindAction(PlayerActions.init, this.onInit);
    this.bindAction(PlayerActions.play, this.onPlay);
    this.bindAction(PlayerActions.pause, this.onPause);
    this.bindAction(PlayerActions.playlist, this.onPlaylist);
    this.bindAction(PlayerActions.forward, this.onForward);
    this.bindAction(PlayerActions.backward, this.onBackward);
    this.bindAction(PlayerActions.seek, this.onSeek);
    this.bindAction(PlayerActions.volume, this.onVolume);
    this.bindAction(PlayerActions.mute, this.onMute);
    this.bindAction(PlayerActions.repeat, this.onRepeat);
    this.bindAction(PlayerActions.shuffle, this.onShuffle);
    this.bindAction(PlayerActions.changeProgress, this.onChangeProgress);
  }

  onInit() {
    console.log('sm2 initialized!');
    var self = this;

    soundManager.setup({
      debugMode: false,
      defaultOptions: {
        whileplaying() { whileplaying(this) },
        onfinish() { onfinish(this) },
        onbufferchange() { onbufferchange(this) }
      }
    });

    var whileplaying = function (sm) {
      var position = Math.floor(sm.position/1000);
      if (self.playing.position != position) {
        self.playing.position = position;
        self.playing.progress = ((sm.position / sm.duration) * 100);
        self.emitChange();
      }
    };

    var onfinish = function (sm) {
      if (self.repeat) return self.onPlay(self.playing);
      self.onForward();
    };

    var onbufferchange = function (sm) {
      self.playing.loading = sm.isBuffering;
      self.emitChange();
    };

  }

  onPlay(sound) {
    if (this.playing.isPlaying) this.unloadPlaying();
    this.playing = this.parseSound(sound);
    this.playing.isPlaying = true;
    this.createSound();
    soundManager.play(this.playing.id);
  }

  onPause() {
    soundManager.pause(this.playing.id);
    this.playing.isPlaying = false;
  }

  onPlaylist(playlist) {
    this.playlist = this.parsePlaylist(playlist);
    this.fillPlaylist(playlist.sounds || playlist);
  }

  onForward() {
    if (this.playlist.sounds) {
      var index = this.playlist.sounds.map(function(o) { return o.id; }).indexOf(this.playing.id);
      var nextIndex = index + 1;
      if (index === this.playlist.sounds.length - 1) nextIndex = 0;
      if (this.shuffle) nextIndex = this.getRandom(this.playlist.sounds.length - 1);
      this.onPlay(this.playlist.sounds[nextIndex]);
    }
  }

  onBackward() {
    if (this.playlist.sounds) {
      var index = this.playlist.sounds.map(function(o) { return o.id; }).indexOf(this.playing.id);
      var prevIndex = index - 1;
      if (index === 0) prevIndex = this.playlist.sounds.length - 1;
      this.onPlay(this.playlist.sounds[prevIndex]);
    }
  }

  onSeek(position) {
    if (!this.playing.id) return false;
    var sound = soundManager.getSoundById(this.playing.id);
    var duration = sound.durationEstimate;
    sound.setPosition(position * duration);
  }

  onVolume(volume) {
    this.volume = volume;
    for (var i = 0; i < soundManager.soundIDs.length; i++) {
      soundManager.getSoundById(soundManager.soundIDs[i]).setVolume(this.volume);
    }
    if (soundManager.muted) this.onMute(true);
  }

  onMute(unmute) {
    if (soundManager.muted || unmute) {
      soundManager.unmute();
    } else {
      soundManager.mute();
    }
    this.muted = soundManager.muted;
  }

  onRepeat() {
    this.repeat = !this.repeat;
  }

  onShuffle() {
    this.shuffle = !this.shuffle;
  }

  onChangeProgress(progress) {
    this.playing.progress = progress;
  }

  createSound(id, url, volume) {
    soundManager.createSound({
      id: this.playing.id,
      url: config.CDN + this.playing.converted,
      volume: this.volume
    });
  }

  unloadPlaying() {
    this.playing.isPlaying = false;
    this.playing.progress = 0;
    this.emitChange();
    soundManager.stopAll();
    soundManager.unload(this.playing.id);
  }

  parseSound(sound) {
    return {
      id: sound.id,
      cover: sound.cover,
      name: sound.name,
      converted: sound.converted,
      duration: sound.duration,
      position: 0,
      progress: 0,
      numPlays: sound.numPlays,
      bitrate: sound.bitrate,
      author: {
        login: sound.author ? sound.author.login : '',
        cover: sound.author ? sound.author.cover : ''
      }
    };
  }

  parsePlaylist(playlist) {
    return {
      id: playlist.id || '',
      name: playlist.name || '',
      cover: playlist.cover || '',
      author: playlist.author || {},
      sounds: []
    };
  }

  fillPlaylist(sounds) {
    for (var i = 0; i < sounds.length; i++) {
      this.playlist.sounds.push(this.parseSound(sounds[i]));
    }
  }

  getRandom(max) {
    return Math.floor(Math.random() * (max - 0 + 1)) + 0;
  }

}

module.exports = alt.createStore(PlayerStore, 'PlayerStore');