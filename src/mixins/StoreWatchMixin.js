var StoreWatchMixin = function (store) {
  
  return {
    
    getInitialState: function() {
      return store.getState();
    },

    componentWillMount: function() {
      store.listen(this.onChange);
    },

    componentWillUnmount: function() {
      store.unlisten(this.onChange);
    },

    onChange: function() {
      this.setState(store.getState());
    }
  };
}

module.exports = StoreWatchMixin;