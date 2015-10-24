ResumeController = ($scope, $http, Projects, Skills, Resume) ->
  Resume.async().then (d) -> $scope.resume = d.data
  Projects.async().then (d) -> $scope.projects = d.data
  Skills.async().then (d) -> $scope.skills = d.data.skills

app.controller "ResumeController", ResumeController
