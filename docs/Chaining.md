+  元文書: [underscore/index.html at a5ea59ad16d478a3643f6440ea94ac19ae86f0d4 · documentcloud/underscore · GitHub](https://github.com/documentcloud/underscore/blob/a5ea59ad16d478a3643f6440ea94ac19ae86f0d4/index.html "underscore/index.html at a5ea59ad16d478a3643f6440ea94ac19ae86f0d4 · documentcloud/underscore · GitHub")

## Chaining [原文](http://underscorejs.org/#chaining)

Underscoreは好みに応じてオブジェクト指向スタイル、関数スタイルとしても利用することができます。以下の2行のコードは数字のリストを2倍にするまったく同じ手法となります。

```
_.map([1, 2, 3], function(n){ return n * 2; });
_([1, 2, 3]).map(function(n){ return n * 2; });
```

`chain`の呼び出しは将来的にすべてのメソッドコールに対して内包されたオブジェクトを返すことになります。計算が終了した際は最終的な値を取得するのに `value` を利用してください。以下は歌詞の中の単語カウントを取得するために **`map`/`flatten`/`reduce`** をチェーンした例となります。

```
var lyrics = [
  {line : 1, words : "I'm a lumberjack and I'm okay"},
  {line : 2, words : "I sleep all night and I work all day"},
  {line : 3, words : "He's a lumberjack and he's okay"},
  {line : 4, words : "He sleeps all night and he works all day"}
];

_.chain(lyrics)
  .map(function(line) { return line.words.split(' '); })
  .flatten()
  .reduce(function(counts, word) {
    counts[word] = (counts[word] || 0) + 1;
    return counts;
}, {}).value();

=> {lumberjack : 2, all : 4, night : 2 ... }
```

加えて[配列のプロトタイプメソッド](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/prototype)はチェーンされたUnderscoreオブジェクトを通してプロキシされています。そのため、チェーンに対して `reverse` や `push` を滑り込ませて、配列の変更を続けることもできます。

### chain `_.chain(obj)`

内包されたオブジェクトを返します。このオブジェクトでメソッドを呼び出すと `value` が利用されるまでは内包されたオブジェクトを返し続けます。

```
var stooges = [{name : 'curly', age : 25}, {name : 'moe', age : 21}, {name : 'larry', age : 23}];
var youngest = _.chain(stooges)
  .sortBy(function(stooge){ return stooge.age; })
  .map(function(stooge){ return stooge.name + ' is ' + stooge.age; })
  .first()
  .value();
=> "moe is 21"
``` 

### value `_(obj).value()`

内包されたオブジェクトの値を抽出します。

```
_([1, 2, 3]).value();
=> [1, 2, 3]
``` 