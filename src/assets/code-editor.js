/**
 * Created by Lenovo on 2017/3/28.
 */
+function ($) {
    var params = {menu: "false", /* wmode : "transparent", */allowscriptaccess : "always" };
    $.fn.codeEditor = function (options) {
        var opts = $.extend({},options);
        return this.each(function () {
            var editor = $(this).css({
                display:'none'
            });
            var id = 'ctrFlash' + editor.attr('id').replace('-','');
            // var data = editor.data();
            // if (data.width) {
            //     opts.width = data.width;
            // }
            // if (data.height) {
            //     opts.height = data.height;
            // }
            // if (data.parser) {
            //     opts.flashvars.parser = data.parser;
            // }
            // if (data.readOnly==true) {
            //     opts.flashvars.readOnly = true;
            // }
            // else
            // {
            //     opts.flashvars.readOnly = false;
            // }
            // if (data.preferredFonts) {
            //     opts.flashvars.preferredFonts = data.preferredFonts;
            // }
            opts.flashvars.onload = function(){
                var swf = document.getElementById(id);
                swf.setParser(opts.flashvars.parser);
                swf.setText(editor.val());
            };
            var swf = opts.editorSWF;
            swfobject.embedSWF(swf+'?_=' + (new Date()).getTime(),
                opts.container, opts.width, opts.height, opts.swfVersion, null,
                opts.flashvars, params, {
                    id:id,
                    name:id
                }
            )

        });
    };

    $.fn.codeEditor.Default = {
        container:"flash-loader",
        swfVersion:'10.0.0',
        editorSWF:'CodeHighlightEditor.swf',
        width:'100%',
        height:'420',
        flashvars:{
            // indicate the parser, aspx / csharp / javascript / css / vbscript / html / xml / php / phpcode
            parser: "javascript",
            // set the editor to read-only mode
            readOnly: false,
            // the editor detects client installed fonts and use preferred fonts if installed.
            // NOTE: the charactor '|' is required at the begin and end of the list
            preferredFonts : "|Consolas|Courier New|Courier|Arial|Tahoma|",
            // font size
            fontSize : 12
        }
    };
}(jQuery);