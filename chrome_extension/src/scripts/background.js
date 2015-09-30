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

    chrome.storage.sync.get('sid', function(items){
      console.log('sid value is "%s"', items['sid']);
    });
  }
});


// chrome.webRequest.onBeforeRequest.addListener(function(details){
//   console.log('onBeforeRequest');

//   // var url = details.url;
  
//   // console.log(url);

//   // var uri = new URI(url);
//   // var query_obj = URI.parseQuery(uri.query());
//   // var sid = query_obj.sid;

//   // if (sid) {
//   //   chrome.storage.sync.set({'sid': sid}, function() {
//   //     console.log('sid saved');
//   //   });
//   // }

//   return {cancel: false};
// }, { urls: ["<all_urls>"] }, ["blocking"]);

