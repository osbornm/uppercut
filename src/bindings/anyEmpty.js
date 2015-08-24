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
