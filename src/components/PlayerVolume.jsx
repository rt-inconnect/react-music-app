var React                   = require('react/addons');
var PlayerActions           = require('../actions/PlayerActions');

var PlayerVolume = React.createClass({

  dragging: false,

  wheeling: false,

  render : function() {

    var volume = this.props.volume;
    var classes = this.props.classes;
    var bgStyle  = { height: this.dragging ? 100 - this.state.bottom + '%' : 100 - volume + '%' };
    var btnStyle = { bottom: this.dragging ? this.state.bottom + '%' : volume + '%' };

    return (
      <div className={classes} onWheel={this._onVolumeWheel}>
        <div role="button" className="sq-btn-mute btn" onClick={ this._onMute }>
          { this.renderVolumeIcons() }
        </div>
        <div className="sq-volume-wrapper" id="player-volume"
          onMouseMove={ this._onVolumeMouseMove }
          onMouseUp={this._onVolumeMouseUp}
        >
          <div className="sq-volume-out">
            <div className="sq-volume-in" style={ bgStyle }>
              <div className="sq-btn-volume" draggable="false" style={ btnStyle }
                onDragStart={()=>{ return false; }}
                onMouseDown={()=>{ this._onVolumeDragStart(volume) }}
              >
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  renderVolumeIcons : function() {
    var volume = this.props.volume;
    var muted = this.props.muted;
    if (muted) return (<i className="glyphicon glyphicon-volume-off"></i>);
    if (volume > 50) return (<i className="glyphicon glyphicon-volume-up"></i>);
    return (<i className="glyphicon glyphicon-volume-down"></i>);
  },

  _onVolumeWheel : function(e) {
    var volume = this.props.volume;
    var increment = true;
    //console.log(e.deltaMode, e.deltaX, e.deltaY, e.deltaZ);
    //var wheel = e.nativeEvent.wheelDelta || e.nativeEvent.detail*(-1);
    if (e.deltaY > 0) increment = false;
    if (increment) { volume += 10; } else { volume -= 10; }
    if (volume > 100) volume = 100;
    if (volume < 0) volume = 0;    
    PlayerActions.volume(volume);
    e.preventDefault();
  },

  _onVolumeDragStart : function(volume) {
    this.setState({bottom:volume});
    this.dragging = true;
  },

  _onVolumeMouseMove : function(e) {
    //var target = e.nativeEvent.target || e.nativeEvent.srcElement;
    //console.log(target, e.target);
    if (this.dragging && e.target.id == 'player-volume') {
      var bottom = this.calcBottom(e);
      if (bottom > 0 && bottom < 100) {
        this.setState({bottom:bottom});
      }
    }
  },

  _onVolumeMouseUp : function(e) {
    if (this.dragging) {
      PlayerActions.volume(this.state.bottom);
    } else {
      var bottom = this.calcBottom(e);
      if (bottom > 0 && bottom < 100) PlayerActions.volume(bottom);
    }
    this.dragging = false;
  },

  _onMute : function(e) {
    PlayerActions.mute();
  },

  calcBottom : function(e) {
    var y = e.nativeEvent.offsetY || e.nativeEvent.layerY;
    var height = e.target.clientHeight;
    return height - y - 10;
  }
});

module.exports = PlayerVolume;