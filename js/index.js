
function $(id) {
    return document.getElementById(id);
}


function creatediv(className) {
    var div = document.createElement('div');
    div.className = className;
    return div;
}
var clock = null;
var state = 0;
var speed = 6;
var flag = false;


function start() {
    if (!flag) {
        init();
    } else {
        alert('Game Started！ No more Click');
    }
}


function init() {
    flag = true;
    for (var i = 0; i < 5; i++) {
        createrow();
    }

    $('main').onclick = function (ev) {
        ev = ev || event;
        judge(ev);
    };

    clock = window.setInterval('move()', 50);
}


function judge(ev) {
    if (
        ev.target.className.indexOf('black') == -1 &&
        ev.target.className.indexOf('cell') !== -1
    ) {
        ev.target.parentNode.pass1 = 1;
    }

    if (ev.target.className.indexOf('black') !== -1) {
        ev.target.className = 'cell';
        ev.target.parentNode.pass = 1;
        score();
    }
}


function over() {
    var rows = con.childNodes;
    if (rows.length == 6 && rows[rows.length - 1].pass !== 1) {
        fail();
    }
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].pass1 == 1) {
            fail();
        }
    }
}

function fail() {
    clearInterval(clock);
    flag = false;
    confirm('Your final score is : ' + parseInt($('score').innerHTML));
    var con = $('con');
    con.innerHTML = '';
    $('score').innerHTML = 0;
    con.style.top = '-510px';
}


function createrow() {
    var con = $('con');
    var row = creatediv('row');
    var arr = creatcell();

    con.appendChild(row);

    for (var i = 0; i < 5; i++) {
        row.appendChild(creatediv(arr[i]));
    }

    if (con.firstChild == null) {
        con.appendChild(row);
    } else {
        con.insertBefore(row, con.firstChild);
    }
}


function creatcell() {
    var temp = ['cell', 'cell', 'cell', 'cell', 'cell'];
    var i = Math.floor(Math.random() * 5);
    temp[i] = 'cell black';
    return temp;
}


function move() {
    var con = $('con');
    var top = parseInt(window.getComputedStyle(con, null)['top']);

    if (speed + top > 0) {
        top = 0;
    } else {
        top += speed;
    }
    con.style.top = top + 'px';
    over();
    if (top == 0) {
        createrow();
        con.style.top = '-102px';
        delrow();
    }
}


function speedup() {
    speed += 2;
    if (speed == 20) {
        alert('You are legend!');
    }
}


function delrow() {
    var con = $('con');
    if (con.childNodes.length == 7) {
        con.removeChild(con.lastChild);
    }
}


function score() {
    var newscore = parseInt($('score').innerHTML) + 1;
    $('score').innerHTML = newscore;
    if (newscore % 10 == 0) {
        speedup();
    }
}

var audio = new Audio("music");

document.onclick = function() {
    audio.play();
}