
var extname = require('path').extname;
var Metalsmith = require('metalsmith');
var plugins = require("load-metalsmith-plugins")();
var http = require('http');
var path = require('path');

/*var templates = require('metalsmith-templates');
var markdown = require('metalsmith-multimarkdown');
var collections = require('metalsmith-collections');
var permalinks = require('metalsmith-permalinks');
var asset = require('metalsmith-static');
var watch = require('metalsmith-watch');
var feed = require('metalsmith-feed');
var webpack = require('metalsmith-webpack');
var excerpts = require('metalsmith-excerpts');
var gist = require('metalsmith-gist');
var ignore = require('metalsmith-ignore');*/



/**
* Live reload server
*/
var tinylr = require('tiny-lr-fork');

// standard LiveReload port
var port = 35729;

// tinylr(opts) => new tinylr.Server(opts);
tinylr().listen(port, function(err) {
  if(err) {
    // deal with err
    return;
  }

  console.log('... Tinylr (tiny-lr-fork), listening on port %s ...', port);
});


/**
* Local server, tied with livereload
*/

var connect = require('connect');
var serveStatic = require('serve-static');
var app= connect();

app.use(require('connect-livereload')({
    port: 35729
  }));
app.use(serveStatic(__dirname+'/build'));

http.createServer(app).listen(8080);


/**
 * Build.
 */
var metalsmith = Metalsmith(__dirname)
  //.source('content')
  .clean(true)
  .source('src')
  .use(plugins.ignore([
    '_templates/**/*','website.json'
  ]))
  .metadata({
    site : {
      url:'http://localhost:8080',
      domain:'localhost:8080'
    }
  })
  .use(plugins.watch())
  .use(plugins.collections({
    notes: {
        pattern: 'notes/**/*.md',
        orderBy:'date',
        reverse:true
    },
    haikus: {
        pattern: 'haikus/**/*.md',
        orderBy:'date',
        reverse:true
    },
    pages:{
        pattern: 'pages/**/*.md'
    }
  }))
  //.use(gist())
  .use(plugins.markdown({
    smartypants: true,
    gfm: true,
    tables: true
  }))
  .use(plugins.permalinks({
    pattern: ':path',
    date: 'YYYY',
    relative:true
  }))
  .use(plugins.templates({
    engine: 'swig',
    directory: 'src/_templates'
  }))
  //.use(feed({collection:'blog'}))
  .use(mine)
  .use(plugins.webpack({
    context: path.resolve(__dirname, './src/js/'),
    entry: './index.js',
    output: {
      path: path.resolve(__dirname, './build/js/'),
      filename: 'bundle.js'
    }
  }))
  //.use(mythify)
  .build(function(err){
    if (err) throw err;
  });





function mine(files,metalsmith,done){
console.log(files);
console.log(metalsmith);
  done();
}

function clean(files,metalsmith,done){
  return function drafts(files, metalsmith, done){
    for (var file in files) {
      if (files[file].match(/content/i)) delete files[file];
    }
    done();
  };
}


/**
 * mythify plugin.
 *
 * @param {Object} files
 * @param {Metalsmith} metalsmith
 * @param {Function} done


function mythify(files, metalsmith, done){

    var css = '';

    for (var file in files) {
        if ('.css' != extname(file)) continue;
        css += files[file].contents.toString();
        delete files[file];

    }
    css = myth(css);

    files['persoo.css'] = {
        contents: new Buffer(css)
    };

    done();
}
 */
