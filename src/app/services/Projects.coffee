Projects = ($http) ->
  service =
    async: ->
      $http
        method: "get"
        url: "/data/projects.json"
        cache: true

app.service "Projects", Projects
