<a href="http://jakiestfu.github.com/Behave.js/"><img src="https://raw.github.com/jakiestfu/Behave.js/gh-pages/assets/hero.png"></a>

## What?
Behave.js is a lightweight library for adding IDE style behaviors to plain text areas, making it much more enjoyable to write code in.
* <a href="http://www.youtube.com/watch?v=F1lJFlB-89Q" target="_blank">Supports IE7+ (Does that make you randy?)</a>
* No Dependencies
* Custom Code/Behavior Fencing
* Hard and Soft Tabs
* Auto Open/Close Paranthesis, Brackets, Braces, Double and Single Quotes
* Auto delete a paired character
* Overwrite a paired character
* Multi-line Indentation/Unindentation
* Automatic Indentation
* Chrome X+, Firefox 8+, Safari X+, IE7+

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


## License 
**MIT Licensing**
	<p>Copyright (c) 2013 Jacob Kelley</p>
	<p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>
	<p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>
	<p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
</div>
