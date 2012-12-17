// Все координаты в долях высоты и ширины канвы (то есть от 0 до 1)
var GameGraph = function () {
    // Массив узлов
    this.nodes = new Array();
    // Список смежности узлов
    this.neihbours = new Array();
    // Список индексов пройденных узлов
    this.path = new Array();
    // Добавляем узел node со списком соседей nei
    this.addNode = function (node, nei) {
        var flag = true;
        // Выясняем правильные ли соседи у узла
        for (n in nei) {
            if ((node.getType() == 0 && n.getType() == 0) || (node.getType() > 0 && n.getType() > 0)) {
                flag = false;
                break;
            }
        }
        // Если соседи правильные или список соседей пуст - добавляем
        if (flag) {
            this.nodes.push(node);
            this.neihbours.push(nei);
            return 0;
        }
        else
            return -1;
    }
    // Добавить соседа с индексом nei к узлу с индексом nodeIndex
    this.addNeihbour = function (nei, nodeIndex) {
        if ((this.nodes[nodeIndex].getType() == 0 && this.nodes[nei].getType() > 0) ||
            (this.nodes[nodeIndex].getType() > 0 && this.nodes[nei].getType() == 0))
            this.neihbours[nodeIndex].push(nei);
    }
    // Добавить узел в путь
    this.addNodeInPath = function (nodeIndex) {
        if (this.path.length == 0 && this.nodes[nodeIndex].getType() > 0)
            return -1;
        if (this.path.length == 0) {
            this.path.push(nodeIndex);
            return 0;
        }
        if (this.inPath(nodeIndex)) {
            var mas = new Array();
            for (var i = 0; this.path[i] != nodeIndex; i++)
                mas.push(this.path[i]);
            mas.push(nodeIndex);
            this.path = mas;
            return 0;
        }
	var size = Math.round(Math.sqrt(this.nodes.length + 1));
	var lastPathIndex = this.path[this.path.length - 1];
	var i = Math.floor(nodeIndex / size);
        var j = nodeIndex % size;
	var lasti = Math.floor(lastPathIndex / size);
        var lastj = lastPathIndex % size;
        if(lasti == i) {
	    for(jj = lastj+1; jj <= j; jj++)
		this.path.push(i*size + jj);
	    return 0;
	}
        if(lastj == j) {
	    for(ii = lasti+1; ii <= i; ii++)
		this.path.push(ii*size + j);
            return 0;
	}
        return -1;
    }

    // Текущий набранный результат
    this.nowResult = function () {
        var res = null;
        if (this.path.length == 0)
            return Infinity;
        else
            res = this.nodes[0].getData();
        for (i = 2; i < this.path.length; i += 2) {
            if (this.nodes[this.path[i - 1]].getType() == 1)
                res += this.nodes[this.path[i]].getData();
            if (this.nodes[this.path[i - 1]].getType() == 2)
                res -= this.nodes[this.path[i]].getData();
            if (this.nodes[this.path[i - 1]].getType() == 3)
                res *= this.nodes[this.path[i]].getData();
        }
        return res;
    }

    // Текущее строковое представление
    this.toString = function () {
        if (this.path.length == 0)
            return "Пусто";
        if (this.nodes[this.path.length - 1].getType() == 0)
            return this.nowResult().toString();
        else
            return this.nowResult().toString() + " " + this.nodes[this.path[this.path.length - 1]].toString();
    }

    // Возвращаем узел в который попадает точка x, y
    this.getNodeXY = function (x, y) {
        for (var i = 0; i < this.nodes.length; i++)
            if (this.nodes[i].isInside(x, y)) {
                return this.nodes[i];
            }
        return null;
    }

    // Возвращаем индекс узла в который попадает точка x, y
    this.getNodeIndexXY = function (x, y) {
        for (var i = 0; i < this.nodes.length; i++)
            if (this.nodes[i].isInside(x, y)) {
                return i;
            }
        return -1;
    }

    // Получаем список узлов
    this.getAllNodes = function () {
        return this.nodes;
    }

    // Получаем список смежности узлов
    this.getAllNeihbours = function () {
        return this.neihbours;
    }

    // Получаем путь
    this.getPath = function () {
        return this.path;
    }

    // Отрисовываем GameGraph на canvas
    this.draw = function (canvas) {
        // Рисуем узлы графа
        for (var i = 0; i < this.nodes.length; i++) {
            if (this.inPath(i)) {
                this.nodes[i].draw(canvas, "#fff", "#33b5e5");
            }
            else
                this.nodes[i].draw(canvas, "#33b5e5", "#fff");
        }
    }

    // Входит ли узел в путь
    this.inPath = function (nodeIndex) {
        for (var i = 0; i < this.path.length; i++) {
            if (this.path[i] == nodeIndex)
                return true;
        };
        return false;
    }

    // Очищаем путь
    this.clearPath = function () {
        this.path = new Array();
        this.path.push(0);
    }

    // Выдаем последний индекс пути
    this.getLastPathIndex = function () {
        if (this.path.length == 0)
            return -1;
        return this.path[this.path.length - 1];
    }

}