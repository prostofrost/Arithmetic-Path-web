// Обработчик клика мыши на canvas
function CanvasClickHandler(event) {
	if( win == 0 ) {
	    var x = GetRelativeMouseXCoord("gameCanvas", event) / canvas.width;
	    var y = GetRelativeMouseYCoord("gameCanvas", event) / canvas.height;
	    // Получаем индекс узла по которому клик
	    var nodeIndex = gameGraph.getNodeIndexXY(x, y);
	    // Если такой индекс разрешен (он есть, он либо справа или снизу от хвоста пути или часть пути)
	    if (nodeIndex != -1 && (gameGraph.getLastPathIndex() < nodeIndex || gameGraph.inPath(nodeIndex))) {
	        // Добавляем в путь и перерисовываем добавленные на канве
	        gameGraph.addNodeInPath(nodeIndex);
	        // Изменяем надписи
	        var needNumberTd = document.getElementById("needNumber");
	        var nowNumberTd = document.getElementById("nowNumber");
	        nowNumberTd.innerHTML = "На данный момент: " + gameGraph.toString();
	        needNumberTd.innerHTML = "Нужно набрать: " + need.toString();
	        // Если условия выигрыша выполнены - обновляем игру
	        if (gameGraph.nowResult() == need && nodeIndex == (gameGraph.getAllNodes().length - 1)) {
	        	win = 1;
	        	context.drawImage(winimg, 0, 0);
	        };
	    }
	}
	else if( win == 1 ) {
		ReloadGame();
	}
}

function ReloadGame() {
    var size = 0;
    if(document.getElementById("size3").checked)
    	size = 3;
    else if(document.getElementById("size5").checked)
    	size = 5;
    else if(document.getElementById("size7").checked)
    	size = 7;
    else if(document.getElementById("size9").checked)
    	size = 9;
    else if(document.getElementById("size11").checked)
    	size = 11;
    context.clearRect(0, 0, canvas.width, canvas.height);
    gameGraph = new GameGraph();
    // Шаги и размер
    sizex = size;
    sizey = sizex;
    var stepx = 1 / sizex;
    var stepy = 1 / sizey;
    var line = 0.01;
    var width = stepx - line;
    var height = stepy - line;
    // Заполняем список узлов игрового графа
    for (var i = 0; i < sizey; i++)
        for (var j = 0; j < sizex; j++) {
            if ((i * sizex + j) % 2 == 0) {
                var max = 9;
                var data = Math.round(max * Math.random());
                while (data == 0)
                    data = Math.round(max * Math.random());
                var node = new GameNode(0, data, stepx / 2 + j * stepx, stepy / 2 + i * stepy);
            }
            else {
                if (document.getElementById("plus").checked)
                    var node = new GameNode(1, 0, stepx / 2 + j * stepx, stepx / 2 + i * stepy);
                else if (document.getElementById("plusminus").checked) {
                    var type = Math.round(2 * Math.random());
                    while (type == 0)
                        type = Math.round(2 * Math.random());
                    var node = new GameNode(type, 0, stepx / 2 + j * stepx, stepx / 2 + i * stepy);
                }
                else if (document.getElementById("all").checked) {
                    var type = Math.round(3 * Math.random());
                    while (type == 0)
                        type = Math.round(3 * Math.random());
                    var node = new GameNode(type, 0, stepx / 2 + j * stepx, stepx / 2 + i * stepy);
                }
            };
            node.setSizeX(width);
            node.setSizeY(height);
            gameGraph.addNode(node, new Array());
        }
    // Заполняем список соседей игрового графа
    var nodes = gameGraph.getAllNodes();
    gameGraph.addNodeInPath(0);
    for (var i = 0; i < sizey; i++)
        for (var j = 0; j < sizex; j++) {
            if (i == 0 && j == 0) {
                gameGraph.addNeihbour(((i + 1) * sizex + j), (i * sizex + j));
                gameGraph.addNeihbour((i * sizex + j + 1), (i * sizex + j));
                continue;
            }
            if (i == (sizey - 1) && j == 0) {
                gameGraph.addNeihbour(((i - 1) * sizex + j), (i * sizex + j));
                gameGraph.addNeihbour((i * sizex + j + 1), (i * sizex + j));
                continue;
            }
            if (i == 0 && j == (sizex - 1)) {
                gameGraph.addNeihbour(((i + 1) * sizex + j), (i * sizex + j));
                gameGraph.addNeihbour((i * sizex + j - 1), (i * sizex + j));
                continue;
            }
            if (i == (sizey - 1) && j == (sizex - 1)) {
                gameGraph.addNeihbour(((i - 1) * sizex + j), (i * sizex + j));
                gameGraph.addNeihbour((i * sizex + j - 1), (i * sizex + j));
                continue;
            }
            if (i == 0) {
                gameGraph.addNeihbour(((i + 1) * sizex + j), (i * sizex + j));
                gameGraph.addNeihbour((i * sizex + j - 1), (i * sizex + j));
                gameGraph.addNeihbour((i * sizex + j + 1), (i * sizex + j));
                continue;
            }
            if (i == (sizey - 1)) {
                gameGraph.addNeihbour(((i - 1) * sizex + j), (i * sizex + j));
                gameGraph.addNeihbour((i * sizex + j - 1), (i * sizex + j));
                gameGraph.addNeihbour((i * sizex + j + 1), (i * sizex + j));
                continue;
            }
            if (j == 0) {
                gameGraph.addNeihbour(((i - 1) * sizex + j), (i * sizex + j));
                gameGraph.addNeihbour(((i + 1) * sizex + j), (i * sizex + j));
                gameGraph.addNeihbour((i * sizex + j + 1), (i * sizex + j));
                continue;
            }
            if (j == (sizex - 1)) {
                gameGraph.addNeihbour(((i - 1) * sizex + j), (i * sizex + j));
                gameGraph.addNeihbour(((i + 1) * sizex + j), (i * sizex + j));
                gameGraph.addNeihbour((i * sizex + j - 1), (i * sizex + j));
                continue;
            };
            gameGraph.addNeihbour(((i - 1) * sizex + j), (i * sizex + j));
            gameGraph.addNeihbour(((i + 1) * sizex + j), (i * sizex + j));
            gameGraph.addNeihbour((i * sizex + j - 1), (i * sizex + j));
            gameGraph.addNeihbour((i * sizex + j + 1), (i * sizex + j));
        }
    //Расчет значения по случайному пути
    path = new Array();
    var lastIndex = nodes.length - 1;
    var index = 0;
    path.push(index);
    var i = 0;
    var j = 0;
    while (index != lastIndex) {
        var n = [];
        var ind = [];
        if ((i + 1) < sizey) {
            n.push((i + 1) * sizex + j);
            ind.push([i + 1, j]);
        }
        if ((j + 1) < sizex) {
            n.push(i * sizex + j + 1);
            ind.push([i, j + 1]);
        };
        if (n.length == 1) {
            index = n[0];
            i = ind[0][0];
            j = ind[0][1];
        }
        if (n.length == 2) {
            var who = Math.random() > 0.5 ? 1 : 0;
            index = n[who];
            i = ind[who][0];
            j = ind[who][1];
        };
        path.push(index);
    }
    for (var i = 0; i < path.length; i++) {
        gameGraph.addNodeInPath(path[i]);
    }
    need = gameGraph.toString();
    gameGraph.clearPath();
    var needNumberTd = document.getElementById("needNumber");
    var nowNumberTd = document.getElementById("nowNumber");
    nowNumberTd.innerHTML = "На данный момент: " + gameGraph.toString();
    needNumberTd.innerHTML = "Нужно набрать: " + need.toString();
    gameGraph.draw(canvas);
	win = 0;
}

function GetAnswer() {
    gameGraph.clearPath();
    for (var i = 1; i < path.length; i++) {
        gameGraph.addNodeInPath(path[i]);
    }
    var needNumberTd = document.getElementById("needNumber");
    var nowNumberTd = document.getElementById("nowNumber");
    nowNumberTd.innerHTML = "На данный момент: " + gameGraph.toString();
    needNumberTd.innerHTML = "Нужно набрать: " + need.toString();
    gameGraph.draw(canvas);
}

function ShowAnswer() {
    var str = "";
    str += sizex.toString() + "_";
    str += sizey.toString() + "_";
    var nodes = gameGraph.getAllNodes();
    for (var i = 0; i < nodes.length; i++)
        str += nodes[i].getType().toString() + "_" + nodes[i].getData().toString() + "_";
    for (var i = 0; i < path.length; i++) {
        str += path[i].toString() + "_";
    }
    str += "0";
    var area = document.getElementById("answer");
    area.innerHTML = str;
}

// Работа
// Определяем канву
var canvas = document.getElementById("gameCanvas");
canvas.width = 595;
canvas.height = 595;
var context = canvas.getContext('2d');
var need = -1;
var gameGraph = new GameGraph();
var path = new Array();
var sizex = 0;
var sizey = 0;
var win = 0;
var winimg = new Image();
winimg.src = 'img/win.png';
ReloadGame(3, 3);


