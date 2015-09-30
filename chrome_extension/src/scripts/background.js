var window = require("window");
var chrome = window.chrome;

var $ = require("$")
var URI = require("URI");

// 
// listen storage.onChanged
// 
chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (key in changes) {
    var storageChange = changes[key];
    console.log('Storage key "%s" in namespace "%s" changed. ' +
                'Old value was "%s", new value is "%s".',
                key,
                namespace,
                storageChange.oldValue,
                storageChange.newValue);

    chrome.storage.sync.get('sid', function(items){
      console.log('sid value is "%s"', items['sid']);
    });
  }
});


// 
// listen webRequest.onBeforeRequest
// 
chrome.webRequest.onBeforeRequest.addListener(function(details){
  console.log('onBeforeRequest');

  var url = details.url;  
  console.log(url);

  return {cancel: false};
}, { urls: ["<all_urls>"] }, ["blocking"]);



// 
// listen extension.onMessage
// 
chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) { 
  if (msg.cmd === "set_loginCode") {
    var loginCode = msg.loginCode;

    var result = '0';
    chrome.storage.sync.set({'loginCode': loginCode}, function() {
      result = '1';
      console.log('loginCode saved');
    });
    var body = {result : result};
    sendResponse(body);
  }
});
