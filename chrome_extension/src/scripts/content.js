var window = require("window");
var chrome = window.chrome;

var script = document.createElement('script');
script.src = chrome.extension.getURL('scripts/content_37wan.bundle.js');
document.body.appendChild(script);

