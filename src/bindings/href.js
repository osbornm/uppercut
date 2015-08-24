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
