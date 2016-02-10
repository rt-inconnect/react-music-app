var request                 = require('superagent'),
    config                  = require('../config');

exports.showAllSounds = function(req,res,next){
  request.get(config.baseUrl+'/static/sound.json',function(err,response){
     res.locals.data = {
       "SoundStore" : {
          "sounds" : response.body
       }
     }
     next();
  });
}

exports.loadSoundsViaAjax = function(req,res){
  request.get(config.baseUrl+'/static/sound.json',function(err,response){
    res.json(response.body);
  });
}

exports.showSingleSound = function(req,res,next){
  var id = req.params.id;

  request.get(config.baseUrl+'/static/sound.json',function(err,response){

    var sounds = response.body;

    sounds.forEach(function(sound){
      if(sound.id === parseInt(id,10)){
        res.locals.data = {
          "SoundStore" : {
            "currentSound" : sound
          }
        };
        next();
      }
    });

    next();
  });
}

exports.loadSingleSoundViaAjax = function(req,res){
  var id = req.params.id;
  request.get(config.baseUrl+'/static/sound.json',function(err,response){
    response.body.forEach(function(sound){
      if(sound.id === parseInt(id,10)){
        return res.json(sound);
      }
    });
  });
}