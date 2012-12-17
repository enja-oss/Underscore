**Utility Functions**

**noConflict** _.noConflict() 

Give control of the "_" variable back to its previous owner. Returns a reference to the **Underscore** object.

```javascript 
var underscore = _.noConflict();
```

**identity**  _.identity(value) 

Returns the same value that is used as the argument. In math: `f(x) = x`
This function looks useless, but is used throughout Underscore as a default iterator.

```javascript 
var moe = {name : 'moe'};
moe === _.identity(moe);
=> true
```

**times** _.times(n, iterator, [context]) 

Invokes the given iterator function n times. Each invocation of **iterator** is called with an `index` argument. 

_Note: this example uses the [chaining syntax](http://underscorejs.org/#chaining)._

```javascript 
_(3).times(function(n){ genie.grantWishNumber(n); });
```

**random** _.random(min, max) 

Returns a random integer between **min** and **max**, inclusive. If you only pass one argument, it will return a number between `0` and that number.

```javascript 
_.random(0, 100);
=> 42
```

**mixin** _.mixin(object) 

Allows you to extend Underscore with your own utility functions. Pass a hash of `{name: function}` definitions to have your functions added to the Underscore object, as well as the OOP wrapper.

```javascript 
_.mixin({
  capitalize : function(string) {
    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
  }
});
_("fabio").capitalize();
=> "Fabio"
```

**uniqueId** _.uniqueId([prefix]) 

Generate a globally-unique id for client-side models or DOM elements that need one. If **prefix** is passed, the id will be appended to it.

```javascript 
_.uniqueId('contact_');
=> 'contact_104'
```

**escape** _.escape(string) 

Escapes a string for insertion into HTML, replacing `&`, `<`, `>`, `"`, `'`, and `/` characters.

```javascript 
_.escape('Curly, Larry & Moe');
=> "Curly, Larry &amp; Moe"
```

**unescape** _.unescape(string) 

The opposite of **[escape](http://underscorejs.org/#escape)**, replaces `&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#x27;` , 
and `&#x2F;` with their unescaped counterparts.

```javascript 
_.escape('Curly, Larry &amp; Moe');
=> "Curly, Larry & Moe"
```

**result** _.result(object, property) 

If the value of the named property is a function then invoke it; otherwise, return it.

```javascript 
var object = {cheese: 'crumpets', stuff: function(){ return 'nonsense'; }};
_.result(object, 'cheese');
=> "crumpets"
_.result(object, 'stuff');
=> "nonsense"
```

**template** _.template(templateString, [data], [settings]) 

Compiles JavaScript templates into functions that can be evaluated for rendering. 
Useful for rendering complicated bits of HTML from JSON data sources. 
Template functions can both interpolate variables, using `<%= … %>`, 
as well as execute arbitrary JavaScript code, with `<% … %>`. 
If you wish to interpolate a value, and have it be HTML-escaped, 
use `<%- … %>` When you evaluate a template function, 
pass in a **data** object that has properties corresponding to the template's free variables. 
If you're writing a one-off, you can pass the **data** object as the second parameter to **template** in order to render immediately instead of returning a template function. 
The **settings** argument should be a hash containing any `_.templateSettings` that should be overridden.

```javascript 
var compiled = _.template("hello: <%= name %>");
compiled({name : 'moe'});
=> "hello: moe"

var list = "<% _.each(people, function(name) { %> <li><%= name %></li> <% }); %>";
_.template(list, {people : ['moe', 'curly', 'larry']});
=> "<li>moe</li><li>curly</li><li>larry</li>"

var template = _.template("<b><%- value %></b>");
template({value : '<script>'});
=> "<b>&lt;script&gt;</b>"
```

You can also use `print` from within JavaScript code. This is sometimes more convenient than using `<%= ... %>`.

```javascript 
var compiled = _.template("<% print('Hello ' + epithet); %>");
compiled({epithet: "stooge"});
=> "Hello stooge."
```

If ERB-style delimiters aren't your cup of tea, 
you can change Underscore's template settings to use different symbols to set off interpolated code. 
Define an **interpolate** regex to match expressions that should be interpolated verbatim, 
an escape regex to match expressions that should be inserted after being HTML escaped, 
and an **evaluate** regex to match expressions that should be evaluated without insertion into the resulting string. 
You may define or omit any combination of the three. 
For example, to perform [Mustache.js](http://github.com/janl/mustache.js#readme) style templating:

```javascript 
_.templateSettings = {
  interpolate : /\{\{(.+?)\}\}/g
};

var template = _.template("Hello {{ name }}!");
template({name : "Mustache"});
=> "Hello Mustache!"
```

By default, **template** places the values from your data in the local scope via the `with` statement. 
However, you can specify a single **variable** name with the variable setting. 
This can significantly improve the speed at which a template is able to render.

```javascript 
_.template("Using 'with': <%= data.answer %>", {answer: 'no'}, {variable: 'data'});
=> "Using 'with': no"
```

Precompiling your templates can be a big help when debugging errors you can't reproduce. 
This is because precompiled templates can provide line numbers and a stack trace, 
something that is not possible when compiling templates on the client. 
The **source** property is available on the compiled template function for easy precompilation.

```javascript 
<script>
  JST.project = <%= _.template(jstText).source %>;
</script>
```
