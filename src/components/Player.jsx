var React                   = require('react/addons');
var RouteHandler            = require('react-router').RouteHandler;
var Link                    = require('react-router').Link;

var config                  = require('../../config');

var PlayerVolume            = require('./PlayerVolume.jsx');
var PlayerSeek              = require('./PlayerSeek.jsx');
var PlayerPlaylist          = require('./PlayerPlaylist.jsx');

var PlayerStore             = require('../stores/PlayerStore');
var PlayerActions           = require('../actions/PlayerActions');

var HelperMixin             = require('../mixins/HelperMixin');
var TrackControlsMixin      = require('../mixins/TrackControlsMixin');
var StoreWatchMixin         = require('../mixins/StoreWatchMixin');

var Player = React.createClass({

  mixins: [HelperMixin, TrackControlsMixin, StoreWatchMixin(PlayerStore)],

  contextTypes: {
    router: React.PropTypes.func
  },

  render : function() {

    var playing = this.state.playing;
    var volume = this.state.volume;
    var muted = this.state.muted;
    var repeat = this.state.repeat;
    var shuffle = this.state.shuffle;

    if (!playing.id) {
      return (<footer/>)
    }

    return (
      <footer className="sq-player">

        <div className="sq-control-btns pull-left">
          <div className="btn" onClick={this._onBackward}>
            <i className="glyphicon glyphicon-step-backward"></i>
          </div>
          {this.renderPlayPause(playing, playing)}
          <div className="btn" onClick={this._onForward}>
            <i className="glyphicon glyphicon-step-forward"></i>
          </div>
        </div>

        <PlayerVolume volume={volume} muted={muted} classes="sq-volume pull-left hidden-xs" />

        <PlayerSeek sound={playing} classes='sq-seek pull-left' />

        { this.renderInfo() }


        <div className="sq-ext-btns pull-right hidden-xs">
          
          <div
            role="button"
            className={ shuffle ? 'active' : '' }
            onClick={ this._onShuffle }
          >
            <i className="sq-btn-shuffle glyphicon glyphicon-random"></i>
          </div>
          
          <div
            role="button"
            className={ repeat ? 'active' : '' }
            onClick={ this._onRepeat }
          >
            <i className="sq-btn-repeat glyphicon glyphicon-retweet"></i>
          </div>
        </div>


      </footer>
    );
  },

  renderInfo() {

    var playing = this.state.playing;
    var playlist = this.state.playlist;

    return (
      <div className="sq-player-info pull-right hidden-xs">

        <PlayerPlaylist playing={playing} playlist={playlist} />
        
        <div className="media">
          <div className="media-left">
            <a href="#"><img className="media-object" src={ config.CDN + playing.cover }/></a>
          </div>
          <div className="media-body">
            <a href="#" className="media-heading truncate">{playing.name}</a> <br/>
            <a href="#" className="truncate">{playing.author.login}</a>
          </div>
        </div>
      </div>
    )
  },

  _onShuffle : function() {
    PlayerActions.shuffle();
  },

  _onRepeat : function() {
    PlayerActions.repeat();
  }

});

module.exports = Player;