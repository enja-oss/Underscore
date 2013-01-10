+  元文書: [underscore/index.html at 13016c783570e5af0e1d1e716537916147de0843 · documentcloud/underscore · GitHub](https://github.com/documentcloud/underscore/blob/13016c783570e5af0e1d1e716537916147de0843/index.html)


## Function (uh, ahem) Functions

### bind `_.bind(function, object, [*arguments])`

Bind a **function** to an **object**, meaning that whenever
the function is called, the value of *this* will be the **object**.
Optionally, bind **arguments** to the **function** to pre-fill them,
also known as **partial application**.

**function** を **object** にバインドします。つまりfunction が呼ばれるとき、
*this* が **object** の値になるということです。
任意で、それらをあらかじめ埋めておくために **arguments** を **function** にバインドすることができます。
これは、 **partial application** としても知られています。

```javascript
var func = function(greeting){ return greeting + ': ' + this.name };  
func = _.bind(func, {name : 'moe'}, 'hi');  
func();  
=> 'hi: moe'
```


### bindAll `_.bindAll(object, [*methodNames])`

Binds a number of methods on the **object**, specified by
**methodNames**, to be run in the context of that object whenever they
are invoked. Very handy for binding functions that are going to be used
as event handlers, which would otherwise be invoked with a fairly useless
*this*. If no **methodNames** are provided, all of the object's
function properties will be bound to it.

**methodNames** によって特定される **object** に複数のメソッドをバインドします。
それらが呼ばれた時そのオブジェクトのコンテキスト上で実行されます。
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

Memoizes a given **function** by caching the computed result. Useful
for speeding up slow-running computations. If passed an optional
**hashFunction**, it will be used to compute the hash key for storing
the result, based on the arguments to the original function. The default
**hashFunction** just uses the first argument to the memoized function
as the key.

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

Much like **setTimeout**, invokes **function** after **wait**
milliseconds. If you pass the optional *arguments*, they will be
forwarded on to the **function** when it is invoked.

**setTimeout** のように、 **wait** ミリセカンド経過した後に **function** を実行します。
任意の引数である *arguments*　を渡した場合、それらは **function** が実行されるときに引き渡されます。

```javascript
var log = _.bind(console.log, console);
_.delay(log, 1000, 'logged later');
=> 'logged later' // Appears after one second.
```


### defer `_.defer(function, [*arguments])`

Defers invoking the **function** until the current call stack has cleared,
similar to using **setTimeout** with a delay of 0. Useful for performing
expensive computations or HTML rendering in chunks without blocking the UI thread
from updating. If you pass the optional **arguments**, they will be
forwarded on to the **function** when it is invoked.

現在のコールスタックが空になるまで **function** の呼び出しを遅延させます。
これは遅延なしで **setTimeout** を使うのに似ています。
これは、UIスレッドを更新によってブロックせずに、コストのかかる計算やまとまったHTMLレンダリングをするのに便利です。
任意の引数である *arguments*　を渡した場合、それらは **function** が呼び出されるときに引き渡されます。

```javascript
_.defer(function(){ alert('deferred'); });
// Returns from the function before the alert runs.
```


### throttle `_.throttle(function, wait)`

Creates and returns a new, throttled version of the passed function,
that, when invoked repeatedly, will only actually call the original function
at most once per every **wait**
milliseconds. Useful for rate-limiting events that occur faster than you
can keep up with.

新しくスロットル化されたバージョンの関数を作成して返します。
それは繰り返し呼び出されたときでも、実際には多くても **wait**　ミリ秒に一度しか元の関数を呼び出しません。
これは、レートを制限したイベントをあなたが追いつくよりも早く発生させるのに便利です。

```javascript
var throttled = _.throttle(updatePosition, 100);
$(window).scroll(throttled);
```


### debounce `_.debounce(function, wait, [immediate])`

Creates and returns a new debounced version of the passed function that
will postpone its execution until after
**wait** milliseconds have elapsed since the last time it
was invoked. Useful for implementing behavior that should only happen
*after* the input has stopped arriving. For example: rendering a
preview of a Markdown comment, recalculating a layout after the window
has stopped being resized, and so on.

新しくデバウンスされたバージョンの関数を作成して返します。
最後に呼ばれてから **wait** ミリ秒経過するまでその関数の実行を遅らせます。
これは、入力がストップした*後に*だけ実行される振る舞いを実装するのに便利です。

Pass `true` for the **immediate** parameter to cause
**debounce** to trigger the function on the leading instead of the
trailing edge of the **wait** interval. Useful in circumstances like
preventing accidental double-clicks on a "submit" button from firing a
second time.

**immediate** パラメータに `true` を渡すと、 **wait** ミリ秒のインターバルの後すぐ先行する関数をトリガするようになります。 
これは、偶然にもサブミットボタンをダブルクリックされることを避けたいような状況で便利です。

```javascript
var lazyLayout = _.debounce(calculateLayout, 300);
$(window).resize(lazyLayout);
```


### once `_.once(function)`

Creates a version of the function that can only be called one time.
Repeated calls to the modified function will have no effect, returning
the value from the original call. Useful for initialization functions,
instead of having to set a boolean flag and then check it later.

たった一度だけ呼ばれる関数を作成します。
変更のある関数を繰り返し呼び出しても影響がありません。元の呼び出しと同じ値が返されます。
これは、booleanのフラグを持って後にそれを確認するような、初期化関数として使うのに便利です。

```javascript
var initialize = _.once(createApplication);
initialize();
initialize();
// Application is only created once.
```


### after `_.after(count, function)`

Creates a version of the function that will only be run after first
being called **count** times. Useful for grouping asynchronous responses,
where you want to be sure that all the async calls have finished, before
proceeding.

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

Wraps the first **function** inside of the **wrapper** function,
passing it as the first argument. This allows the **wrapper** to
execute code before and after the **function** runs, adjust the arguments,
and execute it conditionally.

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

Returns the composition of a list of **functions**, where each function
consumes the return value of the function that follows. In math terms,
composing the functions *f()*, *g()*, and *h()* produces
*f(g(h()))*.

一連の **functions** を合成して返します。それぞれの関数はそれに続く関数の返り値を結果としてとります。
数式にすると、 *f()* と *g()* と *h()* を合成することで、 *f(g(h()))* が生成されます。

```javascript
var greet    = function(name){ return "hi: " + name; };
var exclaim  = function(statement){ return statement + "!"; };
var welcome = _.compose(exclaim, greet);
welcome('moe');
=> 'hi: moe!'
```
