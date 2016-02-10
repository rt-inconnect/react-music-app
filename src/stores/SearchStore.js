var alt                     = require('../alt');
var SearchActions           = require('../actions/SearchActions');

class SearchStore {
  constructor(){
    this.items = [];
    this.bindAction(SearchActions.updateItems, this.onUpdateItems);
  }

  onUpdateItems(items){
    this.items = items || [];
  }

}

module.exports = alt.createStore(SearchStore, 'SearchStore');