var React                   = require('react/addons');
var RouteHandler            = require('react-router').RouteHandler;
var Link                    = require('react-router').Link;
var Header                  = require('./Header.jsx');
var Player                  = require('./Player.jsx');

var App = React.createClass({

  render : function() {
    return (
      <div className="sq-app">
        <Header/>
        <main className="content container" id="content">
          <hr/>
          <RouteHandler />
          <hr/>
        </main>
        <Player/>
      </div>
    )
  }
});

module.exports = App;