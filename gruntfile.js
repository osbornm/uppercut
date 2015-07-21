module.exports = function(grunt) {
    var bannerContent = '/*!\n' +
                        ' * Uppercut JavaScript library v<%= pkg.version %>\n' +
                        ' * (c) Matthew M. Osborn - <%= pkg.homepage %>\n' +
                        ' * License: <%= pkg.licenses[0].type %> (<%= pkg.licenses[0].url %>)\n' +
                        ' */\n\n';


   var name = '<%= pkg.name %>-v<%= pkg.version%>';

   grunt.initConfig({
    // pkg is used from templates and therefore
    // MUST be defined inside initConfig object
    pkg : grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: bannerContent,
        sourceMapRoot: '../',
        sourceMap: 'dist/'+name+'.min.js.map',
        sourceMapUrl: name+'.min.js.map'
      },
      target : {
        src : ['src/**/*.js'],
        dest : 'dist/' + name + '.min.js'
      }
    },
    // concat configuration
    concat: {
      options: {
        banner: bannerContent
      },
      target : {
        src : ['src/**/*.js'],
        dest : 'dist/' + name + '.js'
      }
    },
    jshint: {
      options: {
        trailing: true,
        eqeqeq: true
      },
      target: {
        src : ['src/**/*.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

};
