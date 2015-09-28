Listen = 
  p_37wan: ->
    handler = (details)->
      requestHeaders = details.requestHeaders

      return {requestHeaders: requestHeaders}

    filter = 
      urls: ['*://*.dhd.37wan.com/*?logincode=*']

    extraInfoSpec = ['blocking']

    chrome.webRequest.onBeforeRequest.addListener handler, filter, extraInfoSpec

module.exports = Listen
