//var test = require('lodash');

/**
 * Generate sidenotes using footnotes from Multimarkdown generated content
 * Idea and principle borrowed from Adrew Clark : http://acdlite.github.io/jquery.sidenotes/ and https://github.com/acdlite/jquery.sidenotes
 * @param  {String}
 */
var processFootNotes = function(rootSel){


    var footNotes  = document.querySelectorAll(rootSel+" .footnotes ol li");
    console.log(footNotes);



    //Each footnote
    var i = 1;
    Array.prototype.forEach.call(footNotes,function(note){
        //console.log('test');
        var docFragment = document.createDocumentFragment();

        var noteNode = document.createElement("aside");
        var id = note.id.replace("fn:","");
        //noteNode.id = id;
        noteNode.classList.add("footnote");
        noteNode.setAttribute('data-ref',i);

        //Append footnote childrens to the sidenote
        Array.prototype.forEach.call(note.childNodes,function(noteChild){
            noteNode.appendChild(noteChild.cloneNode(true));
        });

        console.log(noteNode.innerHTML);

        //append the sidenote along the pointing anchor

        var anchor = document.getElementById("fnref:"+id);
        var anchorParent = anchor.parentElement.parentElement;

        /* big screens */
        //insert before : wide screen
        //anchorParent.insertBefore(noteNode, anchor.parentElement);

        /* medium screens */
        //insert after : medium screen
        anchorParent.insertBefore(noteNode, anchor.nextSibling);

        /* small screens */
        //no need for JS, just hide the sidenotes and show th footnotes via media queries

        i++;
    });

};

//processFootNotes(".main");
