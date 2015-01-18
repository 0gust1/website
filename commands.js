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
        case ":year/:title":
            targetPath = path.resolve(root,section,moment().year().toString(),slug(title));

            break;
        case ":title":
            targetPath = path.resolve(root,section,slug(title));

        break;
        case "page":
            targetPath = path.resolve(root,section);
            filename = slug(title)+".md";
        break;
        default:
            //statements_def
            break;
    }

    fileContent += "---\n";
    fileContent += jsYaml.dump({date:moment().get('date'),title:title,template:"post.html"});
    fileContent += "---\n";
    fileContent += "\n#"+title+"\n";



    console.log("creating path :"+targetPath);
    mkpath(targetPath);
    console.log("creating file :"+filename);
    fs.writeFile(path.resolve(targetPath,filename), fileContent);
    // YYYY/MM/DD

}

createPost("src/","haikus",":year/:title","À l'ombre des hêtres");
