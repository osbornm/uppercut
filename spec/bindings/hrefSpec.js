describe('Bindings: href', function(){
    beforeEach(jasmine.prepareTestNode);

    it('adds href for just strings', function ()  {
        var model = { url: 'osbornm.com' };
        testNode.innerHTML = '<a data-bind="href: url"></a>';
        ko.applyBindings(model, testNode);
        expect(testNode.childNodes[0].getAttribute('href')).toEqual('osbornm.com');
    });

    it('adds href for observables and changes with observed values', function ()  {
        var model = { url: ko.observable('osbornm.com') };
        testNode.innerHTML = '<a data-bind="href: url"></a>';
        ko.applyBindings(model, testNode);
        expect(testNode.childNodes[0].getAttribute('href')).toEqual('osbornm.com');
        model.url('github.com/osbornm/uppercut');
        expect(testNode.childNodes[0].getAttribute('href')).toEqual('github.com/osbornm/uppercut');
    });
});
