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
