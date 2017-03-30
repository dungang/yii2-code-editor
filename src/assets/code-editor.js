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
    }

    CodeEditor.prototype.add = function(options){
        for(var prop in options) {
            if(this.hasOwnProperty(prop)) {
                this[prop] = options[prop];
            }
        }
    };

    CodeEditor.prototype.preview = function () {
        var textArea = document.getElementById(this.swfTextAreaId)
        var left = (window.outerWidth -600)/2;
        var preview = open("", "code-editor-preview",
            "top=100,left="+left+",height=400,width=600,location=no,status=no,menubar=yes,toolbar=no");
        preview.document.open();
        preview.document.write(textArea.value);
        preview.document.close();
    };

    CodeEditor.prototype.reload = function () {
        CodeEditor.onLoad(this.flashId,this.swfTextAreaId);
    };

    CodeEditor.prototype.render = function () {

        var _this = this;
        var textArea = document.getElementById(this.swfTextAreaId);
        if(textArea) {
            textArea.style.display = 'none';
        }

        var preview = document.getElementById(this.previewButtonId);
        if (preview) {
            preview.onclick=function (event) {
                event.preventDefault();
                _this.preview();
            };
        }

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
        )
    };

    CodeEditor.create = function (options) {
        return new CodeEditor(options).render();
    };

    CodeEditor.load = function (swfId,textareaId) {
        document.getElementById(swfId)
            .setText(document.getElementById(textareaId).value);
    };

    CodeEditor.change = function (textareaId,code) {
        document.getElementById(textareaId).value = code;
    };

    return CodeEditor;
}());