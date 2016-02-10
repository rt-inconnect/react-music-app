var React                   = require('react/addons');
var Route                   = require('react-router').Route;
var SoundListView           = require('./components/SoundListView.jsx');
var SingleSoundView         = require('./components/SingleSoundView.jsx');
var App                     = require('./components/App.jsx');

var routes = (
  <Route name='home' path="/" handler={App}>
    <Route name="soundListView" path="/" handler={SoundListView}/>
    <Route name="singleSoundView" path="/sound/:id/:slug" handler={SingleSoundView} />
  </Route>
);

module.exports = routes;