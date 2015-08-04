describe("TrackableObservableArray", function () {
    it("it hangs off the global knockout object", function () {
        expect(ko.trackableObservableArray).toBeDefined();
    });

    it("it defines commit, reset, commitedValue, and isTrackableObservable", function(){
        var t = ko.trackableObservableArray();
        expect(t.commit).toBeDefined();
        expect(t.reset).toBeDefined();
        expect(t.committedValue).toBeDefined();
        expect(t.isTrackableObservableArray).toBeDefined();
    });

    it("claims to be a trackable observable", function(){
        var t = ko.trackableObservableArray();
        expect(t.isTrackableObservableArray).toBeTruthy();
    });

    it("populates the initial value", function () {
        var t = ko.trackableObservableArray([1,2,3]);
        expect(t()).toEqual([1,2,3]);
    });

    it("reads uncommited value by default but initial value avalible", function () {
        var t = ko.trackableObservableArray([1,2,3]);
        t([3,2,1]);

        expect(t()).toEqual([3,2,1]);
        expect(t.committedValue()).toEqual([1,2,3]);
    });

    it("updates initial value when commit called", function(){
        var t = ko.trackableObservable([1,2,3]);
        t([3,2,1]);
        t.commit();
        expect(t()).toEqual([3,2,1]);
        expect(t.committedValue()).toEqual([3,2,1]);
    });

    it("reset after write reverts back to initial value", function(){
        var t = ko.trackableObservable([1,2,3]);
        t([3,2,1]);
        t.reset();
        expect(t()).toEqual([1,2,3]);
    });
});
