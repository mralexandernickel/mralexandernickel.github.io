app.config ($routeProvider) ->
  $routeProvider
    .when "/",
      controller: "ResumeController"
      templateUrl: "/assets/app/views/resume.html"
    .when "/projects/:repoName",
      controller: "ProjectsController"
      templateUrl: "/assets/app/views/project.html"
    .otherwise
      redirectTo: "/"
