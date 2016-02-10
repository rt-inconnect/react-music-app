var moment                  = require('moment');

var HelperMixin = {
  
  moment: function(time) {
    return moment(time).fromNow();
  },

  renderTime: function(value) {
    if (typeof value === 'undefined' || value === null) {
      return '';
    }
    var seconds = moment.duration(value, 'seconds').seconds().toString();
    var minutes = moment.duration(value, 'seconds').minutes().toString();
    seconds = (seconds.length == 1) ? '0' + seconds : seconds;
    minutes = (minutes.length == 1) ? '0' + minutes : minutes;

    return minutes + ':' + seconds;    
  }
};

module.exports = HelperMixin;
