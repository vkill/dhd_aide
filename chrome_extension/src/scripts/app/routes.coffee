crossroads = require("crossroads")
hasher = require("hasher")
_ = require("lodash")

class Routes
  constructor: () ->
    @crossroads = crossroads
    @hasher = hasher

    @routes = {}
    @helpers = {}

    @handler =
      routed: (request, data)=>
        route = data.route
        params = _.omit(data.params[0], 'request_', 'vals_')
        action = route.name
        
        if @handler[action]
          console.log 'handle %s', action
          @handler[action] params
        else
          @handler['default'] params

      bypassed: (request)->
        console.log 'handle 404, request: %s', request

      default: (params)->
        console.log 'handle default'

  start: =>
    crossroads.normalizeFn = crossroads.NORM_AS_OBJECT
    crossroads.ignoreState = true

    crossroads.bypassed.add (request)=>
      @handler.bypassed request

    crossroads.routed.add (request, data)=>
      @handler.routed request, data

    hasher.prependHash = '!/';

    parseHash = (newHash, oldHash)->
      if newHash is ''
        hasher.replaceHash('home')
      crossroads.parse(newHash)

    hasher.initialized.add parseHash
    hasher.changed.add parseHash
    hasher.init()

  to: (url)=>
    hasher.setHash(url)

  redirectTo: (name, replacements)=>
    url = @helpers[name](replacements)
    @to url
    true

  add: (pattern, name, opts)=>
    route = crossroads.addRoute(pattern)
    if opts and opts.rules
      route.rules = opts.rules
    
    if opts and opts.callback
      route.matched.add opts.callback

    route.name = name

    @routes[name] = route
    @helpers[name] = (replacements)=>
      route.interpolate(replacements)

module.exports = new Routes


