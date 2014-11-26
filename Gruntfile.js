module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            vendors: {
                src: ['web/vendor/build.js']
            },
            build: {
                src: ['web/build/build.js']
            }
        },

        shell: {
            build: {
                command: './node_modules/.bin/component build -c -o web/build',
                options: {
                    stdout: true,
                    failOnError: true
                }
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            vendors: {
                files: {
                    'web/vendor/build.min.js': ['web/vendor/build.js']
                }
            }
        },
        
        concat: {
            options: { separator: ';' },
            vendors: {
                src: [
                    'web/vendor/angular/angular.js',
                    'web/vendor/angular-ui-router/release/angular-ui-router.js'
                ],
                dest: 'web/vendor/build.js'
            }
        },

        jshint: {
            all: ['Gruntfile.js', 'main.js', 'libs/**/*.js']
        },

        connect: {
            server: {
                options: {
                    port: 8000,
                    // hostname: '*'
                    base: 'web'
                }
            }
        },

        watch: {
            rebuild: {
                files: [
                    'main.js', 'component.json',
                    'libs/**/*.js', 'libs/**/*.json', 'libs/**/*.html', 'libs/**/*.css'
                ],
                tasks: ['build'],
                options: {
                    livereload: true
                }
            }
        }

});

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('build', ['clean:build', 'lint', 'shell:build']);
  grunt.registerTask('lint', ['jshint:all']);
  grunt.registerTask('vendors', ['clean:vendors', 'concat:vendors', 'uglify:vendors']);
  grunt.registerTask('default', ['connect:server', 'build', 'watch:rebuild']);

};