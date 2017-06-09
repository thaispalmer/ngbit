module.exports = function(grunt) {
    //noinspection JSUnusedGlobalSymbols
    grunt.initConfig({
        /**
         * Grab data from package.json
         */
        pkg: require('./package.json'),

        /**
         * JSHint task to verify code quality
         */
        jshint: {
            source: ['src/**/*.js']
        },

        /**
         * Task for generating the template files
         */
        html2js: {
            options: {
                useStrict: true,
                module: 'ngBit.templates',
                rename: function (moduleName) {
                    return 'ngBit/' + moduleName.split('/').pop();
                }
            },
            templates: {
                src: ['src/**/*.html'],
                dest: 'tmp/templates.js'
            }
        },

        /**
         * Task for concatenating files
         */
        concat: {
            options: {
                separator: ';',
                sourceMap: false
            },
            components: {
                src: [
                    'src/**/*.js',
                    '!src/ngbit.js'
                ],
                dest: 'tmp/components.js'
            },
            dist: {
                src: [
                    'tmp/components.js',
                    'tmp/templates.js',
                    'src/ngbit.js'
                ],
                dest: 'ngbit-<%= pkg.version %>.js'
            }
        },

        /**
         * Task for minify files
         */
        uglify: {
            dist: {
                files: {
                    'ngbit-<%= pkg.version %>.min.js': ['ngbit-<%= pkg.version %>.js']
                },
                options: {
                    mangle: false
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.registerTask('build',
        [
            'jshint',
            'html2js',
            'concat:components',
            'concat:dist',
            'uglify'
        ]
    );
};
