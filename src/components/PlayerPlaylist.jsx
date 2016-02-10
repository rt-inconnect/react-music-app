var React                   = require('react/addons');
var classNames              = require('classNames');
var PlayerActions           = require('../actions/PlayerActions');

var TrackControlsMixin      = require('../mixins/TrackControlsMixin');

var PlayerPlaylist = React.createClass({

  mixins: [TrackControlsMixin],

  contextTypes: {
    router: React.PropTypes.func
  },

  render : function() {

    var self = this;
    var playing = this.props.playing;
    var playlist = this.props.playlist;

    var list = playlist.sounds.map(function (sound, key) {
      return self.renderSound(sound, key, playing.id);
    });

    return (
      <div className="sq-playlist">
        <h3>Default playlist</h3>
        <ul className="list-group" id="sq-playlist" onWheel={this._onWheel}>{ list }</ul>
      </div>
    );
  },

  renderSound : function (sound, key, playingId) {

    var classes = classNames({
    'list-group-item'     : true,
    'playing'             : sound.id == playingId
    });

    return (
      <li className={classes}
        data-id={key}
        key={key}
        draggable="true"
        onDragStart={this._onDragStart}
        onDragEnd={this._onDragEnd}
      >
        <div className="sq-playlist-sound-name truncate"
          onClick={()=>{ this._onPlay(sound) }} role="button"
          title={ sound.name }
        >
          { sound.name }
        </div>

        <div className="sq-playlist-btn-del btn btn-xs" role="button">
          <i className="glyphicon glyphicon-remove" />
        </div>
      </li>

    );
  },

  _onWheel : function (e) {
    document.getElementById('sq-playlist').scrollTop -= e.nativeEvent.wheelDeltaY;
    e.preventDefault();
  }

});

module.exports = PlayerPlaylist;