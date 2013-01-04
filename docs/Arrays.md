+  元文書: [underscore/index.html at a5ea59ad16d478a3643f6440ea94ac19ae86f0d4 · documentcloud/underscore · GitHub](https://github.com/documentcloud/underscore/blob/a5ea59ad16d478a3643f6440ea94ac19ae86f0d4/index.html "underscore/index.html at a5ea59ad16d478a3643f6440ea94ac19ae86f0d4 · documentcloud/underscore · GitHub")

## Array Functions [原文](http://underscorejs.org/#arrays)

注: 全ての配列関数は、オブジェクトを引数に取ることができます。しかし、まばらな配列に対して実行できるようには設計されていません。  

###first `_.first(array, [n])` _Alias: head, take_ 
配列の最初の要素を返します。 *n* を与えると、配列の最初の *n* 個の要素を返します。  

    _.first([5, 4, 3, 2, 1]);
    => 5

###initial `_.initial(array, [n])` 
配列の最後の要素以外を返します。argumentsを引数に取る場合に特に便利です。 *n* を与えると、配列の最後の *n* 個の要素を返り値に含めません。  

    _.initial([5, 4, 3, 2, 1]);
    => [5, 4, 3, 2]

###last `_.last(array, [n])` 
配列の最後の要素を返します。 *n* を与えると、配列の最後の *n* 個の要素を返します。  

    _.last([5, 4, 3, 2, 1]);
    => 1

###rest `_.rest(array, [index])` _Alias: tail, drop_ 
配列の残りの要素を返します。 *index* を与えると、その index から前方にある配列の値を取得します。  

    _.rest([5, 4, 3, 2, 1]);
    => [4, 3, 2, 1]

###compact `_.compact(array)` 
falseを振る舞う要素を除いた配列のコピーを返します。JavaScriptにおいて、false、null、0、""、undefined、そしてNaNはfalse値を振る舞います。  

    _.compact([0, 1, false, 2, '', 3]);
    => [1, 2, 3]

###flatten `_.flatten(array, [shallow])` 
入れ子になった配列を平坦化します(入れ子はどんな深度でも可能です)。 *shallow* 引数を渡すと、入れ子の配列は第一階層のみ平坦化されます。  

    _.flatten([1, [2], [3, [[4]]]]);
    => [1, 2, 3, 4];
    
    _.flatten([1, [2], [3, [[4]]]], true);
    => [1, 2, 3, [[4]]];

###without `_.without(array, [*values])` 
values引数で指定した値を配列から除いた配列のコピーを返します。  

    _.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
    => [2, 3, 4]

###union `_.union(*arrays)` 
渡された配列群から和集合を算出します: 1つないしそれ以上の配列にある、ユニークなアイテムが順番になったリストとなります。  

    _.union([1, 2, 3], [101, 2, 1, 10], [2, 1]);
    => [1, 2, 3, 101, 10]

###intersection `_.intersection(*arrays)` 
すべての配列の共通集合となる値のリストを算出します。結果となる値はそれぞれの配列内に存在することになります。  

    _.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]);
    => [1, 2]

###difference `_.difference(array, *others)` 
_without_ 関数と似ていますが、other引数で指定した配列に存在しない値を返します。  

    _.difference([1, 2, 3, 4, 5], [5, 2, 10]);
    => [1, 3, 4]

###uniq `_.uniq(array, [isSorted], [iterator])` _Alias: unique_ 
値の比較に"==="を使用し、ユニークな値を要素とする配列を返します。事前に配列がソートされていることがわかっていれば、 *isSorted* にtrueを与えることで、より高速に実行されます。ユニークな値を変形によって算出したい場合は *iterator* 引数に関数を渡して下さい。

    _.uniq([1, 2, 1, 3, 1, 4]);
    => [1, 2, 3, 4]

###zip `_.zip(*arrays)` 
それぞれの配列を同じ場所にある値を元に結合します。配列のインデックスを通じて強調している分離したデータソースを扱う場合に便利です。入れ子になった配列のマトリックスを使用する場合、 *zip.apply* を利用することで同様に結合することができます。

    _.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]);
    => [["moe", 30, true], ["larry", 40, false], ["curly", 50, false]]

###object `_.object(list, [values])` 
配列をオブジェクトに変換します。`[key, value]`のペアとなる1つのリスト、もしくはkeysのリストとvaluesのリスト、どちらかを引数として渡してください。  

    _.object(['moe', 'larry', 'curly'], [30, 40, 50]);
    => {moe: 30, larry: 40, curly: 50}
    
    _.object([['moe', 30], ['larry', 40], ['curly', 50]]);
    => {moe: 30, larry: 40, curly: 50}

###indexOf `_.indexOf(array, value, [isSorted])` 
value引数で指定した値のある配列のインデックスを返します。配列に存在しない場合は-1を返します。ネイティブの indexOf 関数がある場合はそれを使用します。大きな配列を扱い場合、かつ配列がソートされている場合には、 *isSorted* に `true`を与えることでより高速なバイナリサーチを行います。あるいは、第三引数に数字を渡すことでそのインデックス移行から探索を行います。

    _.indexOf([1, 2, 3], 2);
    => 1

###lastIndexOf `_.lastIndexOf(array, value, [fromIndex])` 
value引数で指定した値のある配列の最後のインデックスを取得します。配列中に存在しない場合-1を返します。ネイティブの lastIndexOf 関数がある場合はそれを使用します。 *fromIndex* を与えると、そのインデックスから探索をします。  

    _.lastIndexOf([1, 2, 3, 1, 2, 3], 2);
    => 4

###sortedIndex `_.sortedIndex(list, value, [iterator])` 
value引数に渡された値がリストのソート済みの順序を保持できるようにインデックスのどの位置に挿入されるべきかをバイナリサーチを利用して測定します。*iterator* が渡された場合、渡した値を含めて、それぞれの値のソート順序を算出します。  

    _.sortedIndex([10, 20, 30, 40, 50], 35);
    => 3

###range `_.range([start], stop, [step])` 
柔軟に番号付けされた整数のリストを生成する関数です。eachとmapのループ内で便利に利用できます。start引数が省略された場合は0がデフォルト値、stepのデフォルト値は1となります。startからstopまでの、stepずつインクリメント（またはデクリメント）された数字の配列を返します。排他処理。  

    _.range(10);
    => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    _.range(1, 11);
    => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    _.range(0, 30, 5);
    => [0, 5, 10, 15, 20, 25]
    _.range(0, -10, -1);
    => [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]
    _.range(0);
    => []