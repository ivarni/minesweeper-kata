describe('Calculating the field', function() {

    it('returns an empty row with no mines', function() {
        var field = new Minefield(['...']);
        var row = field.getRows()[0];
        expect(row).toEqual([0, 0, 0]);
    });

    it('returns a row with one mine', function() {
        var field = new Minefield(['*']);
        var row = field.getRows()[0];
        expect(row).toEqual(['*']);
    });

    it('counts one adjacent mine', function() {
        var field = new Minefield(['*..']);
        var row = field.getRows()[0];
        expect(row).toEqual(['*', 1, 0]);
    });

    it('counts two adjacent mines', function() {
        var field = new Minefield(['*.*']);
        var row = field.getRows()[0];
        expect(row).toEqual(['*', 2, '*']);
    });

    it('counts vertical mines', function() {
        var field = new Minefield(['*', '.']);
        var row = field.getRows()[1];
        expect(row).toEqual([1]);
    });

    it('counts surrounding mines', function() {
        var field = new Minefield(['***', '*.*', '***']);
        var row = field.getRows()[1];
        expect(row).toEqual(['*', 8, '*']);
    });

});