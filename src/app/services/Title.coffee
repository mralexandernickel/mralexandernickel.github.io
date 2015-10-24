TitleService = ->
  base = "Alexander Nickel"
  resource = "Portfolio"

  service =
    get: -> "#{base} | #{resource}"
    setBase: (newBase) -> base = newBase
    setResource: (newResource) -> resource = newResource

app.service "Title", TitleService
