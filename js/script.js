window.onload = function() {

    var canvas;
    var snk;
    var delay = 100;
    var xCoord = 0;
    var yCoord = 0;

    init();

    function init() {
    canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 600;
    canvas.style.border = "1px solid";
    document.body.appendChild(canvas);
snk = canvas.getContext('2d');
refreshSnake();
    
    }

    function refreshSnake() {
        xCoord += 2;
        yCoord += 2;
    snk.fillStyle = "blue";
    snk.clearRect(0,0,canvas.width, canvas.height);
    snk.fillRect(xCoord, yCoord, 100, 50);
    setTimeout(refreshSnake, delay);
    }
}