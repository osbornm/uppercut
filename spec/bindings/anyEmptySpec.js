describe('Bindings: any', function(){
    beforeEach(jasmine.prepareTestNode);

    it('is defined', function(){
        expect(ko.bindingHandlers.any).toBeDefined();
    });

    it('renders content when plain array has items', function ()  {
        var model = [1];
        spyOn(console, 'log');
        testNode.innerHTML = '<div data-bind="any: $data">model has items</div>';
        ko.applyBindings(model, testNode);
        expect(testNode.innerHTML.indexOf('model has items')).toBeGreaterThan(-1);
    });

    it('does not render content when plain array is empty', function ()  {
        var model = [];
        spyOn(console, 'log');
        testNode.innerHTML = '<div data-bind="any: $data">model has items</div>';
        ko.applyBindings(model, testNode);
        expect(testNode.innerHTML.indexOf('model has items')).toBe(-1);
    });

        it('renders content when observable array has items', function ()  {
        var model = ko.observableArray([1]);
        spyOn(console, 'log');
        testNode.innerHTML = '<div data-bind="any: $data">model has items</div>';
        ko.applyBindings(model, testNode);
        expect(testNode.innerHTML.indexOf('model has items')).toBeGreaterThan(-1);
    });

    it('does not render content when observable array is empty', function ()  {
        var model = ko.observableArray([]);
        spyOn(console, 'log');
        testNode.innerHTML = '<div data-bind="any: $data">model has items</div>';
        ko.applyBindings(model, testNode);
        expect(testNode.innerHTML.indexOf('model has items')).toBe(-1);
    });

    it('can be applied to virtual elements', function(){
        expect(ko.virtualElements.allowedBindings.any).toBeDefined();
        expect(ko.virtualElements.allowedBindings.any).toBeTruthy();

    });

});

describe('Bindings: empty', function(){
        beforeEach(jasmine.prepareTestNode);

    it('is defined', function(){
        expect(ko.bindingHandlers.empty).toBeDefined();
    });

    it('does not render content when plain array has items', function ()  {
        var model = [1];
        spyOn(console, 'log');
        testNode.innerHTML = '<div data-bind="empty: $data">model has items</div>';
        ko.applyBindings(model, testNode);
        expect(testNode.innerHTML.indexOf('model has items')).toBe(-1);
    });

    it('renders content when plain array is empty', function ()  {
        var model = [];
        spyOn(console, 'log');
        testNode.innerHTML = '<div data-bind="empty: $data">model has items</div>';
        ko.applyBindings(model, testNode);
        expect(testNode.innerHTML.indexOf('model has items')).toBeGreaterThan(-1);
    });

        it('does not render content when observable array has items', function ()  {
        var model = ko.observableArray([1]);
        spyOn(console, 'log');
        testNode.innerHTML = '<div data-bind="empty: $data">model has items</div>';
        ko.applyBindings(model, testNode);
        expect(testNode.innerHTML.indexOf('model has items')).toBe(-1);
    });

    it('renders content when observable array is empty', function ()  {
        var model = ko.observableArray([]);
        spyOn(console, 'log');
        testNode.innerHTML = '<div data-bind="empty: $data">model has items</div>';
        ko.applyBindings(model, testNode);
        expect(testNode.innerHTML.indexOf('model has items')).toBeGreaterThan(-1);
    });

    it('can be applied to virtual elements', function(){
        expect(ko.virtualElements.allowedBindings.empty).toBeDefined();
        expect(ko.virtualElements.allowedBindings.empty).toBeTruthy();

    });
});
