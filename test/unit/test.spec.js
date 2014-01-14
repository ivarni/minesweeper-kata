describe('Calculating the field', function() {

    it('returns an empty row with no mines', function() {
        var field = new Minefield(['...']);
        var row = field.getRows()[0];
        expect(row).toEqual([0, 0, 0]);
    });

    xit('returns a row with one mine', function() {
        var field = new Minefield(['*']);
        var row = field.getRows()[0];
        expect(row).toEqual(['*']);
    });

    xit('counts one adjacent mine', function() {
        var field = new Minefield(['*..']);
        var row = field.getRows()[0];
        expect(row).toEqual(['*', 1, 0]);
    });

    xit('counts two adjacent mines', function() {
        var field = new Minefield(['*.*']);
        var row = field.getRows()[0];
        expect(row).toEqual(['*', 2, '*']);
    });

    xit('counts vertical mines', function() {
        var field = new Minefield(['*', '.']);
        var row = field.getRows()[1];
        expect(row).toEqual([1]);
    });

    xit('counts surrounding mines', function() {
        var field = new Minefield(['***', '*.*', '***']);
        var row = field.getRows()[1];
        expect(row).toEqual(['*', 8, '*']);
    });

});

describe('revealing cells', function() {

    xit('initalizes all fields to hidden', function() {
        var field = new Minefield(['***', '*.*', '***']);
        field.rows.forEach(function(row) {
            row.forEach(function(cell) {
                expect(cell.revealed).toBe(false);
            });
        });
    });

    xit('flags a cell as revealed', function() {
        var field = new Minefield(['***', '*.*', '***']);
        field.reveal(1, 1);
        expect(field.rows[1][1].revealed).toBe(true);
    });

    xit('reveals all cells if a mine is found', function() {
        var field = new Minefield(['*..', '..*', '...']);
        field.reveal(0, 0);
        field.rows.forEach(function(row) {
            row.forEach(function(cell) {
                expect(cell.revealed).toBe(true);
            });
        });
    });

    xit('reveals neighbouring cells when a 0-cell is revealed', function() {
        var field = new Minefield(['...', '..*', '***']);
        field.reveal(0, 0);
        expect(field.rows[0][0].revealed).toBe(true);
        expect(field.rows[0][1].revealed).toBe(true);
        expect(field.rows[1][0].revealed).toBe(true);
        expect(field.rows[1][1].revealed).toBe(true);
    });

    xit('ends the game when only bombs remain unrevealed', function() {
        var field = new Minefield(['..*', '***', '***']);
        field.reveal(0, 0);
        expect(field.isSolved()).toBe(false);
        field.reveal(0, 1);
        expect(field.isSolved()).toBe(true);
    });

});

describe('when marking cellls', function() {

    xit('initalizes all fields to unmarked', function() {
        var field = new Minefield(['*..', '...', '*.*']);
        field.rows.forEach(function(row) {
            row.forEach(function(cell) {
                expect(cell.marked).toBe(false);
            });
        });
    });

    xit('flags a field as marked', function() {
        var field = new Minefield(['*..', '...', '*.*']);
        field.mark(0, 0);
        expect(field.rows[0][0].marked).toBe(true);
    });

    xit('flags a marked field as unmarked', function() {
        var field = new Minefield(['*..', '...', '*.*']);
        field.mark(0, 0);
        field.mark(0, 0);
        expect(field.rows[0][0].marked).toBe(false);
    });

});

describe('when producing html', function() {

    xit('produces the right cell-class', function() {
        var field = new Minefield(['*', '.']);
        expect(field.getClass(1, 0)).toContain('cell-1');
        expect(field.getClass(0, 0)).toContain('cell-bomb');
    });

    xit('produces the hidden class if cell is not revealed', function() {
        var field = new Minefield(['..', '*.']);
        field.reveal(0, 0);
        expect(field.getClass(0, 0)).not.toContain('hidden');
        expect(field.getClass(1, 0)).toContain('hidden');
    });

    xit('produces the marked class if cell is marked', function() {
        var field = new Minefield(['.', '*']);
        field.mark(0, 0);
        expect(field.getClass(0, 0)).toContain('marked');
        expect(field.getClass(1, 0)).not.toContain('marked');
    });

    xit('produces the confirmed class for confirmed bombs', function() {
        var field = new Minefield(['.', '*']);
        field.reveal(0, 0);
        expect(field.getClass(1, 0)).toContain('confirmed');
    });

    xit('does not produce the confirmed class if the game is lost', function() {
        var field = new Minefield(['.', '*']);
        field.reveal(1, 0);
        expect(field.getClass(1, 0)).not.toContain('confirmed');
    });

});