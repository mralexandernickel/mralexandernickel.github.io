Resume = ($http) ->
  service =
    async: ->
      $http
        method: "get"
        url: "/data/resume.json"
        cache: true

app.service "Resume", Resume
