describe("TrackableObservable", function () {
    it("it hangs off the global knockout object", function () {
        expect(ko.trackableObservable).toBeDefined();
    });

    it("it defines commit, reset, commitedValue, and isTrackableObservable", function(){
        var t = ko.trackableObservable();
        expect(t.commit).toBeDefined();
        expect(t.reset).toBeDefined();
        expect(t.committedValue).toBeDefined();
        expect(t.isTrackableObservable).toBeDefined();
    });

    it("claims to be a trackable observable", function(){
        var t = ko.trackableObservable();
        expect(t.isTrackableObservable).toBeTruthy();
    });

    it("populates the initial value", function () {
        var t = ko.trackableObservable("init value");
        expect(t()).toEqual("init value");
    });

    it("reads uncommited value by default but initial value avalible", function () {
        var t = ko.trackableObservable("init value");
        t("new value");

        expect(t()).toEqual("new value");
        expect(t.committedValue()).toEqual("init value");
    });

    it("updates initial value when commit called", function(){
        var t = ko.trackableObservable("init value");
        t("new value");
        t.commit();
        expect(t()).toEqual("new value");
        expect(t.committedValue()).toEqual("new value");
    });

    it("reset after write reverts back to initial value", function(){
        var t = ko.trackableObservable("init value");
        t("new value");
        t.reset();
        expect(t()).toEqual("init value");
    });
});
