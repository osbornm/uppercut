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
