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
