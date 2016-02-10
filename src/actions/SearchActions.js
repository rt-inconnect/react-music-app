var alt                     = require('../alt');
var request                 = require('superagent');
var config                  = require('../../config');

class SearchActions {
  fetch(criteria){
    var self = this;
    request.get(config.baseUrl+'/ajax/search',function(err,response){
      self.actions.updateItems(response.body);
    });
  }

  updateItems(items){
    this.dispatch(items);
  }

}


module.exports = alt.createActions(SearchActions);