var padeditor = require("ep_etherpad-lite/static/js/pad_editor").padeditor

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

    if (n != 'undefined' && n.nextElementSibling) {

        var el = n.nextElementSibling;
        
        if ($(el).is('td')) {
            var existing = localStorage.getItem('payload');
            existing = existing ? existing.split('||') : [];
            existing.push(el.innerText);
            localStorage.setItem('payload', existing.toString());
        } else {
            return 0;
        }

    } else {

        var el = n.parentNode;
        
        if ($(el).is('tr')) {

            var payload = localStorage.getItem('payload');
            payload = payload ? payload.split(',') : [];

            localStorage.removeItem('payload');
            localStorage.clear();

            var tblRows = payload;
            var payload = [[]];
            payload = [tblRows];
        
            tableObj = {
                "payload": payload,
                "tblId": 1,
                "tblClass": "data-tables",
                "trClass": "alst",
                "tdClass": "hide-el",
                "isFirstRow": true
            }

            context.cc.startNewLine();
        
            return JSON.stringify(tableObj);

        }

    }

    var existing = localStorage.getItem('payload');
    if (existing) return 0;
};

exports.collectContentPost = function(hook, context){

};

exports.collectContentPre = function(hook, context){
    
};
