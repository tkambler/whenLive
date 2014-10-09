'use strict';

module.exports = function(grunt) {

    grunt.config('concurrent', {
        'serve': {
            'tasks': ['express', 'open:express'],
            'options': {
                'logConcurrentOutput': true
            }
        }
    });

};
