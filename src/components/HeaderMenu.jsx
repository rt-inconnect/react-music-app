var React                   = require('react/addons');
var RouteHandler            = require('react-router').RouteHandler;
var Link                    = require('react-router').Link;

var HeaderMenu = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  render : function() {
    return (
      <ul className="sq-navbar nav navbar-nav navbar-right">
        <li><a href="#" title="Added tracks"><i className="glyphicon glyphicon-cloud-upload"></i> Added tracks</a></li>
        <li><a href="#" title="My playlists"><i className="glyphicon glyphicon-list"></i> My playlists</a></li>
        <li><a href="#" title="Logout"><i className="glyphicon glyphicon-off"></i> Logout</a></li>
      </ul>
    )
  }
});

module.exports = HeaderMenu;