var window = require("window");
var chrome = require("chrome");
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
var sendMessageToOptions = function(msg, callback){
  var callback = callback || function(response){}

  optionsUrl = chrome.extension.getURL('options.html')
  chrome.tabs.query({url: optionsUrl}, function(tabs){
    if (tabs.length) {
      chrome.tabs.sendMessage(tabs[0].id, msg, callback);
    }
  });
};


chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) { 
  var from = sender.tab ? sender.tab.url : 'extension'
  console.log('----------msg "%s", from "%s"', JSON.stringify(msg), from);

  if (msg.cmd === "set_loginCode") {
    var loginCode = msg.loginCode;
    console.log('----------cmd is set_loginCode, loginCode is "%s"', loginCode);

    chrome.storage.sync.set({'loginCode': loginCode}, function(data) {
      if (chrome.runtime.lastError) {
        // TODO
        return;
      }
    });

    sendResponse({errCode: 0, errMsg: ''});

    sendMessageToOptions({cmd: "reload_loginCode"});
    return;
  }

  sendResponse({errCode: 99, errMsg: 'cmd is null or unknow'});
});
