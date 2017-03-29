<?php
/**
 * Author: dungang
 * Date: 2017/3/28
 * Time: 17:33
 */

namespace dungang\code\editor;


use yii\web\AssetBundle;

class CodeEditorAsset extends AssetBundle
{

    public $js = [
        'swfobject.js',
        'code-editor.js',
    ];

    public function init()
    {
        $this->sourcePath = __DIR__ . '/assets';
    }

}