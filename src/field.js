var Minefield = function(field) {
    var rows = this.rows = [];
    field.forEach(function(row) {
        rows.push(row.split(''));
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