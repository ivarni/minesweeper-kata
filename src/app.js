(function() {

    var wrapper = document.getElementById('game');
    
    var table = document.createElement('table');

    var field = new Minefield(['.**..', '*....', '.....', '..*..', '*...*']);
    var rows = field.getRows();

    rows.forEach(function(row) {
        var tr = document.createElement('tr');
        row.forEach(function(cell) {
            var td = document.createElement('td');
            td.innerHTML = cell;
            td.setAttribute('class', 'cell-' + (cell === '*' ? 'bomb' : cell));
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    wrapper.appendChild(table);

}());