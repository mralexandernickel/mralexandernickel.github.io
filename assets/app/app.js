(function() {
  var ApplicationController;

  ApplicationController = function($scope) {
    setTimeout(function() {
      return new WOW().init();
    }, 500);
    $scope.autoscroll = false;
    $scope.mailLink = function() {
      var account, domain, protocol;
      protocol = "mailto:";
      account = "mralexandernickel";
      domain = "gmail.com";
      return "" + protocol + account + "@" + domain;
    };
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
  var HeadController;

  HeadController = function($scope, Title) {
    return $scope.title = Title;
  };

  app.controller("HeadController", HeadController);

}).call(this);

(function() {
  var ProjectsController;

  ProjectsController = function($scope, $routeParams, Projects, $http, $sce, Title) {
    var __construct, getBranches, getData, getMarkdown, getRepo, md2html;
    __construct = function() {
      return getData();
    };
    $scope.showRepo = function() {
      return window.open("http://github.com/mralexandernickel/" + $scope.project.github, "_blank");
    };
    $scope.showDemo = function() {
      return window.open("http://mralexandernickel.github.io/" + $scope.project.github, "_blank");
    };
    $scope.goBack = function() {
      return window.history.back();
    };
    md2html = function(md) {
      var converter;
      converter = new showdown.Converter();
      return converter.makeHtml(md);
    };
    getMarkdown = function(repo) {
      return $http.get("https://raw.githubusercontent.com/mralexandernickel/" + repo + "/master/PROJECT.md").success(function(d) {
        return $scope.description = $sce.trustAsHtml(md2html(d));
      });
    };
    getBranches = function() {
      return $http.get("https://api.github.com/repos/mralexandernickel/" + $scope.project.github + "/branches").success(function(d) {
        var ghPages;
        ghPages = d.filter(function(branch) {
          return branch.name === "gh-pages";
        });
        if (ghPages.length > 0) {
          return $scope.demo = true;
        }
      });
    };
    getRepo = function() {
      return $http.get("https://api.github.com/repos/mralexandernickel/" + $scope.project.github).success(function(d) {
        return $scope.project.subtitle = d.description;
      });
    };
    getData = function() {
      return Projects.async().then(function(d) {
        $scope.project = d.data.filter(function(project) {
          return project.github === $routeParams.repoName;
        })[0];
        Title.setResource($scope.project.title);
        if ($scope.project.github != null) {
          getMarkdown($scope.project.github);
        }
        getRepo();
        return getBranches();
      });
    };
    return __construct();
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
    }).when("/projects/:repoName", {
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

(function() {
  var TitleService;

  TitleService = function() {
    var base, resource, service;
    base = "Alexander Nickel";
    resource = "Portfolio";
    return service = {
      get: function() {
        return base + " | " + resource;
      },
      setBase: function(newBase) {
        return base = newBase;
      },
      setResource: function(newResource) {
        return resource = newResource;
      }
    };
  };

  app.service("Title", TitleService);

}).call(this);
