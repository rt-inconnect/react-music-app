var React                   = require('react/addons');
var RouteHandler            = require('react-router').RouteHandler;
var Link                    = require('react-router').Link;
var SoundActions            = require('../actions/SoundActions');

var HeaderSearch            = require('./HeaderSearch.jsx');
var HeaderMenu              = require('./HeaderMenu.jsx');

var Header = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  showAllSounds : function(e){
    e.preventDefault();
    SoundActions.loadAllSounds((function(){
       this.context.router.transitionTo('soundListView');
    }).bind(this));
  },

  render : function() {
    return (
      <header className="sq-header">
        <nav className="sq-mainmenu navbar navbar-fixed-top navbar-default">
          <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/" onClick={this.showAllSounds}>Soundquelle</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

            <HeaderSearch/>

            <HeaderMenu/>
          </div>
          </div>
        </nav>
      </header>
    )
  }
});

module.exports = Header;