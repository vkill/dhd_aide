var window = require("window");
var chrome = window.chrome;

var $ = require("$");

$(document).ready(function(){

  $('body').on('click', '#open_options_btn', function(event){
    console.log('on click #open_options_btn');

    optionsUrl = chrome.extension.getURL('options.html')
    chrome.tabs.query({url: optionsUrl}, function(tabs){
      if (tabs.length) {
        chrome.tabs.update(tabs[0].id, {active: true});
      }
      else {
        chrome.tabs.create({url: optionsUrl});
      }
    })
  })

})
