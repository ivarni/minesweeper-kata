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

describe('revealing cells', function() {

    it('initalizes all fields to hidden', function() {
        var field = new Minefield(['***', '*.*', '***']);
        field.rows.forEach(function(row) {
            row.forEach(function(cell) {
                expect(cell.revealed).toBe(false);
            });
        });
    });

    it('marks a cell as revealed', function() {
        var field = new Minefield(['***', '*.*', '***']);
        field.reveal(1, 1);
        expect(field.rows[1][1].revealed).toBe(true);
    });

    it('reveals entire field if a bomb is found', function() {
        var field = new Minefield(['***', '*.*', '***']);
        field.reveal(0, 0);
        field.rows.forEach(function(row) {
            row.forEach(function(cell) {
                expect(cell.revealed).toBe(true);
            });
        });
    });

    it('reveals neighbouring cells when a 0-cell is revealed', function() {
        var field = new Minefield(['...', '..*', '***']);
        field.reveal(0, 0);
        expect(field.rows[0][0].revealed).toBe(true);
        expect(field.rows[0][1].revealed).toBe(true);
        expect(field.rows[1][0].revealed).toBe(true);
        expect(field.rows[1][1].revealed).toBe(true);
    });

});

describe('when producing html', function() {

    it('produces the right cell-class', function() {
        var field = new Minefield(['*', '.']);
        expect(field.getClass(1, 0)).toContain('cell-1');
        expect(field.getClass(0, 0)).toContain('cell-bomb');
    });

    it('produces the revealed class if cell is revealed', function() {
        var field = new Minefield(['.', '*']);
        field.reveal(0, 0);
        expect(field.getClass(0, 0)).not.toContain('hidden');
        expect(field.getClass(1, 0)).toContain('hidden');
    });

});