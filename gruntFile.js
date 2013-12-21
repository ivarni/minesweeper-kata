module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['jshint', 'karma:unit']);

    var karmaConfig = function(configFile, customOptions) {
        var options = { 
            configFile: configFile, 
            keepalive: true 
        };
        return grunt.util._.extend(options, customOptions);
    };

    grunt.initConfig({
        src: {
            js: ['src/**/*.js'],
            specs: ['test/**/*.spec.js']
        },
        karma: {
            unit: { options: karmaConfig('test/config/unit.js') },
            watch: { options: karmaConfig('test/config/unit.js', {
                singleRun: false,
                autoWatch: true
            })}
        },
        watch: {
            all: {
                files: [
                    '<%= src.js %>',
                    '<%= src.specs %>'
                ],
                tasks: ['default']
            }
        },
        jshint: {
            files: [
                'gruntFile.js',
                '<%= src.js %>',
                '<%= src.specs %>'
            ],
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                boss: true,
                eqnull: true,
                globals: {}
            }
        }
    });
};