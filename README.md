# yii2-code-editor
CodeHighlightEditor.swf 封装。 CodeHighlightEditor 是一个开源项目http://code.google.com/p/code-syntax-highlight-editor
本项目使用的不是原版，而是经本人修改过的一个版本 [dungang/CodeHighlightEditor](https://github.com/dungang/CodeHighlightEditor)

> 安装

```
composer require dungang/yii2-code-editor
```

> 使用

language default php . 可选值aspx / csharp / javascript / css / vbscript / html / xml / php

```
<?= $form->field($model, 'content')->widget(dungang\code\editor\CodeEditor::className(),['language'=>'java']) ?>
```
