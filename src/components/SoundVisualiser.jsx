var React                   = require('react/addons');
var PlayerActions           = require('../actions/PlayerActions');

var SoundVisualiser = React.createClass({

  selectedArea: 0,

  max : function(data) {
    return Math.max.apply(null, data);
  },

  componentDidMount : function() {
    window.addEventListener('resize', this.visualise);
    this.visualise();
  },

  componentWillUnmount : function() {
    window.removeEventListener('resize', this.visualise);
  },

  componentWillReceiveProps : function() {
    this.visualise();
  },

  shouldComponentUpdate : function(nextProps) {
    return parseInt(nextProps.progress) !== parseInt(this.props.progress);
  },

  render : function() {

    return (
      <canvas
        className="Visualiser"
        onMouseMove  = { this._onMouseMove }
        onMouseLeave = { this._onMouseLeave }
        onMouseDown  = { this._onMouseDown }
      >
      </canvas>
    )
  },

  _onMouseMove : function(e) {
    if (this.props.playing) {
      var x = e.nativeEvent.offsetX || e.nativeEvent.layerX;
      var width = e.nativeEvent.target.clientWidth;
      this.selectedArea = x / width * this.props.data.length;
      this.visualise();
    }
  },

  _onMouseLeave : function(e) {
    if (this.props.playing) {
      this.selectedArea = 0;
      this.visualise();
    }
  },

  _onMouseDown : function(e) {
    if (this.props.playing) PlayerActions.seek(this.selectedArea / this.props.data.length);
  },

  visualise : function() {
    var ctx = this.getDOMNode().getContext('2d');
    var data = this.props.data;

    var area = {
      color: "rgba(0, 0, 0, 0)",
      width: this.getDOMNode().parentNode.offsetWidth,
      height: 100
    };

    var bar = {
      color: "#8C8C8C",
      progressColor: "#f50",
      selectedColor: "#DA4D07",
      margin: 1,
      total: data.length,
      ratio: 0,
      width: 0,
      height: 0,
      maxValue: 0
    };

    var reflection = {
      color: "#C6C6C6",
      progressColor: "#FFC9AE",
      selectedColor: "#FF8D54",
      height: 20
    };

    ctx.clearRect(0, 0, area.width, area.height);

    // Update the dimensions of the canvas only if they have changed
    if (ctx.canvas.width !== area.width || ctx.canvas.height !== area.height) {
      ctx.canvas.width = area.width;
      ctx.canvas.height = area.height;
    }

    // Draw the background color
    ctx.fillStyle = area.color;
    ctx.fillRect(0, 0, area.width, area.height);

    // Calculate dimensions of the bar
    bar.width = area.width / bar.total - bar.margin * 2;

    // For each bar
    for (var i = 0; i < bar.total; i++) {
      // Set the ratio of current bar compared to the maximum
      bar.ratio = data[i] / this.max(data);
      bar.height = bar.ratio * (area.height - reflection.height);

      // Draw bar background
      var color = 'color';
      if (i < ((bar.total*this.props.progress) / 100)) color = 'progressColor';
      if (i < this.selectedArea) color = 'selectedColor';
      ctx.fillStyle = bar[color];
      ctx.fillRect(
      bar.margin + i * area.width / bar.total,
      (area.height - reflection.height) - bar.height,
      bar.width,
      bar.height
      );

      ctx.fillStyle = reflection[color];
      ctx.fillRect(
      bar.margin + i * area.width / bar.total,
      area.height - reflection.height + 1,
      bar.width,
      bar.height / 3
      );
    }
  
  }

});

module.exports = SoundVisualiser;