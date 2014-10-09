'use strict';

module.exports = function(grunt) {

    grunt.registerTask('express', function() {

        var done = this.async(),
            app = require('../express');

        app.listen(grunt.config('express_port'));

        grunt.log.writeln('Express is now listening on port: ' + grunt.config('express_port'));

    });

};
