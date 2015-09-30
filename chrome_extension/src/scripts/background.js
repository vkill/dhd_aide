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

    chrome.storage.sync.get('loginCode', function(items){
      console.log('loginCode value is "%s"', items['loginCode']);
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

    console.log('cmd is set_loginCode, loginCode is "%s"', loginCode);

    chrome.storage.sync.set({'loginCode': loginCode}, function(data) {
      if (chrome.runtime.lastError) {
        return;
      }        
    });

    sendResponse({errCode: 0, errMsg: ''});
    return;
  }

  sendResponse({errCode: 99, errMsg: 'cmd is null or unknow'});
});
