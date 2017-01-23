/**
 * Main
 */

// Require.js allows us to configure shortcut alias
require.config({
  // The shim config allows us to configure dependencies for
  // scripts that do not call define() to register a module
  shim: {
    'socketio': {
      exports: 'io'
    }
  },
  paths: {
    jquery: 'lib/jquery.min',
    socketio: 'lib/socket.io.min',
    bootstrap: 'lib/bootstrap.min'
  }
});

requirejs([
  'jquery',
  'chat',
],
function Main($, ChatController) {
  var chat = new ChatController();
  chat.setupChat();
});
