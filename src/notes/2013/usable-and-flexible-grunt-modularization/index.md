---
date: 2013-12-11
title: Flexible and usable Grunt modularization
template: post.html
---

# Flexible and usable Grunt modularization ?

I'm currently working on a large ecommerce website, full of legacy code, sometimes very dirty and buggy.

I was searching a solution to progressively refactor the codebase, with the help of grunt and its tooling.

I wanted something :
- able to modularize grunt tasks and configuration, *based on functionnalities (big UX/UI sections of the website) rather than technical-based (task based) modularization.* 
- simple (readability, maintainability)
- open and flexible

Thanks to @oncletom (see : <https://gist.github.com/0gust1/7543330>), I ditched the grunt-plugin scenario, to code a simple solution.

Here is my current "prototype" so far (still lack some error handling and other things...) :

```javascript
/*global module:false*/

module.exports = function(grunt) {

  var env = process.env.NODE_ENV || 'dev';
  var _ = require('lodash');

  /*** External config & tasks filepaths ***/
  
  //we have 1 base config, and possibly many module-specific config
  var configLocations = ['./grunt-config/default_config.js', './grunt-config/**/config.js'];
  
  //we have 1 base tasks definition, and possibly many module-specific config
  var tasksLocations = ['./grunt-config/default_tasks.js', './grunt-config/**/tasks.js'];
  
  
  /* Typical project layout (matching with the globbing pattern above - adapt to your project structure) :

  ├── Gruntfile.js 
  ├── package.json
  ├── grunt-config
  │   ├── homepage
  │   │   └── config.js
  │   ├── navigation
  │   │   └── config.js
  │   ├── module1
  │   │   ├── config.js
  │   │   └── tasks.js
  │   ├── default_config.js
  │   ├── default_tasks.js
  │   └── template_module_grunt.txt
  ├── website_directory1
  │   ├── mdp
  │   ├── multimedia-storage
  │   ├── mv-commit.sh
  │   ├── query
  │   ├── temp
  │   └── tmp
  └── website_directory2
      ├── crossdomain.xml
      ├── css
      ├── favicon.ico
      ├── fonts
      :
      :
      :

  */

  /***************** External configuration management ***********************************/

  var configFiles = grunt.file.expand({
    filter: "isFile"
  }, configLocations );

  grunt.log.writeln('Gathering external configuration files'.underline.green);
  grunt.log.writeln("configFiles : " + grunt.log.wordlist(configFiles, {
    separator: ', ',
    color: 'cyan'
  }));

  var configArray = configFiles.map(function(file) {
    grunt.log.writeln("=> importing : " + file);
    return require(file)(grunt, env);
  });

  var config = {};

  configArray.forEach(function(element) {
    config = _.merge(config, element);
  });

  grunt.initConfig(config);

  /***************** Task loading & registering *******************************************/
  // We load grunt tasks listed in package.json file
  require('load-grunt-tasks')(grunt);

  /****** External tasks registering ****************/
  grunt.log.writeln('Gathering external task files'.underline.green);

  var taskFiles = grunt.file.expand({
    filter: "isFile"
  }, tasksLocations);

  grunt.log.writeln("task files : " + grunt.log.wordlist(taskFiles, {
    separator: ', ',
    color: 'cyan'
  }));

  taskFiles.forEach(function(path) {
    grunt.log.writeln("=> loading & registering : " + path);
    require(path)(grunt);
  });
  
  grunt.registerTask('default', ['attention:gruntfile', 'jshint:gruntfile', 'logConfig']);

  grunt.registerTask('checkGruntFile', 'Tâche par défaut - aide et vérification du gruntfile', function() {
    grunt.log.subhead('* Tâche par défaut - aide et vérification du gruntfile *');
    grunt.log.writeln('Exécutez "grunt -h" pour avoir plus d\'informations sur les tâches disponibles');
    grunt.log.writeln('...');
    grunt.log.subhead('Vérification du gruntfile...');
    grunt.task.run(['jshint:gruntfile']);
  });

  //write the generated configuration (for debug)
  grunt.registerTask('logConfig', 'Ecrire la configuration générée', function() {
    //grunt.task.run(['attention:gruntfile']);
    grunt.log.subhead('* Configuration générée : *');
    grunt.log.writeln(JSON.stringify(config, undefined, 2));
  });

};

```