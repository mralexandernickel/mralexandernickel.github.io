ProjectsController = ($scope, $routeParams, Projects, $http, $sce, Title) ->

  __construct = ->
    getData()

  $scope.showRepo = ->
    ga "send", "event", "Project", "Show Repository", $scope.project.title
    window.open "http://github.com/mralexandernickel/#{$scope.project.github}", "_blank"

  $scope.showDemo = ->
    ga "send", "event", "Project", "Show Demo", $scope.project.title
    window.open "http://mralexandernickel.github.io/#{$scope.project.github}", "_blank"

  $scope.goBack = -> window.history.back()

  md2html = (md) ->
    converter = new showdown.Converter()
    converter.makeHtml md

  getMarkdown = (repo) ->
    $http
      .get "https://raw.githubusercontent.com/mralexandernickel/#{repo}/master/PROJECT.md"
      .success (d) ->
        $scope.description = $sce.trustAsHtml md2html d

  getBranches = ->
    $http
      .get "https://api.github.com/repos/mralexandernickel/#{$scope.project.github}/branches"
      .success (d) ->
        ghPages = d.filter (branch) -> branch.name is "gh-pages"
        if ghPages.length > 0
          $scope.demo = true

  getRepo = ->
    $http
      .get "https://api.github.com/repos/mralexandernickel/#{$scope.project.github}"
      .success (d) ->
        $scope.project.subtitle = d.description

  getData = ->
    Projects.async().then (d) ->
      #$scope.projects = d.data
      $scope.project = d.data.filter((project) -> project.github is $routeParams.repoName)[0]
      Title.setResource $scope.project.title
      if $scope.project.github?
        getMarkdown $scope.project.github
      getRepo()
      getBranches()
      #console.log $scope.project
  
  __construct()

app.controller "ProjectsController", ProjectsController
