var React                   = require('react/addons');
var Helmet                  = require('react-helmet');
var SoundStore              = require('../stores/SoundStore');

var SoundPreview            = require('./SoundPreview.jsx');

var StoreWatchMixin         = require('../mixins/StoreWatchMixin');

var SingleSoundView = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  mixins: [StoreWatchMixin(SoundStore)],

  render : function() {
    return (
      <div>
        <Helmet title={'soundquelle | ' + this.state.currentSound.name}/>
        <SoundPreview key={this.state.currentSound.id} sound={this.state.currentSound} sounds={false} />
      </div>
    )
  }
});

module.exports = SingleSoundView;