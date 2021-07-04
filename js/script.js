window.onload = function () {
  var canvasWidth = 900; // Largeur du canvas
  var canvasHeight = 600; // Hauteur du Canvas
  var blockSize = 30; // Taille d'un bloc
  var ctx; // contexte
  var delay = 100; //délais
  var snak; // Variable du serpent
  var apple;
  var withInBlocks = canvasWidth / blockSize;
  var heightInBlocks = canvasHeight / blockSize;

  init(); // Appel de la fonction init
  console.log(init);
  function init() {
    // Fonction d'initialisation du serpent
    var canvas = document.createElement("canvas"); // Création de l'élément "canvas"
    canvas.width = canvasWidth; // Initialisation de la largeur du canvas
    canvas.height = canvasHeight; // Initialisation de la hauteur du canvas
    canvas.style.border = "1px solid"; // Attribut du style de bordure
    document.body.appendChild(canvas); // Ajout du noeud de la variable "canvas" dans la balise "body"
    ctx = canvas.getContext("2d"); // Création de la variable contexte "ctx" avec retour du context en deux dimensions
    snak = new Snake(
      [
        // Constructeur d'un nouvel objet "Snake" sous forme d'un Array
        [6, 4],
        [5, 4],
        [4, 4],
      ],
      "right"
    );
    apple = new Apple([10, 10]); // fct const de la pomme
    refreshSnake(); // Appel de fct
  }

  function refreshSnake() {
    snak.advance(); // Appel de la méthode "advance"

    if (snak.checkColision()) {
      /* GAME OVER */
    } else {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight); // Attribution de la position du canvas => x = coordonnée sur l'axe des x du point de départ du rectangle, y = coordonnée sur l'axe des y du point de départ du rectangle, canvasWidth = Largeur du canvas, canvasHeight = Hauteur du canvas. Cela représente la partie invisible de la position du canvas
      snak.draw(); // Appel de la méthode "draw"
      apple.draw();
      setTimeout(refreshSnake, delay); // Permet d'exécuter la fonction "refreshSnake" suivant le délai "delay" indiqué
    }
  }

  function drawBlock(ctx, position) {
    var x = position[0] * blockSize; // Attribution de la position du bloc sur l'axe x
    var y = position[1] * blockSize; // Attribution de la position du bloc sur l'axe y
    ctx.fillRect(x, y, blockSize, blockSize); // Attribution de la position du canvas => x = coordonnée sur l'axe des x du point de départ du rectangle, y = coordonnée sur l'axe des y du point de départ du rectangle, blockSize = taille du bloc sur l'axe x, blockSize = taille du bloc sur l'axe y. Cela représente la partie visible du canvas
  }
  function Snake(body, direction) {
    // fct constructeur du serpent
    this.body = body; // Corps du serpent
    this.direction = direction; // Direction du snake
    this.draw = function () {
      // Méthode qui permet de dessiner le corps du serpent
      ctx.save(); // Sauvegarde du contexte du canvas
      ctx.fillStyle = "#ff0000"; // Attribution de style (rouge)
      for (var i = 0; i < this.body.length; i++) {
        // Boucle permettant l'affichage du corps du serpent
        drawBlock(ctx, this.body[i]); // Dessin des blocs du corps du serpent en fonction du contexte
      }
      ctx.restore(); // Restaure le contexte à son état initial
    };
    this.advance = function () {
      // Création de la méthode "advance"
      var nextPosition = this.body[0].slice(); // Nouvelle position avec copie de l'élément avec la fonction "slice"
      console.log(nextPosition);
      switch (
        this.direction // Conditions de direction
      ) {
        case "left":
          nextPosition[0] -= 1;
          break;
        case "right":
          nextPosition[0]++;
          break;
        case "down":
          nextPosition[1]++;
          break;
        case "up":
          nextPosition[1] -= 1;
          break;
        default:
          throw "Vous allez droit dans le mur !"; // Renvoie un message d'erreur
      }
      this.body.unshift(nextPosition); // Ajouter le nextposition à la balise "body" grace à la fct "unshift"
      this.body.pop(); // Supprime le dernier élément d'un Array
    };

    this.setDirection = function (newDirection) {
      // Méthode de direction
      var allowedDirections; // Initialisation de la variable des directions autorisées
      switch (this.direction) {
        case "left":
        case "right": // Si le serpent se dirige vers la gauche ou la droite =>
          allowedDirections = ["up", "down"]; // le snake peut se diriger vers le haut ou le bas
          break;
        case "down":
        case "up": // Si le serpent se dirige vers le bas ou le haut =>
          allowedDirections = ["left", "right"]; // le snake peut se diriger vers la gauche ou la droite
          break;
        default:
          throw "Vous allez droit dans le mur !"; // Renvoie un message d'erreur
      }
      if (allowedDirections.indexOf(newDirection) > -1) {
        // Si la direction est permise. indexOf renvoie le premier indice trouvé pour un élément donné dans un tableau. Si l'élément n'est pas présent dans le tableau, la méthode renverra -1
        this.direction = newDirection;
      }
    };
    this.checkColision = function () {
      var wallCollision = false;
      var snakeCollision = false;
      var head = this.body[0];
      var rest = this.body.slice(1);
      var snakeX = head[0];
      var snakeY = head[1];
      var minX = 0;
      var minY = 0;
      var maxX = withInBlocks - 1;
      var maxY = withInBlocks - 1;
      var isNotInCanvasByX = snakeX < minX || snakeX > maxX;
      var isNotInCanvasByY = snakeY < minY || snakeY > maxY;

      if (isNotInCanvasByX || isNotInCanvasByY) {
        wallCollision = true;
      }

      for (var i = 0; i < rest.length; ++i) {
        if (snakeX === rest[i][0] && snakeY === rest[i][0]) {
          snakeCollision = true;
        }
      }
      return wallCollision || snakeCollision;
    };
  }

  function Apple(position) {
    // fct const de la pomme
    this.position = position; // Position de la pomme
    this.draw = function () {
      ctx.save();
      ctx.fillStyle = "green";
      ctx.beginPath(); // Permet de changer les propriétés du contexte
      var radius = blockSize / 2; // Rayon du cercle
      var x = position[0] * blockSize + radius;
      var y = position[1] * blockSize + radius;
      ctx.arc(x, y, radius, 0, Math.PI * 2, true); // Création du cercle
      ctx.fill(); // Remplissage du cercle

      ctx.restore();
    };
  }

  document.onkeydown = function handleKeyDown(e) {
    // Evênement (e) quand l'user appuie sur une touche
    var key = e.keyCode; // Code de la touche qui a été appuyée
    var newDirection;
    switch (key) {
      case 37: // flèche gauche
        newDirection = "left";
        break;
      case 38: // flèche du haut
        newDirection = "up";
        break;
      case 39: // flèche droite
        newDirection = "right";
        break;
      case 40: // flèche du bas
        newDirection = "down";
        break;
      default:
        return; // Sinon, ne retourne rien
    }
    snak.setDirection(newDirection);
  };
};
