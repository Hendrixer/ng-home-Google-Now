module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    shell: {
      server: {
        options: {
          stdout: true
        },
        command: 'nodemon server.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('default', 'shell:server');
};