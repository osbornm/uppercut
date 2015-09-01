# uppercut

![Build Status](https://api.travis-ci.org/osbornm/uppercut.svg)

A collection of [KnockoutJS](http://knockoutjs.com) helpers, classes, and bindings that I have found useful during my development.

## usage

install uppercut using either nuget or bower.

**Bower**: `bower install uppercut`

**Nuget**: `Install-Package uppercutjs`

### Types

#### [TrackableObservable](src/trackableObserverable.js) & [TrackableObservableArray](src/trackableObserverableArray.js)
Observables that store a copy of the original value that can be reverted to. Very useful when writing edit forms where you want to have the ability to revert the edit. You may read the `commitValue` property if you want to display the "saved" value.

```JavaScript
var form = function(){
    var self = this;
    self.value = ko.trackableObservable("initial commited value");
    self.array = ko.trackableObservableArray([]);
    self.cancel = function(){
        // reset the value back to the currently commited value
        self.value.reset();
        self.array.reset();
    };
    self.save = fucntion(){
        // commits the current working value
        self.value.commit();
        self.array.commit();
    };
    return self;
};

```

### Helpers

#### [AsObservable](src/asObservable.js) & [AsObservableArray](src/asObservable.js)
Ensure a value is either and observable or and observableArray. Helpful when you are writing components where the consumer may not care able observablitity.
```JavaScript
function(options){
    var observable = ko.asObservable(options.value);
    var observableArray = ko.asObservableArray(options.array);
}
```

### Bindings

#### [console](src/bindings/console.js)
This binding with write the input value out using a simple `console.log` this can be very helpful debuging if you are unsure of the current context.

```HTML
<!-- ko console: someValue --> <!-- /ko -->
```

#### [any](src/bindings/anyEmpty.js) & [empty](src/bindings/anyEmpty.js)

The any and empty bindings use the length property to determine if there are items or not. It will work but both regular and observable arrays or any object that matches the array signiture.

```HTML
<div data-bind="any: items"> You have Items</div>
<div data-bind="empty: items"> You have No Items</div>
```

#### [href](src/bindings/href.js)
The href binding is just a shortcut for `attr: { href: url }`

```HTML
<a data-bind="href: url">click here</a>
```


## Contributing || Building from Source

Run `npm install` and `bower install` to pull down all the dependencies

## Build

We use grunt for all our build tasks `grunt` will run JSHint, Bundling, and Minification. `grunt test` will run all the jasmine tests and lastly `grunt push` prepares the bower package, see bellow for more on that.

## Test
`grunt test` runs the jasmine tests. All the tests can be found in the [spec folder](/spec). We have one helper method `prepareTestNode` that will make sure a test DOM node is setup, cleaned, and set to a global variable for access.


## Distribution

**Make sure to update the version in [package.json](package.json) **

Because NuGet requires a specific folder structure and there is no OSX packager there is a [separate repository](https://github.com/osbornm/uppercut.nuget) for NuGet distribution that is manually updated.

`grunt push` will prepare a bower package check in and display instructions for completion of the distribution.
