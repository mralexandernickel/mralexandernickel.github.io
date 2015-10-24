ApplicationController = ($scope) ->
  setTimeout ->
    new WOW().init()
  , 500
 
  $scope.autoscroll = false

  $scope.mailLink = ->
    protocol = "mailto:"
    account = "mralexandernickel"
    domain = "gmail.com"
    return "#{protocol}#{account}@#{domain}"

  $scope.$on "$routeChangeStart", (e, next, current) ->
    if next.$$route.controller is "ProjectsController"
      $scope.autoscroll = true
    else
      $scope.autoscroll = false

app.controller "ApplicationController", ApplicationController
