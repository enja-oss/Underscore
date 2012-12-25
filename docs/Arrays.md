+  元文書: [underscore/index.html at a5ea59ad16d478a3643f6440ea94ac19ae86f0d4 · documentcloud/underscore · GitHub](https://github.com/documentcloud/underscore/blob/a5ea59ad16d478a3643f6440ea94ac19ae86f0d4/index.html "underscore/index.html at a5ea59ad16d478a3643f6440ea94ac19ae86f0d4 · documentcloud/underscore · GitHub")

## Array Functions [原文](http://underscorejs.org/#arrays)

Note: All array functions will also work on the arguments object. However, Underscore functions are not designed to work on "sparse" arrays.  
注: 全ての配列関数は、オブジェクトを引数に取ることができます。しかし、まばらな配列に対して実行できるようには設計されていません。  

###first `_.first(array, [n])` _Alias: head, take_ 
Returns the first element of an array. Passing n will return the first n elements of the array.  
配列の最初の要素を返します。nを与えると、配列の最初のn個の要素を返します。  

    _.first([5, 4, 3, 2, 1]);
    => 5

###initial `_.initial(array, [n])` 
Returns everything but the last entry of the array. Especially useful on the arguments object. Pass n to exclude the last n elements from the result.  
配列の最後の要素以外を返します。argumentsを引数に取る場合に特に便利です。nを与えると、配列の最後のn個の要素を返り値に含めません。  

    _.initial([5, 4, 3, 2, 1]);
    => [5, 4, 3, 2]

###last `_.last(array, [n])` 
Returns the last element of an array. Passing n will return the last n elements of the array.  
配列の最後の要素を返します。nを与えると、配列の最後のn個の要素を返します。  

    _.last([5, 4, 3, 2, 1]);
    => 1

###rest `_.rest(array, [index])` _Alias: tail, drop_ 
Returns the rest of the elements in an array. Pass an index to return the values of the array from that index onward.  
配列の最初の要素以外を返します。indexを与えると、そのindexから最後までの要素を取得します。  

    _.rest([5, 4, 3, 2, 1]);
    => [4, 3, 2, 1]

###compact `_.compact(array)` 
Returns a copy of the array with all falsy values removed. In JavaScript, false, null, 0, "", undefined and NaN are all falsy.  
falseを振る舞う要素を除いた配列のコピーを返します。JavaScriptにおいて、false、null、0、""、undefinedはfalse値を返します。  

    _.compact([0, 1, false, 2, '', 3]);
    => [1, 2, 3]

###flatten `_.flatten(array, [shallow])` 
Flattens a nested array (the nesting can be to any depth). If you pass shallow, the array will only be flattened a single level.  
入れ子になった配列を平坦化します。shallowにtrueを与えると、第一階層のみ平坦化されます。  

    _.flatten([1, [2], [3, [[4]]]]);
    => [1, 2, 3, 4];
    
    _.flatten([1, [2], [3, [[4]]]], true);
    => [1, 2, 3, [[4]]];

###without `_.without(array, [*values])` 
Returns a copy of the array with all instances of the values removed.  
指定の値を要素から除いた配列のコピーを返します。  

    _.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
    => [2, 3, 4]

###union `_.union(*arrays)` 
Computes the union of the passed-in arrays: the list of unique items, in order, that are present in one or more of the arrays.  
与えられた配列の要素から、ユニークな値を要素とする配列を返します。  

    _.union([1, 2, 3], [101, 2, 1, 10], [2, 1]);
    => [1, 2, 3, 101, 10]

###intersection `_.intersection(*arrays)` 
Computes the list of values that are the intersection of all the arrays. Each value in the result is present in each of the arrays.  
与えられたそれぞれの配列で、重複する値を要素とする配列を返します。  

    _.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]);
    => [1, 2]

###difference `_.difference(array, *others)` 
Similar to without, but returns the values from array that are not present in the other arrays.  
without関数と似ていますが、指定の配列に存在しない値を返します。  

    _.difference([1, 2, 3, 4, 5], [5, 2, 10]);
    => [1, 3, 4]

###uniq `_.uniq(array, [isSorted], [iterator])` _Alias: unique_ 
Produces a duplicate-free version of the array, using === to test object equality. If you know in advance that the array is sorted, passing true for isSorted will run a much faster algorithm. If you want to compute unique items based on a transformation, pass an iterator function.
値の比較に"==="を使用し、ユニークな値を要素とする配列を返します。配列がソートされても良ければ、isSortedにtrueを与えることで、より高速に実行されます。ユニークな値を独自に走査したい場合はiteratorに比較関数を渡して下さい。  

    _.uniq([1, 2, 1, 3, 1, 4]);
    => [1, 2, 3, 4]

###zip `_.zip(*arrays)` 
Merges together the values of each of the arrays with the values at the corresponding position. Useful when you have separate data sources that are coordinated through matching array indexes. If you're working with a matrix of nested arrays, zip.apply can transpose the matrix in a similar fashion.  
各配列の同じインデックスをキーとし、配列を要素とする配列を返します。配列データのindexをキーとするデータを扱う場合に便利です。

    _.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]);
    => [["moe", 30, true], ["larry", 40, false], ["curly", 50, false]]

###object `_.object(list, [values])` 
Converts arrays into objects. Pass either a single list of [key, value] pairs, or a list of keys, and a list of values.  
配列をオブジェクトに変換します。keyとvalueがペアになっている要素の配列、もしくはkeysのリストとvaluesのリスト、どちらかを引数に取ります。  

    _.object(['moe', 'larry', 'curly'], [30, 40, 50]);
    => {moe: 30, larry: 40, curly: 50}
    
    _.object([['moe', 30], ['larry', 40], ['curly', 50]]);
    => {moe: 30, larry: 40, curly: 50}

###indexOf `_.indexOf(array, value, [isSorted])` 
Returns the index at which value can be found in the array, or -1 if value is not present in the array. Uses the native indexOf function unless it's missing. If you're working with a large array, and you know that the array is already sorted, pass true for isSorted to use a faster binary search ... or, pass a number as the third argument in order to look for the first matching value in the array after the given index.  
指定の値と同じ値を持つ要素を配列から探し、見つかった最初のインデックスを取得します。配列中に存在しない場合-1を返します。ネイティブのindexOf関数がある場合はそれを使用します。大きな配列を扱う場合、且つ配列がソートされても良ければ、isSortedにtrueを与えることで、より高速に実行されます。また、第三引数に数字を与えると、そのインデックスから探索をします。  

    _.indexOf([1, 2, 3], 2);
    => 1

###lastIndexOf `_.lastIndexOf(array, value, [fromIndex])` 
Returns the index of the last occurrence of value in the array, or -1 if value is not present. Uses the native lastIndexOf function if possible. Pass fromIndex to start your search at a given index.  
指定の値と同じ値を持つ要素を配列から探し、見つかった最後のインデックスを取得します。配列中に存在しない場合-1を返します。ネイティブのlastIndexOf関数がある場合はそれを使用します。fromIndexを与えると、そのインデックスから探索をします。  

    _.lastIndexOf([1, 2, 3, 1, 2, 3], 2);
    => 4

###sortedIndex `_.sortedIndex(list, value, [iterator])` 
Uses a binary search to determine the index at which the value should be inserted into the list in order to maintain the list's sorted order. If an iterator is passed, it will be used to compute the sort ranking of each value, including the value you pass.  
指定の値が配列に挿入されソートされたときに、どの位置に挿入されるかを、二分探索で検索し取得します。iteratorを与えると、それを比較関数としてソートします。  

    _.sortedIndex([10, 20, 30, 40, 50], 35);
    => 3

###range `_.range([start], stop, [step])` 
A function to create flexibly-numbered lists of integers, handy for each and map loops. start, if omitted, defaults to 0; step defaults to 1. Returns a list of integers from start to stop, incremented (or decremented) by step, exclusive.  
簡易的なeachとmap機能を備えた、整数の配列を生成する関数です。startからstopまでの、stepずつインクリメント（またはデクリメント）された数字の配列を返します。startが省略されると0から開始され、デフォルトで1ずつインクリメントされます。  

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