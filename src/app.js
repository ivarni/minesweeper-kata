(function() {
    
    var CELL_WIDTH = 100;
    var CELL_HEIGHT = 100;

    //var wrapper = document.getElementById('game');
    
    //var table = document.createElement('table');

    var field = new Minefield(['***..', '.....', '.....', '..*..', '*...*']);
    var rows = field.getRows();


    var canvas = document.getElementById('canvas');
    canvas.setAttribute('width', CELL_WIDTH * rows.length);
    canvas.setAttribute('height', CELL_HEIGHT * rows.length);

    var context = canvas.getContext('2d');
    context.font = 'italic 10pt Calibri';
    
    var renderCanvas = function() {
        context.clearRect(0, 0, CELL_WIDTH * rows.length, CELL_HEIGHT * rows.length);
        rows.forEach(function(row, y) {
            row.forEach(function(cell, x) {
                context.fillStyle = 'rgb(218, 209, 209)';
                context.fillRect(
                    (x * CELL_WIDTH) + x, 
                    (y * CELL_HEIGHT) + y, 
                    CELL_WIDTH, 
                    CELL_HEIGHT
                );
                var measure = context.measureText(cell);
                context.fillStyle = 'blue';
                context.fillText(
                    cell,
                    (x * CELL_WIDTH) + (measure.width / 2),
                    ((y + 1) * CELL_HEIGHT) - (CELL_HEIGHT / 2)
                );
            });
        });
    };

    var canvasClick = function(event) {
        var x = event.layerX;
        var y = event.layerY;

        var row = (rows.length - 1) - Math.floor(((CELL_HEIGHT * rows.length) - y) / CELL_HEIGHT);
        var col = (rows.length - 1) - Math.floor(((CELL_WIDTH * rows.length) - x) / CELL_HEIGHT);
        
        field.reveal(row, col);
        renderCanvas();
    };

    var render = function() {
        table.innerHTML = '';
        rows.forEach(function(row, i) {
            var tr = document.createElement('tr');
            row.forEach(function(cell, j) {
                var td = document.createElement('td');
                td.innerHTML = cell;
                td.setAttribute('class', field.getClass(i, j));
                td.addEventListener('click', function(event) {
                    if (event.ctrlKey) {
                        field.mark(i, j);
                        render();
                    } else if (!field.rows[i][j].marked) {
                        field.reveal(i, j);
                        render();
                    }
                });
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });
    };
    canvas.addEventListener("click", canvasClick, false);

    //render();
    //wrapper.appendChild(table);

    renderCanvas();
}());