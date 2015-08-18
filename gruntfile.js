module.exports = function(grunt) {
    var bannerContent = '/*!\n' +
                        ' * Uppercut JavaScript library v<%= pkg.version %>\n' +
                        ' * (c) Matthew M. Osborn - <%= pkg.homepage %>\n' +
                        ' * License: <%= pkg.licenses[0].type %> (<%= pkg.licenses[0].url %>)\n' +
                        ' */\n\n';

   var name = '<%= pkg.name %>';

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
        src : ['dist/' + name + '.js'],
        dest : 'dist/' + name + '.min.js'
      }
    },
    // concat configuration
    concat: {
      options: {
        banner: bannerContent
      },
      target : {
        src : ['build/before.js', 'src/**/*.js', 'build/after.js'],
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
    },
    jasmine: {
      src: 'dist/uppercut.js',
      options: {
        specs: 'spec/*Spec.js',
        keepRunner: false, // Handy for debuging
        vendor: [
            'bower_components/knockoutjs/dist/knockout.js',
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.registerTask('dist', function() {
      // Update the version in bower.json
      var bowerConfig = grunt.file.readJSON('bower.json'),
          version = grunt.config('pkg.version');
      bowerConfig.version = version;
      grunt.file.write('bower.json', JSON.stringify(bowerConfig, true, 2));

      console.log('To publish, run:');
      console.log('    git add bower.json');
      console.log('    git add -f ./dist/uppercut.js');
      console.log('    git add -f ./dist/uppercut.min.js');
      console.log('    git add -f ./dist/uppercut.min.js.map');
      console.log('    git checkout head');
      console.log('    git commit -m \'Version ' + version + ' for distribution\'');
      console.log('    git tag -a v' + version + ' -m \'Add tag v' + version + '\'');
      console.log('    git checkout master');
      console.log('    git push origin --tags');
  });
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
  grunt.registerTask('test', ['default','jasmine']);
  grunt.registerTask('push', ['test', 'dist'])

};
