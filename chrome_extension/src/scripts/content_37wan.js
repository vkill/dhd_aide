var window = require("window");
var chrome = window.chrome;

var document = window.document;

console.log('----------in dhd.37wan.com')

var params = document.getElementsByTagName('param');
var flashVars = params.FlashVars.value;

var regexp = new RegExp("loginCode=([a-z0-9]+)", 'i');
var matched = flashVars.match(regexp);
if (matched) {
  var loginCode = matched[1];
} else {
  var loginCode = null;
}

if (loginCode) {
  var msg = {cmd: 'set_loginCode', loginCode: loginCode};
  chrome.runtime.sendMessage(msg, function(response){
    var result = response.resultl
    console.log('set_loginCode result: %s', result);
  })
}




