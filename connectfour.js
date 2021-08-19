var player1 = prompt("Player one: Enter your name, you will be Blue");
var player2 = prompt("Player two: Enter your name, you will be Red");
var ids = {one: 0, two: 1, three: 2, four: 3, five: 4, six: 5, seven: 6};
var full = [false, false, false, false, false, false, false];
var turn = 1;

var playerTurn = document.querySelector("h3");
var column = [
    document.querySelectorAll("#one"),
    document.querySelectorAll("#two"),
    document.querySelectorAll("#three"),
    document.querySelectorAll("#four"),
    document.querySelectorAll("#five"),
    document.querySelectorAll("#six"),
    document.querySelectorAll("#seven")
];

var declare = document.querySelector(".container");

function changeColor(col, turn, e) {
    var i;
    if (!full[e]) {
        for (i = 5; i >= 0; i--) {
            if (getComputedStyle(col[i]).backgroundColor == "rgb(128, 128, 128)") {
                if (turn-1)
                    col[i].style.backgroundColor = "rgb(252, 43, 102)";
                else
                    col[i].style.backgroundColor = "rgb(97, 174, 232)";
                break;
            }
            if (i == 0) {
                alert("Sorry!!! The column is full");
                full[e] = true;
            }
        }
    }
    else
        alert("Sorry!!! The column is full");
    return i;
}

function showTurn(turn) {
    if (turn-1)
        playerTurn.textContent = player2 + ": It is your turn, please pick a column to drop a red chip";
    else
        playerTurn.textContent = player1 + ": It is your turn, please pick a column to drop a blue chip";
}

function game(row, col, turn) {
    var win = false;
    var color = getComputedStyle(column[col][row]).backgroundColor;
    
    var vertcount = 1;
    for (var i = row+1; (i <= row+3) && (i != 6); i++) {
        if (color != getComputedStyle(column[col][i]).backgroundColor)
            break;
        else
            vertcount++;
    }

    var horicount = 0;
    for (var j = ((col-3)<0)?0:(col-3); (j <= col+3) && (j != 7); j++) {
        if (color == getComputedStyle(column[j][row]).backgroundColor)
            horicount++;
        else
            horicount = 0;
        if (horicount == 4)
            break;
    }

    var pridiagcount = 1;
    for (var i = row+1, j = col+1; (i <= row+3) && (j <= col+3) && (i != 6) && (j != 7); i++, j++) {
        if (color == getComputedStyle(column[j][i]).backgroundColor)
            pridiagcount++;
        else
            break;
    }
    for (var i = row-1, j = col-1; (i >= row-3) && (j >= col-3) && (i != -1) && (j != -1); i--, j--) {
        if (color == getComputedStyle(column[j][i]).backgroundColor)
            pridiagcount++;
        else
            break;
    }

    var oppdiagcount = 1;
    for (var i = row+1, j = col-1; (i <= row+3) && (j >= col-3) && (i != 6) && (j != -1); i++, j--) {
        if (color == getComputedStyle(column[j][i]).backgroundColor)
            oppdiagcount++;
        else
            break;
    }
    for (var i = row-1, j = col+1; (i >= row-3) && (j <= col+3) && (i != -1) && (j != -7); i--, j++) {
        if (color == getComputedStyle(column[j][i]).backgroundColor)
            oppdiagcount++;
        else
            break;
    }

    if (vertcount == 4)
        win = true;
    else if (horicount >= 4)
        win = true;
    else if (pridiagcount >= 4)
        win = true;
    else if (oppdiagcount >= 4)
        win = true;

    if (win) {
        if (turn-1)
            declare.innerHTML = "<h1>" + player2 + ", you've won the game</h1>\n<h1>Please restart the page to play again</h1>";
        else
            declare.innerHTML = "<h1>" + player1 + ", you've won the game</h1>\n<h1>Please restart the page to play again</h1>";
    }
}

for (var i = 0; i < 7; i++) {
    column[i].forEach(d => {
        d.addEventListener("click", function(event) {
            var e = event.target.id;
            var i = changeColor(column[ids[e]], turn, ids[e]);
            game(i, ids[e], turn);
            if (turn-1)
                turn--;
            else
                turn++;
            showTurn(turn);
        });
    });
}

showTurn(turn);