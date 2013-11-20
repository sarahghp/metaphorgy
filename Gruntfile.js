var hbsfy = require("hbsfy"),
    config = require("./src/config/config.js");

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      development: {
        files: {
          './src/public/build/js/app.min.js': './src/assets/js/app.js'
        },

        options: {
          debug: true,
          external: ['backbone'],
          transform: ['hbsfy']
        }
      },
      production: {
        files: {
          './src/public/build/js/app.min.js': './src/assets/js/app.js'
        },

        options: {
          transform: ['hbsfy']
        }
      }
    },

    uglify: {
      production: {
        options: {
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */',
          dead_code: true
        },

        files: {
          './src/public/build/js/app.min.js': ['./src/public/build/js/app.min.js']
        }
      }
    },

    less: {
      development: {
        options: {
          paths: ["./src/assets/css"]
        },
        files: {
          "./src/public/build/css/app.css": "./src/assets/css/app.less"
        }
      },
      production: {
        options: {
          paths: ["./src/assets/css"],
          compress: true
        },
        files: {
          "./src/public/build/css/app.css": "./src/assets/css/app.less"
        }
      }
    },

    watch: {
      scripts: {
        files: './src/assets/js/**/*.js',
        tasks: ['browserify:development'],
        options: {
          interrupt: true
        }
      },
      templates: {
        files: './src/templates/**/*.hbs',
        tasks: ['browserify:development'],
        options: {
          interrupt: true
        }
      },
      stylesheets: {
        files: './src/assets/css/**/*.less',
        tasks: ['less:development'],
        options: {
          interrupt: true
        }
      }
    },

    nodemon: {
      development: {
        options: {
          file: 'src/server.js',
          cwd: __dirname
        }
      }
    },

    concurrent: {
      development: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('default', ['browserify:development', 'less:development']);
  grunt.registerTask('production', ['browserify:production', 'uglify:production', 'less:production']);
  grunt.registerTask('watch-build', ['concurrent:development']);
};

