describe("AsObservable", function() {
    it("it hangs off the global knockout object", function () {
        expect(ko.asObservable).toBeDefined();
    });

    it("returns an observable from a value", function () {
        var result = ko.asObservable(5);
        expect(ko.isObservable(result)).toBeTruthy();
    });

    it("returns the same observable from an observable", function () {
        var init = ko.observable(4);
        var result = ko.asObservable(init);
        expect(result).toEqual(init);
    });
});

describe("AsObservableArray", function() {
    it("it hangs off the global knockout object", function () {
        expect(ko.asObservableArray).toBeDefined();
    });

    it("returns an observable from a value", function () {
        var result = ko.asObservableArray([]);
        expect(ko.isObservable(result)).toBeTruthy();
    });

    it("returns the same observable from an observable", function () {
        var init = ko.observableArray([1]);
        var result = ko.asObservableArray(init);
        expect(result).toEqual(init);
    });
});
