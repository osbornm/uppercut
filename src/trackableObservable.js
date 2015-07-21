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
