var window = require("window");
var chrome = require("chrome");
var $ = require("$");

var reload_loginCode = function(){
  chrome.storage.sync.get('loginCode', function(item) {
    var loginCode = item.loginCode;
    $("#loginCode").val(loginCode);
  });
};

$(document).ready(function(){
  reload_loginCode();
})

// listen extension.onMessage
chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
  var from = sender.tab ? sender.tab.url : 'extension'
  console.log('----------msg "%s", from "%s"', JSON.stringify(msg), from);

  if (["reload_loginCode"].indexOf(msg.cmd)) {
    console.log('----------update loginCode input');
    reload_loginCode();
    return;
  }
});

