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

    if (n != 'undefined' && n.nextElementSibling) {

        var el = n.nextElementSibling;

        if ($(el).is('td')) {
            var existing = localStorage.getItem('payload');
            existing = existing ? existing.split('||') : [];
            existing.push(el.innerText);
            localStorage.setItem('payload', existing.toString());
        }

    } else {
        var el = n.parentNode;
        txt = "";

        if ($(el).is('tr')) {
            var payload = localStorage.getItem('payload');
            payload = payload ? payload.split(',') : [];

            var tblRows = payload;

            localStorage.removeItem('payload');
            localStorage.clear();

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
        
            txt = JSON.stringify(tableObj);
        }
    }

    if (txt) {
        txt = "";        
        while (n) {
            if (n.tagName == 'TD') {

                var existing = localStorage.getItem('payload');
                existing = existing ? existing.split('||') : [];
                existing.push(n.innerText);
                localStorage.setItem('payload', existing.toString());

                if (!n.nextElementSibling) {
                    var payload = localStorage.getItem('payload');
                    payload = payload ? payload.split(',') : [];
    
                    var tblRows = payload;

                    localStorage.removeItem('payload');
                    localStorage.clear();

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
                
                    txt = JSON.stringify(tableObj);

                }
                
            }
            n = n.parentNode;
        }
        
    }

    return txt;
};
