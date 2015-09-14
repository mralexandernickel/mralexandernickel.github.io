(function() {
  var ApplicationController;

  ApplicationController = function($scope) {
    setTimeout(function() {
      return new WOW().init();
    }, 500);
    $scope.autoscroll = false;
    return $scope.$on("$routeChangeStart", function(e, next, current) {
      if (next.$$route.controller === "ProjectsController") {
        return $scope.autoscroll = true;
      } else {
        return $scope.autoscroll = false;
      }
    });
  };

  app.controller("ApplicationController", ApplicationController);

}).call(this);

(function() {
  var ContactformController;

  ContactformController = function($scope, $mdToast) {
    $scope.mail_config = {
      mandrill_key: "v5eWq36ZtCNLIOcLxXL5QA",
      recipients: [
        {
          email: "mr.alexander.nickel@gmail.com"
        }
      ]
    };
    $scope.m = new mandrill.Mandrill($scope.mail_config.mandrill_key);
    return $scope.submitHandler = function(form) {
      var mandrill_config;
      console.log(form);
      if (form.$valid) {
        mandrill_config = {
          message: {
            from_name: $scope.data.name + " // " + $scope.data.company,
            from_email: $scope.data.email,
            to: $scope.mail_config.recipients,
            subject: "Kontaktaufnahme per Website",
            text: $scope.data.message
          }
        };
        return $scope.m.messages.send(mandrill_config, function(response) {
          $mdToast.show($mdToast.simple().content("Your Message has been delivered."));
          $scope.data = {};
          return form.$setUntouched();
        });
      } else {
        return $mdToast.show($mdToast.simple().content("Please fill out the Form."));
      }
    };
  };

  app.controller("ContactformController", ContactformController);

}).call(this);

(function() {
  var ProjectsController;

  ProjectsController = function($scope, $routeParams, Projects) {
    var projectIndex;
    projectIndex = $routeParams.projectId - 1;
    return Projects.async().then(function(d) {
      $scope.projects = d.data;
      $scope.project = d.data[projectIndex];
      return console.log($scope.project);
    });
  };

  app.controller("ProjectsController", ProjectsController);

}).call(this);

(function() {
  var ResumeController;

  ResumeController = function($scope, $http, Projects, Skills, Resume) {
    Resume.async().then(function(d) {
      return $scope.resume = d.data;
    });
    Projects.async().then(function(d) {
      return $scope.projects = d.data;
    });
    return Skills.async().then(function(d) {
      return $scope.skills = d.data.skills;
    });
  };

  app.controller("ResumeController", ResumeController);

}).call(this);

(function() {
  app.config(function($routeProvider) {
    return $routeProvider.when("/", {
      controller: "ResumeController",
      templateUrl: "/assets/app/views/resume.html"
    }).when("/project/:projectId", {
      controller: "ProjectsController",
      templateUrl: "/assets/app/views/project.html"
    }).otherwise({
      redirectTo: "/"
    });
  });

}).call(this);

(function() {
  app.config(function($mdThemingProvider) {
    return $mdThemingProvider.theme("darkTheme", "default").primaryPalette("yellow").dark();
  });

}).call(this);

(function() {
  var Resume;

  Resume = function($http) {
    var service;
    return service = {
      async: function() {
        return $http({
          method: "get",
          url: "/data/resume.json",
          cache: true
        });
      }
    };
  };

  app.service("Resume", Resume);

}).call(this);

(function() {
  var Projects;

  Projects = function($http) {
    var service;
    return service = {
      async: function() {
        return $http({
          method: "get",
          url: "/data/projects.json",
          cache: true
        });
      }
    };
  };

  app.service("Projects", Projects);

}).call(this);

(function() {
  var Skills;

  Skills = function($http) {
    var service;
    return service = {
      async: function() {
        return $http({
          method: "get",
          url: "/data/skills.json",
          cache: true
        });
      }
    };
  };

  app.service("Skills", Skills);

}).call(this);
