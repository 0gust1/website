//var test = require('lodash');

/**
 * Generate sidenotes using footnotes from Multimarkdown generated content
 * Idea and principle borrowed from Adrew Clark : http://acdlite.github.io/jquery.sidenotes/ and https://github.com/acdlite/jquery.sidenotes
 *
 * This script : - gather footnotes in the current container
 *               - insert the sidenotes in the current text, according to screen size :
 *                  - on big screens insert the sidenote *before* the anchor
 *                  - on medium screens, insert the sidenote *after* the anchor
 *
 * TODO : parametrize selector for footnotes
 *      : parametrize classes and tags generated
 *      : bind a resize event to replace sidenotes when screen size changes
 *
 * @param  {String} selector for the container to process
 */
var processFootNotes = function(rootSel){


    var footNotes  = document.querySelectorAll(rootSel+' .footnotes ol li');
    console.log(footNotes);

    var i = 1; //Note numbering

    //Each footnote
    Array.prototype.forEach.call(footNotes,function(note){
        //console.log('test');
        var docFragment = document.createDocumentFragment();

        var noteNode = document.createElement('aside');
        var id = note.id.replace('fn:','');
        //noteNode.id = id;
        noteNode.classList.add('footnote');
        noteNode.setAttribute('data-ref',i);

        //Append footnote childrens to the sidenote
        Array.prototype.forEach.call(note.childNodes,function(noteChild){
            noteNode.appendChild(noteChild.cloneNode(true));
        });

        console.log(noteNode.innerHTML);

        //append the sidenote along the pointing anchor

        var anchor = document.getElementById('fnref:'+id);

        //get the anchor parent element (a <p>)
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

module.exports = processFootNotes;

