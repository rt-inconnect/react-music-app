var React                   = require('react/addons');
var RouteHandler            = require('react-router').RouteHandler;
var Link                    = require('react-router').Link;

var config                  = require('../../config');

var PlayerStore             = require('../stores/PlayerStore');
var SoundActions            = require('../actions/SoundActions');

var SoundVisualiser         = require('./SoundVisualiser.jsx');
var UserPopover             = require('./UserPopover.jsx');

var HelperMixin             = require('../mixins/HelperMixin');
var TrackControlsMixin      = require('../mixins/TrackControlsMixin');
var StoreWatchMixin         = require('../mixins/StoreWatchMixin');

var SoundPreview = React.createClass({

  mixins: [HelperMixin, TrackControlsMixin, StoreWatchMixin(PlayerStore)],

  contextTypes: {
    router: React.PropTypes.func
  },

  progress: null,

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.playing.id != this.props.sound.id) return false;
    return true;
  },

  getRoute : function(){
    return '/sound/' + this.props.sound.id + '/' + this.props.sound.slug;
  },

  loadSound : function(e){
    e.preventDefault();
    var self = this;
    SoundActions.loadSingleSound(this.props.sound.id,function(){
       self.context.router.transitionTo(self.getRoute());
    });
  },

  render : function() {

    var item = this.props.sound;
    var sounds = this.props.sounds;
    var playing = this.state.playing;
    var isPlaying = playing.id == item.id;

    return (
      <article className="sq-sound media">
        <figure className="sq-sound-cover media-left hidden-xs">
          <a href="#"><img className="media-object" src={ config.CDN + item.cover } alt={item.name} /></a>
          <figcaption>{ item.name }</figcaption>
        </figure>
        <div className="sq-sound-body media-body">
          <div className="pull-right">
            <small className="pull-right">{this.moment(item.createdAt)}</small> <br/>
            <a href="#"><small className="pull-right">{item.genre ? item.genre.name : ''}</small></a>
          </div>
          <div className="pull-left sq-sound-btns">
            { this.renderPlayPause(item, playing, sounds) }
          </div>
          <div className="sq-sound-info truncate">
            <h2 className="truncate"><a href={ this.getRoute() } onClick={ this.loadSound }>{item.name}</a></h2>
            <UserPopover user={item.author} />
          </div>
          <div>
            <SoundVisualiser
              data={item.data}
              progress={isPlaying ? playing.progress : 0}
              playing={isPlaying} />
          </div>
        </div>
      </article>
    )
  }
});

module.exports = SoundPreview;