var alt                     = require('../alt');
var request                 = require('superagent');
var config                  = require('../../config');

class SoundActions {
  loadAllSounds(cb){
    var self = this;
    request.get(config.baseUrl+'/ajax/sounds',function(err,response){
      self.actions.updateSounds(response.body);
      if(cb){
        cb();
      }
    });
  }

  loadSingleSound(id,cb){
    var self = this;
    request.get(config.baseUrl+'/ajax/sound/'+id,function(err,response){
      self.actions.updateCurrentSound(response.body);
      if(cb){
        cb();
      }
    });
  }

  updateSounds(sounds){
    this.dispatch(sounds);
  }

  updateCurrentSound(sound){
    this.dispatch(sound);
  }
}


module.exports = alt.createActions(SoundActions);