/**
 * Chat controller
 */
define([
  "jquery",
  "socketio"
],
function ChatController($, socketio) {
  /**
   * Ctrl - Chat Controller
   * @constructor
   * @param
   */
  function Ctrl() {
    this.setupChat();
  }

  /**
   * addListeners - bind event listeners
   */
  Ctrl.prototype.setupChat = function setupChat() {
    var messages = [];
    var socket = socketio.connect("http://localhost:3000");
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");

    socket.on("message", function (data) {
        if(data.message) {
            var currentUser = $("#users").data("user");
            var html = "";
            var prefix = "";
            if(data.user == "system"){
              prefix = "";
            }
            else if(currentUser){
              prefix = currentUser + ": ";
            }
            else if(currentUser === undefined){
              prefix = "Anonymous: ";
            }
            messages.push(prefix + data.message);

            for(var i=0; i<messages.length; i++) {
              html += messages[i] + "<br />";
            }
            content.innerHTML = html;
        } else {
            console.log("There is a problem:", data);
        }
    });

    sendButton.onclick = function() {
        var text = field.value;
        socket.emit("send", { message: text });
    };
  };

  return Ctrl;
});
