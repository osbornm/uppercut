/*!
 * Uppercut JavaScript library v0.0.1
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

/*global ko */
ko.trackableObservable = function (initValue) {
    initValue = ko.unwrap(initValue);

    var result = ko.observable(initValue);

    result.committedValue = ko.observable(initValue);
    result.commit = function () {
        result.committedValue(result());
    };
    result.reset = function () {
        result(result.committedValue());
        if (result.isModified)
            result.isModified(false);
    };
    result.isTrackableObservable = true;

    return result;
};

/*global ko */
ko.trackableObservableArray = function (initValues) {
    var initArray= ko.unwrap(initValues) || [],
        oldValues = initArray.slice(), // Copy the array off
        result = ko.observableArray(initValues); /// should I unwrapp this?

    result.committedValue = ko.observableArray(initArray.slice());
    result.commit = function () {
        result.committedValue(result());
    };
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
