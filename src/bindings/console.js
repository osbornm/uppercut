/*jshint -W069 */ /* leaving in [] notation to match knockout */
ko.bindingHandlers.console = {
    update: function (element, valueAccessor) {
        console.log(ko.unwrap(valueAccessor()));
    }
};
ko.virtualElements.allowedBindings.console = true;
