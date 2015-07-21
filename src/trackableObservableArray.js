/*global ko */
ko.trackableObservableArray = function (initValues) {
    var initArray= ko.unwrap(initValues),
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
