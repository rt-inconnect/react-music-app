var React                   = require('react/addons');
var PlayerActions           = require('../actions/PlayerActions');

var TrackControlsMixin = {

  renderPlayPause: function(sound, playing, playlist) {

    if ((sound.id == playing.id && playing.isPlaying) && playing.loading)
      return (
        <div className="sq-btn-loading btn btn-default btn-circled active" role="button">
          <i className="glyphicon glyphicon-option-horizontal"></i>
        </div>
      );

    if (sound.id == playing.id && playing.isPlaying)
      return (
        <div className="sq-btn-pause btn btn-default btn-circled active" role="button"
          onClick={this._onPause}
        >
          <i className="glyphicon glyphicon-pause"></i>
        </div>
      );
    return (
      <div className="sq-btn-play btn btn-default btn-circled" role="button"
        onClick={()=>{ this._onPlay(sound, playlist) }}
      >
        <i className="glyphicon glyphicon-play"></i>
      </div>
    );
  },

  _onPlay: function(sound, playlist) {
    PlayerActions.play(sound);
    if (playlist) PlayerActions.playlist(playlist);
  },
  _onPause: function() {
    PlayerActions.pause();
  },
  _onForward: function() {
    PlayerActions.forward();
  },
  _onBackward: function() {
    PlayerActions.backward();
  }
};

module.exports = TrackControlsMixin;
