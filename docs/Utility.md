+  元文書: [underscore/index.html at a5ea59ad16d478a3643f6440ea94ac19ae86f0d4 · documentcloud/underscore · GitHub](https://github.com/documentcloud/underscore/blob/a5ea59ad16d478a3643f6440ea94ac19ae86f0d4/index.html "underscore/index.html at a5ea59ad16d478a3643f6440ea94ac19ae86f0d4 · documentcloud/underscore · GitHub")

## Utility Functions [原文](http://underscorejs.org/#utility)

### noConflict `_.noConflict()` [原文](http://underscorejs.org/#noConflict)

競合以前の”_”変数に対するコントロールを提供します。 **Underscore** オブジェクトへの参照が返されます。

```javascript 
var underscore = _.noConflict();
```

### identity `_.identity(value)` [原文](http://underscorejs.org/#identity)

引数として渡された値と同じ値を返します。数学的に表現すると `f(x) = x` となります。
この関数は役に立たないように見えますが、Underscore全体でデフォルトのイテレータとして使用しています。

```javascript 
var moe = {name : 'moe'};
moe === _.identity(moe);
=> true
```

### times `_.times(n, iterator, [context])` [原文](http://underscorejs.org/#times)

渡された **iterator** 関数を **n** 回呼び出します。それぞれの **iterator** 呼び出しは、引数（context）の `index` と共に呼び出されます。

_注：この例では[Chaining構文](http://underscorejs.org/#chaining)を使用しています。_

```javascript 
_(3).times(function(n){ genie.grantWishNumber(n); });
```

### random `_.random(min, max)` [原文](http://underscorejs.org/#random)

**min** 以上 **max** 以下の範囲でランダムな整数値を返します。引数を1つだけ渡した場合は、`0` から渡された値までの数値を返します。

```javascript 
_.random(0, 100);
=> 42
```

### mixin `_.mixin(object)` [原文](http://underscorejs.org/#mixin)

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

### uniqueId `_.uniqueId([prefix])` [原文](http://underscorejs.org/#uniqueId)

クライアント側のモデルまたはDOM要素のいずれかが必要な、グローバルなユニークIDを生成します。引数に **prefix** を渡した場合、IDが後ろに付きます。

```javascript 
_.uniqueId('contact_');
=> 'contact_104'
```

### escape `_.escape(string)` [原文](http://underscorejs.org/#escape)

HTMLに挿入するため、次の文字列をエスケープします。 `&` 、 `<` 、 `>` 、 `"` 、 `'` 、 `/`。

```javascript 
_.escape('Curly, Larry & Moe');
=> "Curly, Larry &amp; Moe"
```

### unescape `_.unescape(string)` [原文](http://underscorejs.org/#unescape)

**[escape](http://underscorejs.org/#escape)** と反対で、上と対をなす文字列をエスケープされていない文字に置き換えます。 `&amp;` 、 `&lt;` 、 `&gt;` 、 `&quot;`、 `&#x27;` 、 
 `&#x2F;`


```javascript 
_.escape('Curly, Larry &amp; Moe');
=> "Curly, Larry & Moe"
```

### result `_.result(object, property)` [原文](http://underscorejs.org/#result)

プロパティの値が関数の場合は、それを実行し、そうでなければプロパティ値を返します。

```javascript 
var object = {cheese: 'crumpets', stuff: function(){ return 'nonsense'; }};
_.result(object, 'cheese');
=> "crumpets"
_.result(object, 'stuff');
=> "nonsense"
```

### template `_.template(templateString, [data], [settings])` [原文](http://underscorejs.org/#template)

レンダリング用に評価するためJavaScriptテンプレートをコンパイルして関数化を行います。
JSONデータソースから複雑なHTMLの断片をレンダリングするために便利です。
template関数では `<%= … %>` と、任意のJavaScriptコードを実行することができる `<% … %>` とで変数を補間することができます。
変数の補間と同時にHTMLエンコードを行う場合には `<%- … %>` を利用してください。
template関数を評価する際はテンプレート側の変数に合致するプロパティを持つ **data** オブジェクトを渡してください。
1度しか利用しないテンプレートを書く場合に、 **data** オブジェクトを第二引数として渡すことで、 **template** を返す代わりにレンダリングをすぐに実行できます。
**settings** 引数は `_.templateSettings` でオーバーライドされたハッシュを含んでいる必要があります。

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

Javascriptコード内から `print` を使用することもできます。これは時に　`<%= ... %>` を使用するより便利です。

```javascript 
var compiled = _.template("<% print('Hello ' + epithet); %>");
compiled({epithet: "stooge"});
=> "Hello stooge."
```

ERBスタイルのデリミタが好みではない場合、UnderscoreのtemplateSettingsにて、コードの置き換えを異なるシンボルを使って行うよう変更することができます。
interpolateは、一致したものを補完する正規表現式を定義してください（デフォルトは`<%=　%>`用）。
escapeは、HTMLエスケープした後の値を挿入する正規表現式を定義してください（デフォルトは`<%-　%>`用）。
evaluateは、結果文字列に挿入することなく評価される正規表現式を定義してください（デフォルトは`<%　%>`用）。
上の3つについて、それぞれ定義、省略することができます。
この例では、[Mustache.js](http://github.com/janl/mustache.js#readme)スタイルのテンプレートを真似ています。

```javascript 
_.templateSettings = {
  interpolate : /\{\{(.+?)\}\}/g
};

var template = _.template("Hello {{ name }}!");
template({name : "Mustache"});
=> "Hello Mustache!"
```

デフォルトでは、 **template** の場所の値は、 **with** ステートメントによってローカルスコープの中のデータから探します。
ただし、`variable` を設定することで、単一の変数名を指定することができます。これにより、テンプレートがレンダリングするスピードを大幅に改善することができます。

```javascript 
_.template("Using 'with': <%= data.answer %>", {answer: 'no'}, {variable: 'data'});
=> "Using 'with': no"
```

再現が難しいエラーをデバッグするときに、テンプレートをプリコンパイルすると、大きな助けとなるります。これは、プリコンパイルされたテンプレートが、クライアントでテンプレートがコンパイルされる際のエラーについて、行番号とスタックトレースを提供できるためです。
**source** プロパティは、コンパイルされたテンプレート上において、簡単にプリコンパイルする関数を利用するためのものです。

```html 
<script>
  JST.project = <%= _.template(jstText).source %>;
</script>
```
