# yii2-code-editor
CodeHighlightEditor.swf 封装 

> 安装

```
composer require dungang/yii2-code-editor
```

> 使用

language default php . 可选值aspx / csharp / javascript / css / vbscript / html / xml / php

```
<?= $form->field($model, 'content')->widget(dungang\code\editor\CodeEditor::className(),['language'=>'java']) ?>
```
