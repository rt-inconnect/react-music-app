var alt                     = require('../alt');
var SoundActions            = require('../actions/SoundActions');

class SoundStore {
  constructor(){
    this.sounds = [];
    this.currentSound = null;

    this.bindAction(SoundActions.updateCurrentSound, this.onUpdateCurrentSound);
    this.bindAction(SoundActions.updateSounds, this.onUpdateSounds);
  }

  onUpdateCurrentSound(sound){
    this.currentSound = sound;
  }

  onUpdateSounds(sounds){
    this.sounds = sounds;
  }

}

module.exports = alt.createStore(SoundStore, 'SoundStore');