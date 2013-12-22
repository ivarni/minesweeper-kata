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
    this.solved = false;
};
Minefield.prototype.numberOfMines = function(i, j) {
    return this.rows[i] && this.rows[i][j] && this.rows[i][j].value === '*' ? 1 : 0;
};
Minefield.prototype.getAdjacentCount = function(i, j) {
    return [
        this.numberOfMines(i + 1, j - 1),
        this.numberOfMines(i + 1, j),
        this.numberOfMines(i + 1, j + 1),
        this.numberOfMines(i, j - 1),
        this.numberOfMines(i, j + 1),
        this.numberOfMines(i - 1, j - 1),
        this.numberOfMines(i - 1, j),
        this.numberOfMines(i - 1, j + 1)
    ].reduce(function(a, b) {
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
Minefield.prototype.reveal = function(i, j) {
    if (!this.rows[i] || !this.rows[i][j] || this.rows[i][j].revealed) {
        return;
    }
    if (this.rows[i][j].value === '*') {
        this.rows.forEach(function(row) {
            row.forEach(function(cell) {
                cell.revealed = true;
            });
        });
    } else {
        this.rows[i][j].revealed = true;
        if (this.getRows()[i][j] === 0) {
            this.reveal(i + 1, j - 1);
            this.reveal(i + 1, j);
            this.reveal(i + 1, j + 1);
            this.reveal(i, j - 1);
            this.reveal(i, j + 1);
            this.reveal(i - 1, j - 1);
            this.reveal(i - 1, j);
            this.reveal(i - 1, j + 1);
        }
    }
    var solved = true;
    this.rows.forEach(function(row) {
        row.forEach(function(cell) {
            if (!cell.revealed && cell.value !== '*') {
                solved = false;
            }
        });
    });
    this.solved = solved;
    if (solved) {
        this.rows.forEach(function(row) {
            row.forEach(function(cell) {
                cell.revealed = true;
            });
        });        
    }
};
Minefield.prototype.getClass = function(i, j) {
    var classes = [];
    if (this.rows[i][j].value === '*') {
        classes.push('cell-bomb');
        if (this.solved) {
            classes.push('revealed');
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