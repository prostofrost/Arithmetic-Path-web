// Все координаты в долях высоты и ширины канвы (то есть от 0 до 1)
var GameNode = function (type, data, x, y) {
    // Тип узла
    // 0 - число
    // 1 - сложение
    // 2 - вычитание
    // 3 - умножение
    this.type = type;
    // Размеры узла
    this.sizex = 0.2;
    this.sizey = 0.2;
    // Данные узла (имеют смысл, если узел числовой)
    this.data = data;
    // Координаты узла
    this.x = x;
    this.y = y;
    // Возвращаем тип узла
    this.getType = function () {
        return this.type;
    }
    // Возвращаем данные узла
    this.getData = function () {
        return this.data;
    }
    // Возвращаем координату x узла
    this.getX = function () {
        return this.x;
    }
    // Возвращаем координату y узла
    this.getY = function () {
        return this.y;
    }
    // Возвращаем размеры узла
    this.getSizeX = function () {
        return this.sizex;
    }
    this.getSizeY = function () {
        return this.sizey;
    }
    // Устанавливаем размеры узла
    this.setSizeX = function (sizex) {
        this.sizex = sizex;
    }
    this.setSizeY = function (sizey) {
        this.sizey = sizey;
    }
    // Возвращаем строковое представление данных
    this.toString = function () {
        if (this.type == 0)
            return this.data.toString();
        if (this.type == 1)
            return "+";
        if (this.type == 2)
            return "-";
        if (this.type == 3)
            return "*";
    }

    // Прорисовываем элемент на канве canvas
    this.draw = function (canvas, rectColor, fontColor) {
        var context = canvas.getContext('2d');
        var xx = this.x * canvas.width;
        var yy = this.y * canvas.height;
        var w = this.sizex * canvas.width;
        var h = this.sizey * canvas.height;
        context.fillStyle = rectColor;
        context.fillRect(xx - w / 2, yy - h / 2, w, h);
        context.fillStyle = fontColor;
        context.font = "40px Segoe UI";
        context.textBaseline = "middle";
        context.textAlign = "center";
        context.fillText(this.toString(), xx, yy);
    }

    // Определяем попадание точки x, y в узел
    this.isInside = function (x, y) {
        if (x <= (this.x + this.sizex / 2) && x >= (this.x - this.sizex / 2 ) 
            && y <= (this.y + this.sizey / 2) && y >= (this.y - this.sizey / 2))
            return true;
        else
            return false;
    }

}