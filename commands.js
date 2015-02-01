var path = require('path'),
    fs = require('fs'),
    slug = require('slug'),
    moment = require('moment'),
    mkpath = require("mkpath"),
    jsYaml = require('js-yaml');


//fs.mkdirSync(path, [mode])


function createPost(root,section,scheme,title){

    var targetPath = "";
    var filename = "index.md";
    var fileContent = "";

    switch(scheme){
        case ":section/:year/:title_dir/:index_doc": // section/2015/my-awesome-title/index.md
            targetPath = path.resolve(root,section,moment().year().toString(),slug(title));

            break;
        case ":section/:year/:title_doc": // section/2015/my-awesome-title.md
            targetPath = path.resolve(root,section,moment().year().toString());
            filename = slug(title)+".md";
            break;
        case ":section/:title/:index_doc": // /section/my-awesome-title/index.html
            targetPath = path.resolve(root,section,slug(title));

        break;
        case ":section/:title_doc": // /section/my-awesome-title.html
            targetPath = path.resolve(root,section);
            filename = slug(title)+".md";
        break;
        default:

            break;
    }

    fileContent += "---\n";
    fileContent += jsYaml.dump({date:moment().format("YYYY-MM-DD"),title:title,template:"post.html"});
    fileContent += "---\n";
    fileContent += "\n#"+title+"\n";



    console.log("creating path : "+targetPath);

    mkpath.sync(targetPath);

    console.log("creating file : "+filename);

    fs.writeFileSync(path.resolve(targetPath,filename), fileContent);

}

createPost("src/","notes",":section/:year/:title_dir/:index_doc","Comment est fabriqué ce site");
console.log(slug("des css générées en JS"));
