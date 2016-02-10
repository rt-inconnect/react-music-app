var React                   = require('react/addons');
var PlayerActions           = require('../actions/PlayerActions');
var HelperMixin             = require('../mixins/HelperMixin');

var PlayerSeek = React.createClass({

  mixins: [HelperMixin],

  dragging: false,

  wheeling: false,

  render : function() {

    var sound = this.props.sound;
    var classes = this.props.classes;
    var seekStyle = { width: this.dragging ? this.state.width + '%' : sound.progress + '%' };

    return (
      <div className={classes}>
        <small className="pull-left">{this.renderTime(sound.position)}</small>
        <div className="sq-seek-wrapper" id="player-seek"
          onMouseUp={this._onSeekMouseUp}
          onMouseMove={this._onSeekMouseMove}
        >
          <div className="sq-seek-out">
            <div className="sq-seek-in" style={seekStyle}>
              <div className="sq-btn-seek" draggable="false"
                onDragStart={()=>{ return false; }}
                onMouseDown={()=>{ this._onSeekDragStart(sound.progress) }}
              >
              </div>
            </div>
          </div>
        </div>
        <small className="pull-right">{this.renderTime(sound.duration)}</small>
      </div>
    );
  },

  _onSeekDragStart(sound) {
    this.setState({width:sound.progress});
    this.dragging = true;
  },

  _onSeekMouseMove(e) {
    //var target = e.nativeEvent.target || e.nativeEvent.srcElement;
    if (this.dragging && e.target.id == 'player-seek') {
      var x = e.nativeEvent.offsetX || e.nativeEvent.layerX;
      var width = e.target.clientWidth;
      this.setState({width:x/width * 100});
    }
  },

  _onSeekMouseUp(e) {
    if (this.dragging) {
      PlayerActions.changeProgress(this.state.width);
      PlayerActions.seek(this.state.width/100);
    } else {
      var x = e.nativeEvent.offsetX || e.nativeEvent.layerX;
      var width = e.target.clientWidth;
      PlayerActions.seek(x / width);
    }
    this.dragging = false;
  }
});

module.exports = PlayerSeek;