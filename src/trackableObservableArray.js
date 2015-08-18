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
