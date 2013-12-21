(function() {

    var wrapper = document.getElementById('game');
    
    var table = document.createElement('table');

    var field = new Minefield(['.**..', '*....', '.....', '..*..', '*...*']);
    var rows = field.getRows();

    var render = function() {
        table.innerHTML = '';
        rows.forEach(function(row, i) {
            var tr = document.createElement('tr');
            row.forEach(function(cell, j) {
                var td = document.createElement('td');
                td.innerHTML = cell;
                td.setAttribute('class', field.getClass(i, j));
                td.addEventListener('click', function() {
                    field.reveal(i, j);
                    render();
                });
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });
    };

    render();
    wrapper.appendChild(table);

}());