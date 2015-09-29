var window = require("window");
var chrome = window.chrome;

var $ = require("$")
var URI = require("URI");

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


chrome.webRequest.onBeforeRequest.addListener(function(details){
  console.log('on request 37wan.com login path');

  var url = details.url;
  
  console.log(url);
  $('#log').append("<p>" + url + "</p>");

  var uri = new URI(url);
  var query_obj = URI.parseQuery(uri.query);
  var logincode = query_obj.logincode;

  if (logincode) {
    chrome.storage.sync.set({'logincode': logincode}, function() {
      message('Settings saved');
    });
  }

  return {cancel: false};
}, { urls: ["<all_urls>"] }, ["blocking"]);

