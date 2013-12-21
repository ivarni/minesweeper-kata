describe('Calculating the field', function() {

    it('returns an empty row with no mines', function() {
        var field = new Minefield(["..."]);
        var row = field.getRows()[0];
        expect(row).toBe("...");
    });

});