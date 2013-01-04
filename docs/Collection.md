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
=> [3, 6, 9]
_.map({one : 1, two : 2, three : 3}, function(num, key){ return num * 3; });
=> [3, 6, 9]
```

### reduce `_.reduce(list, iterator, memo, [context])` _Alias: **inject, foldl**_ [原文](http://underscorejs.org/#reduce)

**inject** や **reduce** として知られている、 **reduce** は **list** の値を単一の値に要約します。 **Memo** は減算の最初の状態で、 **iterator** のそれぞれ成功した段階でこれを返します。イテレータは4つの引数を取ります：`memo`、`value`と繰り返しの`index`(またはキー)、そして最後に`list`全ての参照です。

```javascript
var sum = _.reduce([1, 2, 3], function(memo, num){ return memo + num; }, 0);
=> 6
```

### reduceRight `_.reduceRight(list, iterator, memo, [context])` _Alias: **foldr**_ [原文](http://underscorejs.org/#reduceRight)

右から結合するバージョンの **reduce** です。存在する場合は、JavaScript 1.8バージョンの **reduceRight** に委譲します。 **Foldr** は遅延評価される言語としてのJavaScriptでは有用ではありません。

```javascript
var list = [[0, 1], [2, 3], [4, 5]];
var flat = _.reduceRight(list, function(a, b) { return a.concat(b); }, []);
=> [4, 5, 2, 3, 0, 1]
```

### find `_.find(list, iterator, [context])` _Alias: **detect**_ [原文](http://underscorejs.org/#find)

**list** 内のそれぞれの値を調べていき、テストをtrueで通った最初のもの(**iterator**)を返します。この関数は適合した要素を見つけ次第返し、全てのリストを探索はしません。

```javascript
var even = _.find([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
=> 2
```

### filter `_.filter(list, iterator, [context])` _Alias: **select**_ [原文](http://underscorejs.org/#filter)

**list** 内のそれぞれの値を調べていき、テストをtrueで通った全ての値(**iterator**)を返します。ネイティブの **filter** メソッドがある場合には委譲します。

```javascript
var evens = _.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
=> [2, 4, 6]
```

### where `_.where(list, properties)` [原文](http://underscorejs.org/#where)

**list** 内のそれぞれの値を調べていき、 **properties** で列挙された中で全てのkey-valueペアを含んだ値を全て配列として返します。

```javascript
_.where(listOfPlays, {author: "Shakespeare", year: 1611});
=> [{title: "Cymbeline", author: "Shakespeare", year: 1611},
    {title: "The Tempest", author: "Shakespeare", year: 1611}]
```

### reject `_.reject(list, iterator, [context])` [原文](http://underscorejs.org/#reject)

テストをtrueで通った要素(**iterator**)を除いた **list** 内の値を返します。 **filter** の反対です。

```javascript
var odds = _.reject([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
=> [1, 3, 5]
```

### every `_.every(list, iterator, [context])` _Alias: **all**_ [原文](http://underscorejs.org/#every)

**list** 内の値が全て **iterator** のテストをtrueで通った場合に、 _true_ を返します。存在する場合はネイティブメソッドの **every** に委譲します。

```javascript
_.every([true, 1, null, 'yes'], _.identity);
=> false
```

### some `_.some(list, [iterator], [context])` _Alias: **any**_ [原文](http://underscorejs.org/#some)

**list** 内の値が1つでも **iterator** のテストをtrueで通った場合に、 _true_ を返します。trueを返す要素が見つかった場合は、探索を中断して、リストを遡るのを止めます。

```javascript
_.some([null, 0, 'yes', false]);
=> true
```

