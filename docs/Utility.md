+  元文書: [underscore/index.html at a5ea59ad16d478a3643f6440ea94ac19ae86f0d4 · documentcloud/underscore · GitHub](https://github.com/documentcloud/underscore/blob/a5ea59ad16d478a3643f6440ea94ac19ae86f0d4/index.html "underscore/index.html at a5ea59ad16d478a3643f6440ea94ac19ae86f0d4 · documentcloud/underscore · GitHub")

## Utility Functions [原文](http://underscorejs.org/#utility)

**noConflict** _.noConflict() [原文](http://underscorejs.org/#noConflict)

Give control of the "_" variable back to its previous owner. Returns a reference to the **Underscore** object.

競合以前の”_”変数に対するコントロールを提供します。**Underscore** オブジェクトへの参照が返されます。

```javascript 
var underscore = _.noConflict();
```

**identity**  _.identity(value) [原文](http://underscorejs.org/#identity)

Returns the same value that is used as the argument. In math: `f(x) = x`
This function looks useless, but is used throughout Underscore as a default iterator.

引数として渡された値と同じ値を返します。数学的に表現すると `f(x) = x` となります。
この関数は役に立たないように見えますが、Underscore全体でデフォルトのイテレータとして使用しています。

```javascript 
var moe = {name : 'moe'};
moe === _.identity(moe);
=> true
```

**times** _.times(n, iterator, [context]) [原文](http://underscorejs.org/#times)

Invokes the given iterator function n times. Each invocation of **iterator** is called with an `index` argument. 

_Note: this example uses the [chaining syntax](http://underscorejs.org/#chaining)._

渡された **iterator** 関数を **n** 回呼び出します。それぞれの **iterator** 呼び出しは、引数（context）の `index` と共に呼び出されます。

_注：この例では[Chaining構文](http://underscorejs.org/#chaining)を使用しています。_

```javascript 
_(3).times(function(n){ genie.grantWishNumber(n); });
```

**random** _.random(min, max) [原文](http://underscorejs.org/#random)

Returns a random integer between **min** and **max**, inclusive. If you only pass one argument, it will return a number between `0` and that number.

**min** 以上 **max** 以下の範囲でランダムな整数値を返します。引数を1つだけ渡した場合は、`0` から渡された値までの数値を返します。

```javascript 
_.random(0, 100);
=> 42
```

**mixin** _.mixin(object) [原文](http://underscorejs.org/#mixin)

Allows you to extend Underscore with your own utility functions. Pass a hash of `{name: function}` definitions to have your functions added to the Underscore object, as well as the OOP wrapper.

Underscoreはあなた独自のutility関数を含める形で拡張することを許しています。`{name: function}` ハッシュを満たすように定義することで、独自の関数をOOP（オブジェクト指向プログラミング）ラッパーのように、Underscoreオブジェクトへ追加できます。

```javascript 
_.mixin({
  capitalize : function(string) {
    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
  }
});
_("fabio").capitalize();
=> "Fabio"
```

**uniqueId** _.uniqueId([prefix]) [原文](http://underscorejs.org/#uniqueId)

Generate a globally-unique id for client-side models or DOM elements that need one. If **prefix** is passed, the id will be appended to it.

クライアント側のモデルまたはDOM要素のいずれかが必要な、グローバルなユニークIDを生成します。引数に **prefix** を渡した場合、IDが後ろに付きます。

```javascript 
_.uniqueId('contact_');
=> 'contact_104'
```

**escape** _.escape(string) [原文](http://underscorejs.org/#escape)

Escapes a string for insertion into HTML, replacing `&`, `<`, `>`, `"`, `'`, and `/` characters.

HTMLに挿入するため、次の文字列をエスケープします。 `&` 、 `<` 、 `>` 、 `"` 、 `'` 、 `/`。

```javascript 
_.escape('Curly, Larry & Moe');
=> "Curly, Larry &amp; Moe"
```

**unescape** _.unescape(string) [原文](http://underscorejs.org/#unescape)

The opposite of **[escape](http://underscorejs.org/#escape)**, replaces `&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#x27;` , 
and `&#x2F;` with their unescaped counterparts.

**[escape](http://underscorejs.org/#escape)** と反対で、上と対をなす文字列をエスケープされていない文字に置き換えます。 `&amp;` 、 `&lt;` 、 `&gt;` 、 `&quot;`、 `&#x27;` 、 
 `&#x2F;`


```javascript 
_.escape('Curly, Larry &amp; Moe');
=> "Curly, Larry & Moe"
```

**result** _.result(object, property) [原文](http://underscorejs.org/#result)

If the value of the named property is a function then invoke it; otherwise, return it.

プロパティの値が関数の場合は、それを実行し、そうでなければプロパティ値を返します。

```javascript 
var object = {cheese: 'crumpets', stuff: function(){ return 'nonsense'; }};
_.result(object, 'cheese');
=> "crumpets"
_.result(object, 'stuff');
=> "nonsense"
```

**template** _.template(templateString, [data], [settings]) [原文](http://underscorejs.org/#template)

Compiles JavaScript templates into functions that can be evaluated for rendering. 
Useful for rendering complicated bits of HTML from JSON data sources. 
Template functions can both interpolate variables, using `<%= … %>`, 
as well as execute arbitrary JavaScript code, with `<% … %>`. 
If you wish to interpolate a value, and have it be HTML-escaped, 
use `<%- … %>` When you evaluate a template function, 
pass in a **data** object that has properties corresponding to the template's free variables. 
If you're writing a one-off, you can pass the **data** object as the second parameter to **template** in order to render immediately instead of returning a template function. 
The **settings** argument should be a hash containing any `_.templateSettings` that should be overridden.

```javascript 
var compiled = _.template("hello: <%= name %>");
compiled({name : 'moe'});
=> "hello: moe"

var list = "<% _.each(people, function(name) { %> <li><%= name %></li> <% }); %>";
_.template(list, {people : ['moe', 'curly', 'larry']});
=> "<li>moe</li><li>curly</li><li>larry</li>"

var template = _.template("<b><%- value %></b>");
template({value : '<script>'});
=> "<b>&lt;script&gt;</b>"
```

You can also use `print` from within JavaScript code. This is sometimes more convenient than using `<%= ... %>`.

Javascriptコード内から `print` を使用することもできます。これは時に　`<%= ... %>` を使用するより便利です。

```javascript 
var compiled = _.template("<% print('Hello ' + epithet); %>");
compiled({epithet: "stooge"});
=> "Hello stooge."
```

If ERB-style delimiters aren't your cup of tea, 
you can change Underscore's template settings to use different symbols to set off interpolated code. 
Define an **interpolate** regex to match expressions that should be interpolated verbatim, 
an escape regex to match expressions that should be inserted after being HTML escaped, 
and an **evaluate** regex to match expressions that should be evaluated without insertion into the resulting string. 
You may define or omit any combination of the three. 
For example, to perform [Mustache.js](http://github.com/janl/mustache.js#readme) style templating:

ERBスタイルのデリミタが好みではない場合、UnderscoreのtemplateSettingsにて、コードの置き換えを異なるシンボルを使って行うよう変更することができます。

```javascript 
_.templateSettings = {
  interpolate : /\{\{(.+?)\}\}/g
};

var template = _.template("Hello {{ name }}!");
template({name : "Mustache"});
=> "Hello Mustache!"
```

By default, **template** places the values from your data in the local scope via the `with` statement. 
However, you can specify a single **variable** name with the variable setting. 
This can significantly improve the speed at which a template is able to render.

```javascript 
_.template("Using 'with': <%= data.answer %>", {answer: 'no'}, {variable: 'data'});
=> "Using 'with': no"
```

Precompiling your templates can be a big help when debugging errors you can't reproduce. 
This is because precompiled templates can provide line numbers and a stack trace, 
something that is not possible when compiling templates on the client. 
The **source** property is available on the compiled template function for easy precompilation.

```javascript 
<script>
  JST.project = <%= _.template(jstText).source %>;
</script>
```
