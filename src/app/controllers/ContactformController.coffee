ContactformController = ($scope, $mdToast) ->
  $scope.mail_config =
    mandrill_key: "v5eWq36ZtCNLIOcLxXL5QA"
    recipients: [
      {email: "mr.alexander.nickel@gmail.com"}
    ]

  $scope.m = new mandrill.Mandrill $scope.mail_config.mandrill_key

  $scope.submitHandler = (form)->
    console.log form
    if form.$valid
      mandrill_config =
        message:
          from_name: "#{$scope.data.name} // #{$scope.data.company}"
          from_email: $scope.data.email
          to: $scope.mail_config.recipients
          subject: "Kontaktaufnahme per Website"
          text: $scope.data.message
      $scope.m.messages.send mandrill_config, (response) ->
        $mdToast.show $mdToast.simple().content("Your Message has been delivered.")
        $scope.data = {}
        form.$setUntouched()
    else
      $mdToast.show $mdToast.simple().content("Please fill out the Form.")

app.controller "ContactformController", ContactformController
