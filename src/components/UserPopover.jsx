var React                   = require('react/addons');
var RouteHandler            = require('react-router').RouteHandler;
var Link                    = require('react-router').Link;
var config                  = require('../../config');

var UserPopover = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState : function() {
    return { isHovered: false, isClosed: true, styles: {} };
  },

  componentDidMount : function() {
    this.setState({styles: this.getRect()});
  },

  render : function() {
    var user = this.props.user;
    var isHovered = this.state.isHovered;

    return (
      <div className="sq-user">
        <a href="#"
          onMouseEnter={this._onMouseEnter}
          onMouseLeave={this._onMouseLeave}
        >
          {user.login}
        </a>
        { isHovered ? this.renderPopover() : ''}
      </div>
    )
  },

  renderPopover : function() {
    var user = this.props.user;
    var styles = this.state.styles;

    return (
      <div className="sq-user-popover popover right" style={styles}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
      >
        <div className="sq-user-popover-arrow arrow"></div>
        <div className="sq-user-popover-content popover-content">
          <div className="sq-user-popover-info">
            <div className="sq-user-popover-info-login">
              {user.login}
              { this.renderOnline(user.online) }
            </div>

            { this.renderListening(user.listening) }
            { this.renderStats(user) }
          </div>
          <img className="img-responsive" src={ config.CDN + user.cover } />
        </div>
      </div>
    );
  },

  renderOnline : function(online) {
    if (online) return ( <i className="sq-user-popover-online" /> );
    return ( <i /> );
  },

  renderListening : function(listening) {
    if (listening) return (
      <div className="sq-user-popover-listening">
        <a href="#"><i className="glyphicon glyphicon-headphones" /> Dead Battery - Die Alone</a>
      </div>
    );
    return (<i />)
  },

  renderStats : function() {
    return (
      <div className="sq-user-popover-stats">
        <i className="glyphicon glyphicon-user" /> 43 / <i className="glyphicon glyphicon-heart" /> 344
      </div>
    );
  },

  getRect : function() {
    var el = this.getDOMNode();

    return {
      top: el.offsetTop + el.offsetHeight / 2 - 100,
      left: el.offsetLeft + el.offsetWidth
    };
  },

  _onMouseEnter : function(e) {
    this.setState({isClosed: false, isHovered: true});
  },

  _onMouseLeave : function(e) {
    setTimeout(() => {
      if (this.state.isClosed) this.setState({isHovered: false});
    },500);
    this.setState({isClosed: true});
  }
});

module.exports = UserPopover;