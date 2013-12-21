var Minefield = function(field) {
    var rows = this.rows = [];
    var revealed = this.revealed = [];
    field.forEach(function(row) {
        var tmp = [];
        revealed.push(tmp);
        rows.push(row.split(''));
        for (var i = 0, l = row.split('').length; i < l; i++) {
            tmp.push(false);
        }
    });
};
Minefield.prototype.numberOfMines = function(i, j) {
    return this.rows[i] && this.rows[i][j] === '*' ? 1 : 0;
};
Minefield.prototype.getAdjacentCount = function(i, j) {
    return this.numberOfMines(i, j - 1) +
        this.numberOfMines(i, j + 1) +
        this.numberOfMines(i + 1, j - 1) +
        this.numberOfMines(i + 1, j) +
        this.numberOfMines(i + 1, j + 1) +
        this.numberOfMines(i - 1, j - 1) +
        this.numberOfMines(i - 1, j) +
        this.numberOfMines(i - 1, j + 1);
};
Minefield.prototype.getRows = function() {
    var self = this;
    var result = [];
    this.rows.forEach(function(row, i) {
        var calculated = [];
        row.forEach(function(cell, j) {
            if (cell === '*') {
                calculated.push(cell);
            } else {
                calculated.push(self.getAdjacentCount(i, j));
            }
        });
        result.push(calculated);
    });
    return result;
};
Minefield.prototype.getRevealed = function() {
    return this.revealed;
};
Minefield.prototype.reveal = function(i, j) {
    this.revealed[i][j] = true;
};
Minefield.prototype.getClass = function(i, j) {
    var classes = [];
    if (this.rows[i][j] === '*') {
        classes.push('cell-bomb');
    } else {
        classes.push('cell-' + this.getAdjacentCount(i, j));
    }
    if (!this.revealed[i][j]) {
        classes.push('hidden');
    }
    return classes.join(' ');
};