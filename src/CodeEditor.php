<?php
/**
 * Author: dungang
 * Date: 2017/3/28
 * Time: 17:36
 */

namespace dungang\code\editor;

use yii\helpers\Html;
use yii\helpers\Json;
use yii\widgets\InputWidget;

class CodeEditor extends InputWidget
{
    public $language = 'php';
    public function run()
    {
        $id = $this->options['id'];
        $containerId = $id . '-container';
        $previewId = $id . '-preview';
        $assets = CodeEditorAsset::register($this->getView());
        $div = Html::tag('div','',['id'=>$containerId]);
        $options = [];
        $options['swfTextAreaId'] = $id;
        $options['previewButtonId'] = $previewId;
        $options['parser'] = $this->language;
        $options['swfContainerId'] = $containerId;
        $options['swfEditorObject'] = $assets->baseUrl . '/CodeHighlightEditor.swf';
        $options = Json::htmlEncode($options);
        $this->getView()->registerJs("CodeEditor.create($options);");
        $html = Html::button('预览',['id'=>$previewId]);
        if ($this->hasModel()) {
            return $html . Html::activeTextarea($this->model,$this->attribute,$this->options) . $div;
        } else {
            return $html . Html::textarea($this->name,$this->value,$this->options) . $div;
        }
    }
}