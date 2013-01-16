+  元文書: [underscore/index.html at 13016c783570e5af0e1d1e716537916147de0843 · documentcloud/underscore · GitHub](https://github.com/documentcloud/underscore/blob/13016c783570e5af0e1d1e716537916147de0843/index.html)

## Function (uh, ahem) Functions

### bind `_.bind(function, object, [*arguments])`

**function** を **object** にバインドします。つまりfunction が呼ばれるとき、 *this* が **object** の値になるということです。
任意で、それらをあらかじめ埋めておくために **arguments** を **function** にバインドすることができます。
これは、 **partial application** としても知られています。

```javascript
var func = function(greeting){ return greeting + ': ' + this.name };  
func = _.bind(func, {name : 'moe'}, 'hi');  
func();  
=> 'hi: moe'
```


### bindAll `_.bindAll(object, [*methodNames])`

**methodNames** によって特定される **object** に複数のメソッドをバインドし、それらが呼ばれる際にそのオブジェクトのコンテキスト上で実行されます。
これは、イベントハンドラとして使われるfunctionをバインドすることはとても便利ですが、一方で一切無駄な *this* として実行されます。
もし **methodNames**　が渡されなかった場合、オブジェクトのfunctionプロパティの全てがバインドされます。

```javascript
var buttonView = {
  label   : 'underscore',
  onClick : function(){ alert('clicked: ' + this.label); },
  onHover : function(){ console.log('hovering: ' + this.label); }
};
_.bindAll(buttonView);
jQuery('#underscore_button').bind('click', buttonView.onClick);
=> When the button is clicked, this.label will have the correct value...
```


### memoize `.memoize(function, [hashFunction])`

計算結果をキャッシュすることで、与えられた **function** をメモ化します。
これは、実行の遅い計算を早くするのに便利です。
任意の引数である **hashFunction** を渡されると、元の関数の引数をベースとして、その結果を格納するためのハッシュキーとして使われます。
**hashFunction** のデフォルト値は、単純に最初の引数となります。

```javascript
var fibonacci = _.memoize(function(n) {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
});
```


### delay `_.delay(function, wait, [*arguments])`

**setTimeout** のように、 **wait** ミリセカンド経過した後に **function** を実行します。
任意の引数である *arguments* を渡した場合、それらは **function** が実行されるときに引き渡されます。

```javascript
var log = _.bind(console.log, console);
_.delay(log, 1000, 'logged later');
=> 'logged later' // Appears after one second.
```


### defer `_.defer(function, [*arguments])`

現在のコールスタックが空になるまで **function** の呼び出しを遅延させます。
これは遅延なしで **setTimeout** を使うのに似ています。
これは、コストのかかる計算やまとまったHTMLレンダリングをUIスレッドを更新によってブロックしないようにするのに便利です。
任意の引数である *arguments* を渡した場合、それらは **function** が呼び出されるときに引き渡されます。

```javascript
_.defer(function(){ alert('deferred'); });
// Returns from the function before the alert runs.
```


### throttle `_.throttle(function, wait)`

新しくスロットル化されたバージョンの関数を作成して返します。
それは繰り返し呼び出されたときでも、実際には多くても **wait** ミリ秒に一度しか元の関数を呼び出しません。
これは、追いつかないくらいの速度で発生するイベントの速度を制御するのに便利です。

```javascript
var throttled = _.throttle(updatePosition, 100);
$(window).scroll(throttled);
```


### debounce `_.debounce(function, wait, [immediate])`

新しくデバウンスされたバージョンの関数を作成して返します。
最後に呼ばれてから **wait** ミリ秒経過するまでその関数の実行を遅らせます。
これは、入力がストップした *後に* だけ実行される振る舞いを実装するのに便利です。例えば、Markdownのコメントのプレビューをレンダリングする、ウィンドウのリサイズ後のレイアウトの再計算、などです。

**immediate** パラメータに `true` を渡すと、 **debounce** がトリガする関数を後に実行する代わりに **wait** ミリ秒のインターバルの直前にトリガするようになります。 
これは、アクシデントによりダブルクリックされたサブミットボタンの2回目のイベントの発火を避けたいような状況で便利です。

```javascript
var lazyLayout = _.debounce(calculateLayout, 300);
$(window).resize(lazyLayout);
```


### once `_.once(function)`

たった一度だけ呼ばれる関数を作成します。
変更のある関数を繰り返し呼び出しても影響がありません。元の呼び出しと同じ値が返されます。
これは、booleanのフラグを持って後にそれを確認する代わりに、初期化関数として使うのに便利です。

```javascript
var initialize = _.once(createApplication);
initialize();
initialize();
// Application is only created once.
```


### after `_.after(count, function)`

**count** 回実行されたあとに初めて実行されるような関数を作成します。
全ての同期呼び出しが完了されるのを確実に待ちたい場合など、非同期レスポンスをまとめるのに便利です。

```javascript
var renderNotes = _.after(notes.length, render);
_.each(notes, function(note) {
  note.asyncSave({success: renderNotes});
});
// renderNotes is run once, after all notes have saved.
```


### wrap `_.wrap(function, wrapper)`

最初の **function** 引数を **wrapper** 関数の中にラップします。
これは **wrapper** 関数によって **function** が実行される前後に処理を実行させたり、引数を調整したり、
条件によってそれを実行したりすることができます。

```javascript
var hello = function(name) { return "hello: " + name; };
hello = _.wrap(hello, function(func) {
  return "before, " + func("moe") + ", after";
});
hello();
=> 'before, hello: moe, after'
```


### compose `_.compose(*functions)`

一連の **functions** を合成して返します。それぞれの関数はそれに続く関数の返り値を結果としてとります。
数式にすると、 *f()* と *g()* と *h()* を合成することで、 *f(g(h()))* が生成されます。

```javascript
var greet    = function(name){ return "hi: " + name; };
var exclaim  = function(statement){ return statement + "!"; };
var welcome = _.compose(exclaim, greet);
welcome('moe');
=> 'hi: moe!'
```
