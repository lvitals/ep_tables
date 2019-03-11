var _ = require('ep_etherpad-lite/static/js/underscore');

exports.collectContentLineBreak = function (hook, context) {
    var tvalue = context.tvalue;
    var breakLine = true;
    if (tvalue && tvalue == 'tblBreak') {
        breakLine = false;
    }
    return breakLine;
};
exports.collectContentLineText= function (hook, context) {
    var n = context.node;
    var txt = context.text;

    if (txt) {
        while (n) {
            if (n.tagName == 'TD') {
                var elementName = n.getAttribute("name");
                if (elementName == 'tData') {
                    txt = txt.replace(/\\/g, "|");
                    txt = txt.replace(/"/g, "'");
                    break;
                } else if (elementName == 'delimCell') {
                    txt = '","';
                    break;
                } else if (elementName == 'payload') {
                    txt = "{\"payload\":[[\"";
                    break;
                } else if (elementName == 'bracketAndcomma') {
                    txt = n.innerHTML;
                    break;
                }
            }
            n = n.parentNode;
        }
    }
    return txt;
};


exports.collectContentPre = function(hook, context){

    var tags = ['table', 'tbody', 'tr', 'td'];

    var tname = context.tname;
    var state = context.state;
    var lineAttributes = state.lineAttributes
    var tagIndex = _.indexOf(tags, tname);

    if(tagIndex >= 0) {
        if (tags[tagIndex] == 'table') {

            localStorage.setItem('table', '');

            console.log(tags[tagIndex]);
        
        }
        if (tags[tagIndex] == 'tr') {


            var table = localStorage.getItem('table');

            if (table) {

                var data = table.concat(tags[tagIndex]);

                localStorage.setItem('table', data);
            }

            

            console.log(tags[tagIndex]);
        }
        if (tags[tagIndex] == 'td') {

            var table = localStorage.getItem('table');

            if (table) {

                var data = table.concat(tags[tagIndex]);

                localStorage.setItem('table', data);
            }

            console.log(tags[tagIndex]);
        }

    }

};

exports.collectContentPost = function(hook, context){
    var tname = context.tname;
    var state = context.state;
    var lineAttributes = state.lineAttributes;
    var cc = context.cc;

    // console.log(context);
    
};