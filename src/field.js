var Cell = function(value) {
    this.value = value;
    this.revealed = false;
    this.marked = false;
};
var Minefield = function(field) {
    this.rows = field.map(function(row) {
        return row.split('').map(function(value) {
            return new Cell(value);
        });
    });
    this.lost = false;
};
Minefield.prototype.neighbourCoords = function(i, j) {
    return [
        { i: i + 1, j: j - 1},
        { i: i + 1, j: j},
        { i: i + 1, j: j + 1},
        { i: i, j: j - 1},
        { i: i, j: j + 1},
        { i: i - 1, j: j - 1},
        { i: i - 1, j: j},
        { i: i - 1, j: j + 1}
    ];
};
Minefield.prototype.numberOfMines = function(i, j) {
    return this.rows[i] && this.rows[i][j] && this.rows[i][j].value === '*' ? 1 : 0;
};
Minefield.prototype.getAdjacentCount = function(i, j) {
    var self = this;
    return this.neighbourCoords(i, j).map(function(coords) {
        return self.numberOfMines(coords.i, coords.j);
    }).reduce(function(a, b) {
        return a + b;
    });
};
Minefield.prototype.getRows = function() {
    var self = this;
    return this.rows.map(function(row, i) {
        return row.map(function(cell, j) {
            return (cell.value === '*') ? cell.value : self.getAdjacentCount(i, j);
        });
    });
};
Minefield.prototype.mark = function(i, j) {
    this.rows[i][j].marked = !this.rows[i][j].marked;
};
Minefield.prototype.revealAll = function() {
    this.rows.forEach(function(row) {
        row.forEach(function(cell) {
            cell.revealed = true;
        });
    });    
};
Minefield.prototype.isSolved = function() {
    return !this.lost && this.rows.every(function(row) {
        return row.every(function(cell) {
            return (cell.revealed || cell.value === '*');
        });
    });
};
Minefield.prototype.reveal = function(i, j) {
    if (!this.rows[i] || !this.rows[i][j] || this.rows[i][j].revealed) {
        return;
    }
    if (this.rows[i][j].value === '*') {
        this.lost = true;
        return this.revealAll();
    } else {
        this.rows[i][j].revealed = true;
        if (this.getRows()[i][j] === 0) {
            var self = this;
            this.neighbourCoords(i, j).forEach(function(coords) {
                self.reveal(coords.i, coords.j);
            });
        }
    }  
};
Minefield.prototype.getClass = function(i, j) {
    var classes = [];
    if (this.rows[i][j].value === '*') {
        classes.push('cell-bomb');
        if (this.isSolved()) {
            classes.push('confirmed');
        }
    } else {
        classes.push('cell-' + this.getAdjacentCount(i, j));
    }
    if (!this.rows[i][j].revealed) {
        classes.push('hidden');
    }
    if (this.rows[i][j].marked) {
        classes.push('marked');
    }
    return classes.join(' ');
};