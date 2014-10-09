'use strict';

module.exports = function(grunt) {

    grunt.config('open', {
        'express': {
            'path': 'http://localhost:' + grunt.config('express_port')
        }
    });

};
