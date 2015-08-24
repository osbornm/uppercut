/*!
 * Uppercut JavaScript library v0.0.4
 * (c) Matthew M. Osborn - https://github.com/osbornm/uppercut#readme
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */

(function(window, undefined){
    var $ = this.jQuery,
        ko = this.ko,
        console = this.console;

     if(typeof ko !== 'object'){
        throw 'must include knockout.js before uppercut';
     }

/**
 * Cast value as observable, if it already is then just return otherwise wrap it in an observable
 */
ko.asObservable = function (value) {
    return ko.isObservable(value) ? value : ko.observable(value);
};

/**
 * Cast value as observableArray, if it already is then just return otherwise wrap it in an observableArray
 */
ko.asObservableArray = function (value) {
    return ko.isObservable(value) ? value : ko.observableArray(value);
};

/*jshint -W069 */ /* leaving in [] notation to match knockout */
function hasItems(data) {
    var value = ko.unwrap(data);
    return value.length && value.length > 0;
}

/**
 * renders when the collection has items. Can be used
 * on with virtual elements.
 * @param anyArray any array observable or not
 * @example <!-- ko any: collection -->content<!-- /ko -->
 */
ko.bindingHandlers.any = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        return ko.bindingHandlers['if']['init'](element, function () {
            return ko.computed(function () {
                return hasItems(valueAccessor());
            });
        }, allBindings, viewModel, bindingContext);
    }
};
ko.virtualElements.allowedBindings.any = true;

/**
 * renders when the collection is empty. Can be used
 * on with virtual elements.
 * @param anyArray any array observable or not
 * @example <!-- ko empty: collection -->content<!-- /ko -->
 */
ko.bindingHandlers.empty = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        return ko.bindingHandlers['if']['init'](element, function () {
            return ko.computed(function () {
                return !hasItems(valueAccessor());
            });
        }, allBindings, viewModel, bindingContext);
    }
};
ko.virtualElements.allowedBindings.empty = true;

ko.bindingHandlers.console = {
    update: function (element, valueAccessor) {
        console.log(ko.unwrap(valueAccessor()));
    }
};
ko.virtualElements.allowedBindings.console = true;

/*jshint -W069 */ /* leaving in [] notation to match knockout */

/**
 * renders href attrribute
 * @param url the url to be placed in the href
 * @example <a data-binding='href: model.url'></a>
 */
ko.bindingHandlers.href = {
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        return ko.bindingHandlers['attr']['update'](element, function () {
            return { href: valueAccessor() };
        }, allBindings, viewModel, bindingContext);
    }
};

/**
 * An observable that tracks an edits
 * @param initValue The initial value of the observable
 */
ko.trackableObservable = function (initValue) {
    initValue = ko.unwrap(initValue);
    var result = ko.observable(initValue);

    /**
     * The previous valued that has been marked as `initial` or `committed`
     */
    result.committedValue = ko.observable(initValue);

    /**
     * Commit the current value as the new commited value.
     * e.g. when your save completes and you want to reset to this value.
     * @function
     */
    result.commit = function () {
        result.committedValue(result());
    };

    /**
     * Reset the current value to the initial value
     * @function
     */
    result.reset = function () {
        result(result.committedValue());
        if (result.isModified)
            result.isModified(false);
    };

    result.isTrackableObservable = true;

    return result;
};

/**
 * An observable that tracks an edits
 * @param initValues The initial array of the observable
 */
ko.trackableObservableArray = function (initValues) {
    var initArray= ko.unwrap(initValues) || [],
        oldValues = initArray.slice(),
        result = ko.observableArray(initValues);

    /**
     * The previous array that has been marked as `initial` or `committed`
     */
    result.committedValue = ko.observableArray(initArray.slice());

    /**
     * Commit the current array as the new commited array.
     * e.g. when your save completes and you want to reset to this array.
     * @function
     */
    result.commit = function () {
        result.committedValue(result());
    };

    /**
     * Reset the current array to the initial array
     * @function
     */
    result.reset = function () {
        $.each(oldValues, function () {
            if (this.reset) {
                this.reset();
            }
        });
        result(oldValues.slice());
        if (result.isModified) {
            result.isModified(false);
        }
    };

    result.isTrackableObservableArray = true;

    return result;
};

})(this || (0, eval)('this'));
