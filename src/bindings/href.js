/*jshint -W069 */ /* leaving in [] notation to match knockout */
ko.bindingHandlers.href = {
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        return ko.bindingHandlers['attr']['update'](element, function () {
            return { href: valueAccessor() };
        }, allBindings, viewModel, bindingContext);
    }
};
