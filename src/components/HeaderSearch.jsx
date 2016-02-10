var React                   = require('react/addons');
var RouteHandler            = require('react-router').RouteHandler;
var Link                    = require('react-router').Link;

var classNames              = require('classNames');
var config                  = require('../../config');

var SearchStore             = require('../stores/SearchStore');
var SearchActions           = require('../actions/SearchActions');

var StoreWatchMixin         = require('../mixins/StoreWatchMixin');
var DropdownStateMixin      = require('../mixins/DropdownStateMixin');

var typingTimer             = null;

var HeaderSearch = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  mixins: [DropdownStateMixin, StoreWatchMixin(SearchStore)],

  _onKeyUp: function(e) {

    var self = this;
    var val = e.target.value;
    this.setState({criteria:val});
    typingTimer = setTimeout( function () { self._onChange(val) }, 1000);
  },

  _onKeyDown: function() {

    clearTimeout(typingTimer);
  },

  _onChange: function(val) {

    if (val) {
      SearchActions.fetch(val);
      this.setDropdownState(true);
    } else {
      this.setDropdownState(false);
    }
  },

  render : function() {

    var classes = classNames({
      'form-group' : true,
      'dropdown' : true,
      'open': this.state.open
    });

    return (
      <form className="sq-search navbar-form navbar-left" role="search">
        <div className={classes}>
          <input type="text" className="form-control" placeholder="Search..." onKeyUp={this._onKeyUp} onKeyDown={this._onKeyDown}/>
          { this.state.loading ? this.renderLoading() : this.renderItems() }

        </div>
      </form>
    )
  },

  renderItems: function() {

    if (this.state.items.length > 0) {
      return (
        <ul className="dropdown-menu">
          { renderItem() }
        </ul>
      );
    }

    return (
      <ul className="dropdown-menu">
        <li><a href="#">По данному запросу ничего не удалось найти</a></li>
      </ul>
    );

    function renderItem () {
      return this.state.items.map(function(item) {
        var classes = classNames({
          'glyphicon' : true,
          'glyphicon-music' : item.type == 'track',
          'glyphicon-user' : item.type == 'user'
        });
        return (
          <li key={item.id}>
            <a href="#">
              <img src={ config.CDN + item.cover } className="pull-left" />
              <div className="truncate">{ renderName(item.name) }</div>
              <i className={classes}></i>
            </a>
          </li>
        );

      });
    };

    function renderName (name) {
      var regExp = new RegExp(criteria, "ig")
      var match = name.match(regExp) || [];
      name = name.replace(regExp, '<strong>'+match[0]+'</strong>');
      return (<span dangerouslySetInnerHTML={{__html: name}} />);
    };
  },

  renderLoading: function() {
    return (
      <div className="loading">
      <div className="loading-bar"></div>
      <div className="loading-bar"></div>
      <div className="loading-bar"></div>
      <div className="loading-bar"></div>
      <div className="loading-bar"></div>
      </div>
    );
  }
});

module.exports = HeaderSearch;