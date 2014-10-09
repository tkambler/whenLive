module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
            src: 'src/jquery.whenlive.js',
                dest: 'dist/jquery.whenlive.js'
            }
        }
    });

    grunt.config.init({
        'express_port': 5001
    });

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.loadTasks('tasks');

    grunt.registerTask('server', ['concurrent:serve']);
    grunt.registerTask('default', ['uglify']);
    grunt.registerTask('build', ['uglify']);

};
