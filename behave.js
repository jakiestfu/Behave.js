var Behave = Behave || function (userOpts) {

    'use strict';

    String.prototype.repeat = function( num ){
        return new Array( num + 1 ).join( this );
    };

    var defaults = {
        textarea: null,
        replaceTab: true,
        softTabs: true,
        softTabSize: 4,
        autoOpen: true,
        overwrite: true,
        autoStrip: true,
        autoIndent: true
    },
    tab,
    charSettings = {

        keyMap: [
            { open: "\"", close: "\"", canBreak: false },
            { open: "'", close: "'", canBreak: false },
            { open: "(", close: ")", canBreak: false },
            { open: "[", close: "]", canBreak: true },
            { open: "{", close: "}", canBreak: true }
        ] 

    },
    utils = {
        cursor: {
            get: function doGetCaretPosition() {
                var caretPos = 0;
                if (document.selection) {
                    defaults.textarea.focus();
                    var selection = document.selection.createRange();
                    selection.moveStart('character', -defaults.textarea.value.length);
                    caretPos = selection.text.length;
                } else if (defaults.textarea.selectionStart || defaults.textarea.selectionStart == '0') {
                    caretPos = defaults.textarea.selectionStart;
                }
                return caretPos;
            },
            set: function (pos) {
                if (defaults.textarea.setSelectionRange) {
                    defaults.textarea.focus();
                    defaults.textarea.setSelectionRange(pos, pos);
                } else if (defaults.textarea.createTextRange) {
                    var range = defaults.textarea.createTextRange();
                    range.collapse(true);
                    range.moveEnd('character', pos);
                    range.moveStart('character', pos);
                    range.select();
                }
            }
        },
        levelsDeep: function(){
            var pos = utils.cursor.get(),
                val = defaults.textarea.value,
                left = val.substring(0, pos),
                levels = 0,
                i, j;
            for(i in left){
                for (j in charSettings.keyMap) {
                    if(charSettings.keyMap[j].canBreak){
                        if(charSettings.keyMap[j].open == left[i]){
                            levels++;
                        }
                        if(charSettings.keyMap[j].close == left[i]){
                            levels--;
                        }
                    }
                }
            }
            return levels;
        },
        deepExtend: function(destination, source) {
            for (var property in source) {
                if (source[property] && source[property].constructor &&
                    source[property].constructor === Object) {
                    destination[property] = destination[property] || {};
                    utils.deepExtend(destination[property], source[property]);
                } else {
                    destination[property] = source[property];
                }
            }
            return destination;
        },
        addEvent: function addEvent(element, eventName, func) {
            if (element.addEventListener){
                element.addEventListener(eventName,func,false);
            } else if (element.attachEvent) {
                element.attachEvent("on"+eventName, func);
            }
        },
        preventDefaultEvent: function(e){
            if(e.preventDefault){
	            e.preventDefault();
            } else {
	            e.returnValue = false;
            }
        }
    },
    intercept = {
        tabKey: function (e) {
            if (e.keyCode == 9) {
            	console.log(e);
                utils.preventDefaultEvent(e);

                var pos = utils.cursor.get(),
                    val = defaults.textarea.value,
                    left = val.substring(0, pos),
                    right = val.substring(pos),
                    edited = left + tab + right;

                if(e.shiftKey){
                    if(val.substring(pos-tab.length, pos) == tab){
                        edited = val.substring(0, pos-tab.length) + right;
                        defaults.textarea.value = edited;
                        utils.cursor.set(pos-tab.length);
                    }
                } else {
                    defaults.textarea.value = edited;
                    utils.cursor.set(pos + tab.length);
                    return false;
                }
            }
            return true;
        },
        enterKey: function (e) {
            if (e.keyCode == 13) {

                utils.preventDefaultEvent(e);

                var pos = utils.cursor.get(),
                    val = defaults.textarea.value,
                    left = val.substring(0, pos),
                    right = val.substring(pos),
                    leftChar = left[left.length - 1],
                    rightChar = right[0],
                    numTabs = utils.levelsDeep(),
                    ourIndent = "",
                    closingBreak = "",
                    finalCursorPos,
                    i;

                if(!numTabs){
                    finalCursorPos = 1;
                } else {
                    while(numTabs--){
                        ourIndent+=tab;
                    }
                    ourIndent = ourIndent;
                    finalCursorPos = ourIndent.length + 1;
                    
                    for (i in charSettings.keyMap) {
                        if (charSettings.keyMap[i].open == leftChar && charSettings.keyMap[i].close == rightChar){
                            closingBreak = "\n";
                        }
                    } 
                    
                }

                var edited = left + "\n" + ourIndent + closingBreak + (ourIndent.substring(0, ourIndent.length-tab.length) ) + right;
                defaults.textarea.value = edited;
                utils.cursor.set(pos + finalCursorPos);
            }
        },
        deleteKey: function (e) {
            if(e.keyCode == 8){
                
                var pos = utils.cursor.get(),
                    val = defaults.textarea.value,
                    left = val.substring(0, pos),
                    right = val.substring(pos),
                    leftChar = left[left.length - 1],
                    rightChar = right[0],
                    i;
                for (i in charSettings.keyMap) {
                    if (charSettings.keyMap[i].open == leftChar && charSettings.keyMap[i].close == rightChar) {
                        utils.preventDefaultEvent(e);
                        var edited = val.substring(0,pos-1) + val.substring(pos+1);
                        defaults.textarea.value = edited;
                        utils.cursor.set(pos - 1);
                    }
                }
            }
        }
    },
    charFuncs = {
        openedChar: function (_char, e) {
            utils.preventDefaultEvent(e);
            var pos = utils.cursor.get(),
                val = defaults.textarea.value,
                left = val.substring(0, pos),
                right = val.substring(pos),
                edited = left + _char.open + _char.close + right;
            defaults.textarea.value = edited;
            utils.cursor.set(pos + 1);
        },
        closedChar: function (_char, e) {
            var pos = utils.cursor.get(),
                val = defaults.textarea.value,
                toOverwrite = val.substring(pos, pos + 1);
            if (toOverwrite == _char.close) {
                utils.preventDefaultEvent(e);
                utils.cursor.set(utils.cursor.get() + 1);
                return true;
            }
            return false;
        }
    },
    action = {
        filter: function (e) {
            
            var _char = String.fromCharCode(e.which),
                i;

            for (i in charSettings.keyMap) {

                if (charSettings.keyMap[i].close == _char) {
                    var didClose = defaults.overwrite && charFuncs.closedChar(charSettings.keyMap[i], e);
                    
                    if (!didClose && charSettings.keyMap[i].open == _char && defaults.autoOpen) {
                        charFuncs.openedChar(charSettings.keyMap[i], e);
                    }
                } else if (charSettings.keyMap[i].open == _char && defaults.autoOpen) {
                    charFuncs.openedChar(charSettings.keyMap[i], e);
                }
            }
            
        },
        listen: function () {

            if(defaults.replaceTab){ utils.addEvent(defaults.textarea, 'keydown', intercept.tabKey); }
            if(defaults.autoIndent){ utils.addEvent(defaults.textarea, 'keydown', intercept.enterKey); }
            if(defaults.autoStrip){ utils.addEvent(defaults.textarea, 'keydown', intercept.deleteKey); }

            utils.addEvent(defaults.textarea, 'keypress', action.filter);
        }
    },
    init = function (opts) {
        
        if(opts.textarea){
            utils.deepExtend(defaults, opts);
        
            if (defaults.softTabs) {
                tab = " ".repeat(defaults.softTabSize);
            } else {
                tab = "\t";
            }
            
            action.listen();
        }
        
    };
    
    this.destroy = function(){
        defaults.textarea.removeEventListener('keydown', intercept.tabKey);
        defaults.textarea.removeEventListener('keydown', intercept.enterKey);
        defaults.textarea.removeEventListener('keydown', intercept.deleteKey);
        defaults.textarea.removeEventListener('keypress', action.filter);
    };
    
    init(userOpts);
    
};
