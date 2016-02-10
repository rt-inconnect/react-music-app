var React                   = require('react/addons');
var Helmet                  = require('react-helmet');
var RouteHandler            = require('react-router').RouteHandler;
var Link                    = require('react-router').Link;
var SoundStore              = require('../stores/SoundStore');
var SoundPreview            = require('./SoundPreview.jsx');

var StoreWatchMixin         = require('../mixins/StoreWatchMixin');

var SoundListView = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  mixins: [StoreWatchMixin(SoundStore)],

  render : function() {
    var sounds = this.state.sounds;
    var items = sounds.map(function(sound){
       return (
         <SoundPreview key={sound.id} sound={sound} sounds={sounds} />
       )
    });
    return (
      <section>
        <Helmet title="soundquelle | Music portal"/>
        {items}
      </section>
    )
  }
});

module.exports = SoundListView;