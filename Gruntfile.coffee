module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON "package.json"
    src_path: "src"
    assets_path: "public/assets"
    haml:
      dist:
        files:
          "public/index.html": ["<%= src_path %>/haml/index.haml"]
    coffee:
      compile:
        files:
          "<%= assets_path %>/js/<%= pkg.name %>.js": ["<%= src_path %>/coffee/*.coffee"]
    less:
      development:
        options:
          paths: ["<%= src_path %>/lib/bootstrap/less","<%= src_path %>/lib/fontawesome/less","<%= src_path %>/less"]
        files:
          "<%= assets_path %>/css/<%= pkg.name %>.css": "<%= src_path %>/less/application.less"
    concat:
      bootstrap:
        src: ["<%= src_path %>/lib/bootstrap/js/transition.js","<%= src_path %>/lib/bootstrap/js/tooltip.js","<%= src_path %>/lib/bootstrap/js/affix.js","<%= src_path %>/lib/bootstrap/js/alert.js","<%= src_path %>/lib/bootstrap/js/button.js","<%= src_path %>/lib/bootstrap/js/carousel.js","<%= src_path %>/lib/bootstrap/js/collapse.js","<%= src_path %>/lib/bootstrap/js/dropdown.js","<%= src_path %>/lib/bootstrap/js/modal.js","<%= src_path %>/lib/bootstrap/js/popover.js","<%= src_path %>/lib/bootstrap/js/scrollspy.js","<%= src_path %>/lib/bootstrap/js/tab.js"]
        dest: "<%= assets_path %>/lib/bootstrap/bootstrap.js"
    copy:
      main:
        files: [
          {expand: true, flatten: true, src: ["<%= src_path %>/img/*"], dest: "<%= assets_path %>/img", filter: 'isFile'}
        ]
    autoprefixer:
      single_file:
        src: "<%= assets_path %>/css/<%= pkg.name %>.css"
        dest: "<%= assets_path %>/css/<%= pkg.name %>.prefixed.css"
    uglify:
      target:
        files:
          "<%= assets_path %>/js/<%= pkg.name %>.min.js": ["<%= assets_path %>/js/<%= pkg.name %>.js"]
    cssmin:
      target:
        files: [
          expand: true
          cwd: "<%= assets_path %>/css"
          src: ["*.css", "!*.min.css"]
          dest: "<%= assets_path %>/css"
          ext: ".min.css"
        ]
  
  grunt.loadNpmTasks "grunt-contrib-haml"
  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-less"
  grunt.loadNpmTasks "grunt-contrib-concat"
  grunt.loadNpmTasks "grunt-contrib-copy"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-contrib-cssmin"
  grunt.loadNpmTasks "grunt-autoprefixer"

  grunt.registerTask "default", ["haml","coffee","less","concat","copy"]