//     Underscore.js 1.4.3
//     http://underscorejs.org
//     (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore may be freely distributed under the MIT license.
//     元文書: https://github.com/documentcloud/underscore/blob/78887cffb53ed372811b5cc1239e0ecdf701a5c8/underscore.js
(function() {

  // Baseline setup
  // --------------

  // ルートオブジェクトを定める。ブラウザでは`window`を指し、サーバー環境では`global`を指す。
  var root = this;

  // 既存の`_`変数を保存する。
  var previousUnderscore = root._;

  // ループの繰り返しから抜け出す際に、返されるオブジェクトを定める。
  var breaker = {};

  // ミニファイ後（ただしGizpされていない）バージョンのバイト数を抑える。
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // コアなプロトタイプメソッドに素早くアクセスするために、簡易な参照用の変数を作成する。
  var push             = ArrayProto.push,
      slice            = ArrayProto.slice,
      concat           = ArrayProto.concat,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // 使用することが期待される、すべての **ECMAScript 5** ネイティブ関数の実装をここで宣言する。
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // 以降で使用するための、Underscoreオブジェクトへの安全な参照を作成する。
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // **Node.js** 用に古い`require()`APIへの後方互換性を持たせて、Undesrscoreオブジェクトを
  // エクスポートする。ブラウザであれば、Closure CompilerのAdvancedモードのため文字識別子を
  // 使用し、グローバルオブジェクトとして`_`を追加する。
  // Closure Compilerの"advanced"モードのため
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // 現在のバージョン。
  _.VERSION = '1.4.3';

  // Collection Functions
  // --------------------

  // 基本となる`each`（別名`forEach`）の実装。
  // ArrayやObjectなどのオブジェクトをビルトインの`forEach`によって制御する。
  // 使用可能であれば、ECMAScript5ネイティブの`forEach`に委譲する。
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (_.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // 各要素にイテレータを適用した結果を返す。
  // 使用可能であれば、ECMAScript5ネイティブの`map`に委譲する。
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **reduce**（別名`inject`または`foldl`）は値のリストからの単一の結果を組み上げる。
  // 使用可能であれば、ECMAScript5ネイティブの`reduce`に委譲する。
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // 右結合版のreduceであり、別名`foldr`。
  // 使用可能であれば、ECMAScript5ネイティブの`reduceRight`に委譲する。
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // 真性テストを通った最初の値を返す。別名`detect`。
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // 真性テストを通った、すべての要素を返す。
  // 使用可能であれば、ECMAScript5ネイティブの`filter`に委譲する。
  // 別名`select`。
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // 真性テストを通らなかった、すべての要素を返す。
  _.reject = function(obj, iterator, context) {
    return _.filter(obj, function(value, index, list) {
      return !iterator.call(context, value, index, list);
    }, context);
  };

  // すべての要素が、真性テストにマッチするかを確認する。
  // 使用可能であれば、ECMAScript5ネイティブの`filter`に委譲する。
  // 別名`all`。
  _.every = _.all = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // オブジェクト内の最低1つの要素が、真性テストにマッチするかを確認する。
  // 使用可能であれば、ECMAScript5ネイティブの`some`に委譲する。
  // 別名`any`。
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // 配列やオブジェクトが、指定した値を含んでいるか（`===`を使用して）確認する。
  // 別名`include`。
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // コレクション内の各項目のメソッドを（引数をつけて）呼び出す。
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    return _.map(obj, function(value) {
      return (_.isFunction(method) ? method : value[method]).apply(value, args);
    });
  };

  // コレクションの各要素からプロパティを取得してくるという、
  // `map`の一般的な使用用途における短縮バージョン。
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // コレクションの各要素から`key:value`ペアを持つオブジェクトのみを選択するという、
  // `filter`の一般的な使用用途における短縮バージョン。
  _.where = function(obj, attrs) {
    if (_.isEmpty(attrs)) return [];
    return _.filter(obj, function(value) {
      for (var key in attrs) {
        if (attrs[key] !== value[key]) return false;
      }
      return true;
    });
  };

  // 要素または、要素をベースにした計算結果の最大値を返す。
  // 要素数が65,535よりも長い配列を、最後まで検査することはできない。
  // 参考: https://bugs.webkit.org/show_bug.cgi?id=80797
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity, value: -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // 要素または、要素をベースにした計算結果の最小値を返す。
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity, value: Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // 配列をシャッフルする。
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // イテレータをルックアップして生成するのに利用する内部関数。
  var lookupIterator = function(value) {
    return _.isFunction(value) ? value : function(obj){ return obj[value]; };
  };

  // イテレータが提供する基準によって、オブジェクトの値をソートする。
  _.sortBy = function(obj, value, context) {
    var iterator = lookupIterator(value);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        index : index,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index < right.index ? -1 : 1;
    }), 'value');
  };

  // "group by"操作による集計に使われる内部関数。
  var group = function(obj, value, context, behavior) {
    var result = {};
    var iterator = lookupIterator(value || _.identity);
    each(obj, function(value, index) {
      var key = iterator.call(context, value, index, obj);
      behavior(result, key, value);
    });
    return result;
  };

  // 基準によってオブジェクトの値をグループ化する。
  // グループの基準にしたい属性の文字列か、基準を返す関数のいずれかを渡す。
  _.groupBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key, value) {
      (_.has(result, key) ? result[key] : (result[key] = [])).push(value);
    });
  };

  // 一定の基準でグループ化されたオブジェクトのインスタンス数をカウントする。
  // カウントの基準にしたい属性の文字列か、基準を返す関数のいずれかを渡す。
  _.countBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key) {
      if (!_.has(result, key)) result[key] = 0;
      result[key]++;
    });
  };

  // 並び順を維持するために、オブジェクトの挿入されるべき最小のインデックスを見つける比較関数を
  // 使用する。バイナリ検索が使用される。
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = iterator == null ? _.identity : lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // 安全に配列に変換して、あらゆるものをイテラブルにする。
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // オブジェクトの要素数を返す。
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // 配列の最初の要素を返す。**n**が渡されると、配列中の先頭から数えてN個の値を返す。
  // 別名`head`または`take`。**guard**を有効にすると、`_.map`と共に使える。
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // 配列の最後のエントリ以外のすべてを返す。argumentsオブジェクトで特に便利である。
  // **n**が渡されると、末尾から数えてN個を除いて、すべての値を返す。
  // **guard**を有効にすると、`_.map`と共に使える。
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // 配列の最後の要素を返す。**n**が渡されると、配列中の末尾から数えてN個の値を返す。
  // **guard**を有効にすると、`_.map`と共に使える。
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n != null) && !guard) {
      return slice.call(array, Math.max(array.length - n, 0));
    } else {
      return array[array.length - 1];
    }
  };

  // 配列の最初のエントリ以外のすべてを返す。別名`tail`または`drop`。
  // argumentsオブジェクトで特に便利である。**n**が渡されると、配列中のN個から後の
  // 値を返す。**guard**を有効にすると、`_.map`と共に使える。
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // 配列から、すべてのfalsyな値を取り除く。
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // 再帰的な`flatten`関数の内部実装。
  var flatten = function(input, shallow, output) {
    each(input, function(value) {
      if (_.isArray(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // 完全に平準化されるようにした配列を返す。
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // 指定した値を含まないようにした配列を返す。
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // 重複がないようにした配列を提供する。配列がすでにソートされているのであれば、
  // 高速なアルゴリズムを使用できるオプションがある。別名`unique`。
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // 渡されたすべての配列の各個別の要素の集合を含んだ配列を提供する。
  _.union = function() {
    return _.uniq(concat.apply(ArrayProto, arguments));
  };

  // 渡されたすべての配列の間で共通する各項目を含む配列を提供する。
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // ある配列と、他のいくつかの配列の間の差を取る。
  // ちょうど最初の配列に存在する要素のみが残る。
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // 単一の配列に、複数のリストを一緒にジップする。同じインデックスを持つ要素は一緒になる。
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(args, "" + i);
    }
    return results;
  };

  // リストをオブジェクトに変換する。単一の配列として`[key, value]`のペアか、
  // ひとつはkeyで、もうひとつは対応するvalueを示した、同じ長さをもつ2つの並列の配列の
  // いずれかを渡す。
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, l = list.length; i < l; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // ブラウザがindexOfを我々に提供していなければ（**MSIE**、おまえのことだ）
  // この関数が必要になる。配列の中からitemが最初に出現する位置を返し、
  // 配列にitemが含まれていない場合は-1を返す。
  // 使用可能であれば、ECMAScript5ネイティブの`indexOf`に委譲する。
  // 配列が巨大ですでに並び順がソートされていれば、**isSorted**に`true`を渡すと
  // バイナリ検索が使用される。
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, l = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, l + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < l; i++) if (array[i] === item) return i;
    return -1;
  };

  // 使用可能であれば、ECMAScript5ネイティブの`lastIndexOf`に委譲する。
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // 等差数列を含む、整数型の配列を生成する。Pythonネイティブの`range()`関数のポート。
  // [the Python documentation](http://docs.python.org/library/functions.html#range)を参照。
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // プロトタイプを設定するための再利用可能なコンストラクタ関数。
  var ctor = function(){};

  // 渡されたオブジェクトに結びつけられた関数を生成する（`this`の割り当てと引数はオプション）。
  // 引数を伴う結びつけは、`curry`として知られている。
  // 使用可能であれば、ECMAScript5ネイティブの`Function.bind`に委譲する。
  // `func`が未定義だったとき、早々に失敗するために`func.bind`を最初にチェックする。
  _.bind = function(func, context) {
    var args, bound;
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // オブジェクトが持つすべてのメソッドを、オブジェクトに結びつける。
  // オブジェクトに定義されたすべてのコールバックが、それに属していることを保証するのに役立つ。
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length == 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // 結果をストアすることで、高コストな関数をメモ化する。
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // 指定されたミリ秒数のあいだ関数を遅延させて、それを呼び出すときは引数を提供する。
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // 関数を遅延させて、現在のコールスタックがクリアされたあとにそれが実行されるようスケジュールする。
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // 呼び出されると、指定された時間のうちに最大でも1回だけトリガされる関数を返す。
  _.throttle = function(func, wait) {
    var context, args, timeout, result;
    var previous = 0;
    var later = function() {
      previous = new Date;
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = new Date;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // 連続して呼び出される限り、トリガされない関数を返す。
  // 関数はNミリ秒の間、呼び出されなかったのちに実行される。
  // `immediate`が渡された場合、連続した呼び出しの後にトリガする代わりに、
  // 呼び出しが始まった時点で関数をトリガする。
  _.debounce = function(func, wait, immediate) {
    var timeout, result;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) result = func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(context, args);
      return result;
    };
  };

  // どれだけ頻繁に呼び出すかを問わず、最大で1回だけ実行される関数を返す。
  // 遅延初期化に便利である。
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // ひとつめの関数を、ふたつめの関数に引数として渡し、引数を調整したり、
  // 前後でコードを実行したり、条件付きで元の関数を実行できる関数を返す。
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func];
      push.apply(args, arguments);
      return wrapper.apply(this, args);
    };
  };

  // 関数リストから、それぞれの関数がそれに続く関数の戻り値を引数に取る合成関数を返す。
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // N回呼び出された後に限って実行される関数を返す。
  _.after = function(times, func) {
    if (times <= 0) return func();
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // オブジェクトがもつプロパティの名前を取得する。
  // ECMAScript5のネイティブ`Object.keys`に委譲する。
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // オブジェクトがもつプロパティの値を取得する。
  _.values = function(obj) {
    var values = [];
    for (var key in obj) if (_.has(obj, key)) values.push(obj[key]);
    return values;
  };

  // オブジェクトを`[key, value]`ペアのリストに変換する。
  _.pairs = function(obj) {
    var pairs = [];
    for (var key in obj) if (_.has(obj, key)) pairs.push([key, obj[key]]);
    return pairs;
  };

  // オブジェクトのキーと値を反転する。値はシリアライズ可能でなければならない。
  _.invert = function(obj) {
    var result = {};
    for (var key in obj) if (_.has(obj, key)) result[obj[key]] = key;
    return result;
  };

  // オブジェクト上で利用可能な関数の名前の、ソートされたリストを返す。
  // 別名`methods`。
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // 渡されたオブジェクト(複数可)に含まれるすべてのプロパティで、
  // 指定されたオブジェクトを拡張する。
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // ホワイトリスト指定されたプロパティのみを含むオブジェクトのコピーを返す。
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // ブラックリスト指定されたプロパティを除いたオブジェクトのコピーを返す。
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // デフォルトのプロパティで、指定されたオブジェクトを埋める。
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] == null) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // オブジェクトの複製（浅いクローン）を作成する。
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // interceptorでobjを呼び出したあと、objを返す。
  // この方法の主な目的は、チェイン内の中間の結果に対して操作を実行するため、
  // "tap into"がメソッドチェインになることである。
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // `isEqual`のための内部的な再帰比較関数。
  var eq = function(a, b, aStack, bStack) {
    // 同一のオブジェクトは等しくなる。しかし`0 === -0`は同じではない。
    // Harmonyの`egal`提案を参照: http://wiki.ecmascript.org/doku.php?id=harmony:egal
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // `null == undefined`であるため厳密な比較を必要とする。
    if (a == null || b == null) return a === b;
    // ラップされたオブジェクトをアンラップする。
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // `[[Class]]`の名前を比較する。
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // 文字列、数値、日付、真偽値は値によって比較する。
      case '[object String]':
        // プリミティブなものと、それに対応するオブジェクトラッパは等価であり、
        // つまり`"5"`は`new String("5")`と等価である。
        return a == String(b);
      case '[object Number]':
        // `NaN`は等価だが反射的ではない。`egal`比較は他の数値のために実行される。
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // 日付と真偽値を数値のプリミティブな値に強制する。日付はミリ秒表現として比較される。
        // 無効な日付の`NaN`によるミリ秒表現は等価でないことに注意する。
        return +a == +b;
      // RegExpは、ソースになるパターンとフラグによって比較される。
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // 環状構造の等価性を前提とする。環状構造を検出するアルゴリズムは、
    // ES 5.1の15.12.3節における抽象操作`JO`に適合する。
    var length = aStack.length;
    while (length--) {
      // 線形探索。性能はユニークな入れ子の構造体の数に反比例する。
      if (aStack[length] == a) return bStack[length] == b;
    }
    // 最初のオブジェクトを、探索されたオブジェクトのスタックに追加する。
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // オブジェクトと配列を再帰的に比較する
    if (className == '[object Array]') {
      // 深い比較が必要かどうか判別するため、配列の長さを比較する。
      size = a.length;
      result = size == b.length;
      if (result) {
        // 数字でないプロパティを無視して、内容を深く比較する。
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // 異なったコンストラクタをもつオブジェクトたちは等価ではないが、
      // 違うフレームに由来した`Object`は、その限りでない。
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                               _.isFunction(bCtor) && (bCtor instanceof bCtor))) {
        return false;
      }
      // オブジェクトの深い比較をする。
      for (var key in a) {
        if (_.has(a, key)) {
          // 予期されるプロパティの数をカウントする。
          size++;
          // 各メンバを深く比較する。
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // 両方のオブジェクトが同じ数のプロパティを含んでいることを確認する。
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // 探索されたオブジェクトのスタックから、最初のオブジェクトを削除する。
    aStack.pop();
    bStack.pop();
    return result;
  };

  // 2つのオブジェクトが等しいかをチェックするため、深い比較を実行する。
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // 指定された配列・文字列・オブジェクトが空であるか？
  // "空の"オブジェクトは、自身のプロパティを数えられない。
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // 与えられた値がDOM要素であるか？
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // 与えられた値が配列であるか？
  // ECMA5のネイティブ`Array.isArray`に委譲する。
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // 与えられた値がオブジェクトであるか？
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // いくつかのisTypeメソッドを追加する: isArguments, isFunction, isString, isNumber, isDate, isRegExp
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // "Arguments"の型をどのようにしても検出できないブラウザ（えー、IEね）に
  // フォールバック版のメソッドを定義する。
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // それが適切であれば、`isFunction`を最適化する。
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // 与えられた値が有限数（finite）であるか？
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // 与えられた値が`NaN`であるか？（NaNは自身と等価でない唯一の数である）
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // 与えられた値が真偽値であるか？
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // 与えられた値がnullと等価であるか？
  _.isNull = function(obj) {
    return obj === null;
  };

  // 与えられた値がundefinedであるか？
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // 与えられたプロパティをオブジェクト自身が、直接持っているかをチェックするショートカット関数。
  //（言い換えればプロトタイプにあるものはそうでない）
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // **noConflict**モードでUnderscore.jsを実行するとき、`_`変数を以前のものに戻す。
  // そして、このUnderscoreオブジェクトの参照を返す。
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // デフォルトのイテレータ周りの一意性を維持する関数。
  _.identity = function(value) {
    return value;
  };

  // 関数を**n**回実行する。
  _.times = function(n, iterator, context) {
    var accum = Array(n);
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // minとmaxの間（minとmaxを候補に含む）で、ランダムな整数値を返す。
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + (0 | Math.random() * (max - min + 1));
  };

  // エスケープのための、HTMLエンティティのリスト
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // すぐ上に含まれているキーと値を含む正規表現。
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // HTMLに、またはHTMLから文字列を、エスケープまたはアンエスケープして挿入するための関数。
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // propertyの値が関数であればそれを呼び出し、そうでなければ値のままを返す。
  _.result = function(object, property) {
    if (object == null) return null;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Underscoreオブジェクトに自身のカスタム関数を追加する。
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // ユニークな整数値のIDを生成する（クライアントセッションの単位でユニーク）。
  // 一時的なDOMに割り振るidとして便利である。
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = '' + ++idCounter;
    return prefix ? prefix + id : id;
  };

  // デフォルトでは、UnderscoreはERBスタイルのテンプレートデリミタを使うが、
  // 異なるテンプレートデリミタを使用するには、次のテンプレート設定を変更する。
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // `templateSettings`をカスタマイズするとき、挿入・評価・エスケープ挿入の正規表現を
  // 定義したくない場合は、マッチしないことを保証するものを必要とする。
  var noMatch = /(.)^/;

  // 一部の文字は、文字リテラルに入れられるようにするため、エスケープする必要がある。
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // John Resigの実装に似た、JavaScriptマイクロテンプレーティング。
  // Underscoreのテンプレーティングは、任意のデリミタを制御して、空白を保持し、
  // 挿入されたコードの中のクオートを正しくエスケープする。
  _.template = function(text, data, settings) {
    settings = _.defaults({}, settings, _.templateSettings);

    // デリミタをひとつの正規表現に結合する。
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // テンプレートソースをコンパイルし、文字リテラルを適切にエスケープする。
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // 変数が指定されていない場合、ローカルスコープ内のデータを配置する。
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // プリコンパイルの便宜のためにコンパイル済み関数のソースを提供する。
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // ラッパーに委譲する"chain"関数を加える。
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // Underscoreを関数として呼んだ場合、オブジェクト指向スタイルで使えるようにした
  // ラップされたオブジェクトを返す。このラッパーは、Underscoreの全関数の
  // 代替バージョンを備えている。ラップされたオブジェクトは、チェーンできる。

  // 中間結果をチェーンし続けるヘルパー関数。
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // ラッパーオブジェクトに、すべてのUnderscoreの関数を加える。
  _.mixin(_);

  // すべてのArrayミューテータ関数（値や状態の変更を伴う関数）をラッパーに追加する。
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // すべてのArrayアクセサ関数をラッパーに追加する。
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // ラップされたUnderscoreオブジェクトのチェーンを開始する。
    chain: function() {
      this._chain = true;
      return this;
    },

    // ラップされてチェインされたオブジェクトから、結果を取り出す。
    value: function() {
      return this._wrapped;
    }

  });

}).call(this);