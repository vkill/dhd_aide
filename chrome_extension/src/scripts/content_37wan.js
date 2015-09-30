var window = require("window");
var chrome = require("chrome");

console.log('----------in dhd.37wan.com');

var document = window.document;

var params = document.getElementsByTagName('param');
var flashVars = params.FlashVars.value;
var regexp = new RegExp("loginCode=([a-z0-9]+)", 'i');
var matched = flashVars.match(regexp);
if (matched) {
  var loginCode = matched[1];
} else {
  var loginCode = null;
}

console.log('----------loginCode is "%s"', loginCode);

if (loginCode) {
  var msg = {cmd: 'set_loginCode', loginCode: loginCode};
  chrome.extension.sendMessage(msg, function(response){
    var errCode = response.errCode;
    var errMsg = response.errMsg;
    console.log('----------set_loginCode errCode is "%s", errMsg is "%s"', errCode, errMsg);
  })
}


