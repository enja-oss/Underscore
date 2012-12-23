
## Object Functions [原文](http://underscorejs.org/#objects)

### keys `_.keys(object)` [原文](http://underscorejs.org/#keys)

Retrieve all the names of the **object**'s properties.

```javascript
_.keys({one : 1, two : 2, three : 3});
=> ["one", "two", "three"]
```

### values `_.values(object)` [原文](http://underscorejs.org/#values)

Return all of the values of the **object**'s properties.

```javascript
_.values({one : 1, two : 2, three : 3});
=> [1, 2, 3]
```

### pairs `_.pairs(object)` [原文](http://underscorejs.org/#pairs)

Convert an object into a list of `[key, value]` pairs.

```javascript
_.pairs({one: 1, two: 2, three: 3});
=> [["one", 1], ["two", 2], ["three", 3]]
```

### invert `_.invert(object)` [原文](http://underscorejs.org/#invert)

Returns a copy of the **object** where the keys have become the values and the values
the keys. For this to work, all of your object's values should be unique and string
serializable.

```javascript
_.invert({Moe: "Moses", Larry: "Louis", Curly: "Jerome"});
=> {Moses: "Moe", Louis: "Larry", Jerome: "Curly"};
```

### functions `_.functions(object)` _Alias: methods_ [原文](http://underscorejs.org/#object-functions)

Returns a sorted list of the names of every method in an object — that is to say, the
name of every function property of the object.

```javascript
_.functions(_);
=> ["all", "any", "bind", "bindAll", "clone", "compact", "compose" ...
```

### extend `_.extend(destination, *sources)` [原文](http://underscorejs.org/#extend)

Copy all of the properties in the **source** objects over to the **destination** object, and
return the **destination** object. It's in-order, so the last source will override properties
of the same name in previous arguments.

```javascript
_.extend({name : 'moe'}, {age : 50});
=> {name : 'moe', age : 50}
```

### pick `_.pick(object, *keys)` [原文](http://underscorejs.org/#pick)

Return a copy of the **object**, filtered to only have values for the whitelisted **keys** (or array of valid keys).

```javascript
_.pick({name : 'moe', age: 50, userid : 'moe1'}, 'name', 'age');
=> {name : 'moe', age : 50}
```

### omit `_.omit(object, *keys)` [原文](http://underscorejs.org/#omit)

Return a copy of the **object**, filtered to omit the blacklisted **keys** (or array of keys).

```javascript
_.omit({name : 'moe', age : 50, userid : 'moe1'}, 'userid');
=> {name : 'moe', age : 50}
```

### defaults `_.defaults(object, *defaults)` [原文](http://underscorejs.org/#defaults)

Fill in null and undefined properties in **object** with values from the **defaults** objects,
and return the **object**. As soon as the property is filled, further defaults will have no effect.

```javascript
var iceCream = {flavor : "chocolate"};
_.defaults(iceCream, {flavor : "vanilla", sprinkles : "lots"});
=> {flavor : "chocolate", sprinkles : "lots"}
```

### clone `_.clone(object)` [原文](http://underscorejs.org/#clone)

Create a shallow-copied clone of the **object**. Any nested objects or arrays will be
copied by reference, not duplicated.

```javascript
_.clone({name : 'moe'});
=> {name : 'moe'};
```

### tap `_.tap(object, interceptor)` [原文](http://underscorejs.org/#tap)

Invokes **interceptor** with the **object**, and then returns **object**. The primary purpose of
this method is to "tap into" a method chain, in order to perform operations on
intermediate results within the chain.

```javascript
_.chain([1,2,3,200])
  .filter(function(num) { return num % 2 == 0; })
  .tap(alert)
  .map(function(num) { return num * num })
  .value();
=> // [2, 200] (alerted)
=> [4, 40000]
```

### has `_.has(object, key)` [原文](http://underscorejs.org/#has)

Does the object contain the given key? Identical to `object.hasOwnProperty(key)`, but
uses a safe reference to the `hasOwnProperty` function, in case it's been [overridden accidentally](http://www.devthought.com/2012/01/18/an-object-is-not-a-hash/).

```javascript
_.has({a: 1, b: 2, c: 3}, "b");
=> true
```

### isEqual `_.isEqual(object, other)` [原文](http://underscorejs.org/#isEqual)

Performs an optimized deep comparison between the two objects, to determine if they
should be considered equal.

```javascript
var moe   = {name : 'moe', luckyNumbers : [13, 27, 34]};
var clone = {name : 'moe', luckyNumbers : [13, 27, 34]};
moe == clone;
=> false
_.isEqual(moe, clone);
=> true
```

### isEmpty `_.isEmpty(object)` [原文](http://underscorejs.org/#isEmpty)

Returns _true_ if **object** contains no values.

```javascript
_.isEmpty([1, 2, 3]);
=> false
_.isEmpty({});
=> true
```

### isElement `_.isElement(object)` [原文](http://underscorejs.org/#isElement)

Returns _true_ if **object** is a DOM element.

```javascript
_.isElement(jQuery('body')[0]);
=> true
```

### isArray `_.isArray(object)` [原文](http://underscorejs.org/#isArray)

Returns _true_ if **object** is an Array.

```javascript
(function(){ return _.isArray(arguments); })();
=> false
_.isArray([1,2,3]);
=> true
```

### isObject `_.isObject(value)` [原文](http://underscorejs.org/#isObject)

Returns _true_ if **value** is an Object. Note that JavaScript arrays and functions are
objects, while (normal) strings and numbers are not.

```javascript
_.isObject({});
=> true
_.isObject(1);
=> false
```

### isArguments `_.isArguments(object)` [原文](http://underscorejs.org/#isArguments)

Returns _true_ if **object** is an Arguments object.

```javascript
(function(){ return _.isArguments(arguments); })(1, 2, 3);
=> true
_.isArguments([1,2,3]);
=> false
```

### isFunction `_.isFunction(object)` [原文](http://underscorejs.org/#isFunction)

Returns _true_ if **object** is a Function.

```javascript
_.isFunction(alert);
=> true
```

### isString `_.isString(object)` [原文](http://underscorejs.org/#isString)

Returns _true_ if **object** is a String.

```javascript
_.isString("moe");
=> true
```

### isNumber `_.isNumber(object)` [原文](http://underscorejs.org/#isNumber)

Returns _true_ if **object** is a Number (including `NaN`).

```javascript
_.isNumber(8.4 * 5);
=> true
```

### isFinite `_.isFinite(object)` [原文](http://underscorejs.org/#isFinite)

Returns _true_ if **object** is a finite Number.

```javascript
_.isFinite(-101);
=> true

_.isFinite(-Infinity);
=> false
```

### isBoolean `_.isBoolean(object)` [原文](http://underscorejs.org/#isBoolean)

Returns _true_ if **object** is either _true_ or _false_.

```javascript
_.isBoolean(null);
=> false
```

### isDate `_.isDate(object)` [原文](http://underscorejs.org/#isDate)

Returns _true_ if **object** is a Date.

```javascript
_.isDate(new Date());
=> true
```

### isRegExp `_.isRegExp(object)` [原文](http://underscorejs.org/#isRegExp)

Returns _true_ if **object** is a RegExp.

```javascript
_.isRegExp(/moe/);
=> true
```

### isNaN `_.isNaN(object)` [原文](http://underscorejs.org/#isNaN)

Returns _true_ if **object** is _NaN_.
Note: this is not the same as the native **isNaN** function, which will also return true if
the variable is _undefined_.

```javascript
_.isNaN(NaN);
=> true
isNaN(undefined);
=> true
_.isNaN(undefined);
=> false
```

### isNull `_.isNull(object)` [原文](http://underscorejs.org/#isNull)

Returns _true_ if the **value** of object is _null_.

```javascript
_.isNull(null);
=> true
_.isNull(undefined);
=> false
```

### isUndefined `_.isUndefined(value)` [原文](http://underscorejs.org/#isUndefined)

Returns _true_ if **value** is _undefined**.

```javascript
_.isUndefined(window.missingVariable);
=> true
```
