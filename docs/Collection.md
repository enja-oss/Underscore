+  元文書: [underscore/index.html at a5ea59ad16d478a3643f6440ea94ac19ae86f0d4 · documentcloud/underscore · GitHub](https://github.com/documentcloud/underscore/blob/a5ea59ad16d478a3643f6440ea94ac19ae86f0d4/index.html "underscore/index.html at a5ea59ad16d478a3643f6440ea94ac19ae86f0d4 · documentcloud/underscore · GitHub")

## コレクション関数(配列またはオブジェクト) [原文](http://underscorejs.org/#collections)

### each `_.each(list, iterator, [context])` _Alias: **forEach**_ [原文](http://underscorejs.org/#each)

**list** の要素を繰り返して、それぞれのターンで **iterator** 関数を動作させます。 **iterator** は 引数に渡されていれば **context** オブジェクトから派生します。それぞれの **iterator** の呼び出しは3つの引数から呼ばれます。： `(element, index, list)`です。 **list** がJavaScriptオブジェクトの場合、 **iterator** の引数は`(value, key, list)`となります。ネイティブの **forEach** 関数が存在した場合には委譲します。

```javascript
_.each([1, 2, 3], alert);
=> alerts each number in turn...
_.each({one : 1, two : 2, three : 3}, alert);
=> alerts each number value in turn...
```

### map `_.map(list, iterator, [context])` _Alias: **collect**_ [原文](http://underscorejs.org/#map)

変換関数( **iterator** )を通して、 **list** 中の各々の値をマッピングした値を持つ新しい配列を作成します。ネイティブの **map** メソッドが存在する場合は、そちらを代わりに使用します。 **list** がJavaScriptオブジェクトの場合は、 **iterator** の引数は`(value, key, list)`になります。

```javascript
_.map([1, 2, 3], function(num){ return num * 3; });
=>; [3, 6, 9]
_.map({one : 1, two : 2, three : 3}, function(num, key){ return num * 3; });
=> [3, 6, 9]
```
