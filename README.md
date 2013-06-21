<a href="http://jakiestfu.github.com/Behave.js/"><img src="https://raw.github.com/jakiestfu/Behave.js/gh-pages/assets/hero.png"></a>

## What?
Behave.js is a lightweight library for adding IDE style behaviors to plain text areas, making it much more enjoyable to write code in.

<img src="http://i.imgur.com/cAwUx9v.gif">

* Supports <a href="http://www.youtube.com/watch?v=F1lJFlB-89Q" target="_blank">Partial IE6, IE7+, Firefox 8+, Safari 4+, Chrome X+, Opera 12</a>
* No Dependencies
* Custom Code/Behavior Fencing
* Hard and Soft Tabs
* Auto Open/Close Paranthesis, Brackets, Braces, Double and Single Quotes
* Auto delete a paired character
* Overwrite a paired character
* Multi-line Indentation/Unindentation
* Automatic Indentation

## Usage
```javascript
var editor = new Behave({
    textarea: document.getElementById('myTextarea')
});
```

## Defaults and Options
```javascript
var editor = new Behave({
    textarea: null,
    replaceTab: true,
    softTabs: true,
    tabSize: 4,
    autoOpen: true,
    overwrite: true,
    autoStrip: true,
    autoIndent: true,
    fence: false
});
```
<ul>
  <li>
    textarea : Textarea element to apply the behaviors to
  </li>
  <li>
    replaceTab : If set to true, replaceTab does three different things:</p>
<ul>
<li>Pressing the tab key will insert a tab instead of cycle input focus.</li>
<li>If you are holding shift, and there is a full tab before your cursor (whatever your tab may be), it will unindent.</li>
<li>If you have a range selected, both of the above rules will apply to all lines selected (multi-line indent/unindent)</li>
</ul>

  </li>
  <li>
    softTabs : If set to true, spaces will be used instead of a tab character
  </li>
  <li>
    tabSize : If <code>softTabs</code> is set to true, the number of spaces used is defined here. If set to false, the CSS property tab-size will be used to define hard tab sizes.
  </li>
  <li>
    autoOpen : If any of the following characters are typed, their counterparts are automatically added:  
    <ul>
    	<li><b>(</b> adds <b>)</b></li>
  		<li><b>{</b> adds <b>}</b></li>
  		<li><b>[</b> adds <b>]</b></li>
  		<li><b>"</b> adds <b>"</b></li>
  		<li><b>'</b> adds <b>'</b></li>
  	</ul>
  </li>
  <li>
    overwrite : If you type a closing character directly before an identical character, it will overwrite it instead of adding it. Best used with <code>autoOpen</code> set to true 
  </li>
  <li>
    autoStrip : If set to true, and your cursor is between two paired characters, pressing backspace will delete both instead of just the first 
  </li>
  <li>
    autoIndent : If set to true, automatic indentation of your code will be attempted. Best used with <code>autoOpen</code> set to true 
  </li>
  <li>
    fence : If you do not want to add behaviors to an entire textarea, you may use a fence. A fence is a string, any set of characters you want to denote where behaviors should be added. The format is Fence, New Line, Code, New Line, Fence.
  </li>
</ul>


## Methods
```javascript
editor.destroy();
```
<ul>
  <li>destroy : Removes all event listeners from your textarea</li>
</ul>


## Hooks
Hooks are fired at different times through Behave. To add your own hooks to extend the functionality of Behave, use the `BehaveHooks` function.
```javascript
BehaveHooks.add('keydown', function(data){
    // Your Code
});
```
The `add` function accepts two parameters, the hook name, and the function.
<dl class="params">
	<dt><span>hookName</span></dt>
	<dd><p>The hook you want to add an event for. May be a string or an array of hook names</p></dd>
	<dt><span>fn</span></dt>
	<dd><p>The function you want to fire on the hook event</p></dd>
</dl>

The following hook names are available for use:

<dl class="params">
	<dt><span>init:before</span></dt>
	<dd><p>Called before initializing Behave</p></dd>
	<dt><span>init:after</span></dt>
	<dd><p>Called after initializing Behave</p></dd>
	
	<dt><span>enter:before</span></dt>
	<dd><p>Called before inserting the text triggered by the enter key</p></dd>
	<dt><span>enter:after</span></dt>
	<dd><p>Called after inserting the text triggered by the enter key</p></dd>
	
	<dt><span>delete:before</span></dt>
	<dd><p>Called before deleting the text triggered by the delete key</p></dd>
	<dt><span>delete:after</span></dt>
	<dd><p>Called after deleting the text triggered by the delete key</p></dd>
	
	<dt><span>tab:before</span></dt>
	<dd><p>Called before inserting the text triggered by the tab key</p></dd>
	<dt><span>tab:after</span></dt>
	<dd><p>Called after inserting the text triggered by the tab key</p></dd>
	
	<dt><span>keyup</span></dt>
	<dd><p>Called before modifying the text triggered by the keyup event</p></dd>
	<dt><span>keydown</span></dt>
	<dd><p>Called after modifying the text triggered by the keydown event</p></dd>
</dl>
				
Each hook <b>excluding the init hooks</b> accept a single parameter, an object with the following information:
```javascript
{
    caret: {
	    pos: 5
    },
    editor: {
	    element: textarea
	    levelsDeep: 1,
	    text: 'foo{}'
    },
    lines: {
	    current: 1,
	    total: 1
    }
}
```

## In the Wild
If your website u ses Behave.js, let me know on Twitter [@jakiestfu](http://twitter.com/jakiestfu)

* [**Pste**: The Simplest Paste Tool](http://pste.co/)

## License 
**MIT Licensing**
	<p>Copyright (c) 2013 Jacob Kelley</p>
	<p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>
	<p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>
	<p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
</div>
