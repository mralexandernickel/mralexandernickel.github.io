Skills = ($http) ->
  service =
    async: ->
      $http
        method: "get"
        url: "/data/skills.json"
        cache: true

app.service "Skills", Skills
