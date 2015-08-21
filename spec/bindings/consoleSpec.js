describe('Bindings: console', function(){
    beforeEach(jasmine.prepareTestNode);

    it('calls console with plain text', function ()  {
        var model = { name: 'uppercut' };
        spyOn(console, 'log');
        testNode.innerHTML = '<div data-bind="console: name"></div>';
        ko.applyBindings(model, testNode);

        expect(console.log.calls.count()).toEqual(1);
        expect(console.log.calls.argsFor(0)).toEqual(['uppercut']);
    });

    it('calls console with object', function ()  {
        var model = { name: 'uppercut' };
        spyOn(console, 'log');
        testNode.innerHTML = '<div data-bind="console: $data"></div>';
        ko.applyBindings(model, testNode);

        expect(console.log.calls.count()).toEqual(1);
        expect(console.log.calls.argsFor(0)).toEqual([model]);
    });

    it('calls console each time observabel updated', function ()  {
        var model = { name: ko.observable('uppercut') };
        spyOn(console, 'log');
        testNode.innerHTML = '<div data-bind="console: name"></div>';
        ko.applyBindings(model, testNode);

        model.name('uppercut2');

        expect(console.log.calls.count()).toEqual(2);
        expect(console.log.calls.argsFor(0)).toEqual(['uppercut']);
        expect(console.log.calls.argsFor(1)).toEqual(['uppercut2']);
    });
});
