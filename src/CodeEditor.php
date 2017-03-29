<?php
/**
 * Author: dungang
 * Date: 2017/3/28
 * Time: 17:36
 */

namespace dungang\codemirror;


use yii\bootstrap\Html;
use yii\bootstrap\InputWidget;

class CodeEditor extends InputWidget
{

    public function run()
    {
        $assets = CodeEditorAsset::register($this->getView());
        $containerId = $this->id . '-container';
        $div = Html::tag('div','',['id'=>$containerId]);
        $this->clientOptions['editorSWF'] = $assets->basePath . '/CodeHighlightEditor.swf';
        $this->registerPlugin('codeEditor');
        if ($this->hasModel()) {
            return Html::activeTextarea($this->model,$this->attribute,$this->options) . $div;
        } else {
            return Html::textarea($this->name,$this->value,$this->options) . $div;
        }
    }
}