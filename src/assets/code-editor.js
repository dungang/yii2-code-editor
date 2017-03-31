/**
 * Created by Lenovo on 2017/3/28.
 * @author  dungang
 */

var CodeEditor = (function(){
    function CodeEditor(){
        this.swfContainerId = '';
        this.swfTextAreaId='';
        this.swfEditorObject='CodeHighlightEditor.swf';
        this.swfVersion='10.0.0';
        this.height='420';
        this.width='100%';
        this.previewButtonId = 'preview';

        // indicate the parser, aspx / csharp / javascript / css / vbscript / html / xml / php / phpcode
        this.parser='php';

        // set the editor to read-only mode
        this.readOnly=false;

        // the editor detects client installed fonts and use preferred fonts if installed.
        // NOTE: the charactor '|' is required at the begin and end of the list
        this.fonts='|Consolas|Courier New|Courier|Arial|Tahoma|';
        this.fontSize = 12;

        this.add.apply(this,arguments);

        this.flashId = 'ctrFlash' + this.swfTextAreaId.replace('-','');

        this._editorText = document.getElementById(this.swfTextAreaId);
        if(this._editorText) {
            this._editorText.style.display = 'none';
        }
    }

    CodeEditor.prototype.checkFlash = function () {
        var hasFlash = 0;
        var flashVersion = 0;
        if (document.all) {
            var swfObj = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
            if (swfObj) {
                hasFlash = 1;
                var swfVar = swfObj.GetVariable("$version");
                flashVersion = parseInt(swfVar.split(" ")[1].split(",")[0]);
            }
        } else {
            if (navigator.plugins && navigator.plugins.length > 0) {
                var swf = navigator.plugins["Shockwave Flash"];
                if (swf) {
                    hasFlash = 1;
                    var words = swf.description.split(" ");
                    for (var i = 0; i < words.length; ++i) {
                        if (isNaN(parseInt(words[i]))) continue;
                        flashVersion = parseInt(words[i]);
                    }
                }
            }
        }
        return { hasFlash: hasFlash, version: flashVersion };
    };

    CodeEditor.prototype.add = function(options){
        for(var prop in options) {
            if(this.hasOwnProperty(prop)) {
                this[prop] = options[prop];
            }
        }
    };

    CodeEditor.prototype.preview = function () {
        var left = (window.outerWidth -600)/2;
        var preview = open("", "code-editor-preview",
            "top=100,left="+left+",height=400,width=600,location=no,status=no,menubar=yes,toolbar=no");
        preview.document.open();
        preview.document.write(this._editorText.value);
        preview.document.close();
    };

    CodeEditor.prototype.getEditorObject = function () {
        return document.getElementById(this.flashId);
    };

    CodeEditor.prototype.render = function () {

        var fl = this.checkFlash();
        if (fl.hasFlash) {
            var flashVars = {
                flashId:this.flashId,
                textareaId:this.swfTextAreaId,
                parser: this.parser,
                readOnly: this.readOnly,
                preferredFonts : this.fonts,
                fontSize : this.fontSize,
                onload: "CodeEditor.load",
                onchange: "CodeEditor.change"
            };
            var params = { menu: "false", /* wmode : "transparent", */allowscriptaccess : "always" };
            swfobject.embedSWF(this.swfEditorObject+'?now=' + (new Date()).getTime(),
                this.swfContainerId, this.width, this.height, this.swfVersion, null,
                flashVars, params, {
                    id:this.flashId,
                    name:this.flashId
                }
            );

            var _this = this;
            var preview = document.getElementById(this.previewButtonId);
            if (preview) {
                preview.onclick=function (event) {
                    event.preventDefault();
                    _this.preview();
                };
            }
        } else {
            var container = document.getElementById(this.swfContainerId);
            container.style.borderWidth = '1px';
            container.style.borderStyle = 'dashed';
            container.style.borderColor = 'lightgray';
            container.style.padding = '10px';
            container.style.backgroundColor = 'white';
            container.style.color = 'orange';
            container.style.textAlign='center';
            container.style.fontWeight = 'bold';
            container.innerHTML = 'Flash Player Not Installed, <a href="http://www.adobe.com/go/getflash" target="_blank">Click Here</a> To Install';

        }

        return this;
    };

    CodeEditor.prototype.changeParser = function (langauge) {
        this.getEditorObject().setParser(langauge);
    }

    CodeEditor.prototype.setContent = function (code) {
        this.getEditorObject().setText(code);
        this._editorText.value = code;
    };

    CodeEditor.prototype.reload = function () {
        this.getEditorObject().setText(this._editorText.value);
    };

    CodeEditor.create = function (options) {
        return new CodeEditor(options).render();
    };

    CodeEditor.load = function (swfId,textareaId) {
        var editorObj = document.getElementById(swfId);
        var textarea = document.getElementById(textareaId);
        editorObj.setText(textarea.value);
        CodeEditor.onAfterLoaded.call(editorObj,textarea);
    };

    CodeEditor.change = function (textareaId,code) {
        var textarea = document.getElementById(textareaId);
        textarea.value = code;
        CodeEditor.onAfterChanged.call(textarea,code);
    };

    //callback
    CodeEditor.onAfterLoaded = function (editorObj,textarea) {

    };

    //callback
    CodeEditor.onAfterChanged = function (textarea,code) {

    };

    return CodeEditor;
}());