var alt                     = require('../alt');

class PlayerActions {
  init() {
    this.dispatch();
  }

  play(sound) {
    this.dispatch(sound);
  }

  pause() {
    this.dispatch();
  }

  forward() {
    this.dispatch();
  }

  backward() {
    this.dispatch();
  }

  seek(position) {
    this.dispatch(position);
  }

  volume(volume) {
    this.dispatch(volume);
  }

  mute() {
    this.dispatch();
  }

  repeat() {
    this.dispatch()
  }

  shuffle() {
    this.dispatch()
  }

  changeProgress(progress) {
    this.dispatch(progress);
  }

  playlist(playlist) {
    this.dispatch(playlist);
  }

}


module.exports = alt.createActions(PlayerActions);