window.onload = function () {
  var canvasWidth = 900; // Largeur du canvas
  var canvasHeight = 600; // Hauteur du Canvas
  var blockSize = 30; // Taille d'un bloc
  var ctx; // contexte
  var delay = 100; //délais
  var snak; // Variable du serpent

  init(); // Appel de la fonction init

  function init() { // Fonction d'initialisation du serpent
    var canvas = document.createElement("canvas"); // Création de l'élément "canvas"
    canvas.width = canvasWidth; // Initialisation de la largeur du canvas
    canvas.height = canvasHeight; // Initialisation de la hauteur du canvas
    canvas.style.border = "1px solid"; // Attribut du style de bordure
    document.body.appendChild(canvas); // Ajout du noeud de la variable "canvas" dans la balise "body"
    ctx = canvas.getContext("2d"); // Création de la variable contexte "ctx" avec retour du context en deux dimensions 
    snak = new Snake([ // Constructeur d'un nouvel objet "Snake" sous forme d'un Array
      [6, 4],
      [5, 4],
      [4, 4]
    ]);
    refreshSnake(); // Appel de fct
  }

  function refreshSnake() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight); // Attribution de la position du canvas => x = coordonnée sur l'axe des x du point de départ du rectangle, y = coordonnée sur l'axe des y du point de départ du rectangle, canvasWidth = Largeur du canvas, canvasHeight = Hauteur du canvas. Cela représente la partie invisible de la position du canvas
    snak.advance(); // Appel de la méthode "advance"
    snak.draw(); // Appel de la méthode "draw"
    setTimeout(refreshSnake, delay); // Permet d'exécuter la fonction "refreshSnake" suivant le délai "delay" indiqué
  }

  function drawBlock(ctx, position) {
    var x = position[0] * blockSize; // Attribution de la position du bloc sur l'axe x
    var y = position[1] * blockSize; // Attribution de la position du bloc sur l'axe y
    ctx.fillRect(x, y, blockSize, blockSize); // Attribution de la position du canvas => x = coordonnée sur l'axe des x du point de départ du rectangle, y = coordonnée sur l'axe des y du point de départ du rectangle, blockSize = taille du bloc sur l'axe x, blockSize = taille du bloc sur l'axe y. Cela représente la partie visible du canvas
  }

  function Snake(body) { // fct constructeur
    this.body = body; // Corps du serpent
    this.draw = function () { // Méthode qui permet de dessiner le corps du serpent
      ctx.save(); // Sauvegarde du contexte du canvas
      ctx.fillStyle = "#ff0000"; // Attribution de style (rouge)
      for(var i = 0; i < this.body.length; ++i) { // Boucle permettant l'affichage du corps du serpent
        drawBlock(ctx, this.body[i]); // Dessin des blocs du corps du serpent en fonction du contexte
      }
      ctx.restore(); // Restaure le contexte à son état initial
    };
    this.advance = function () { // Création de la méthode "advance"
      var nextPosition = this.body[0].slice(); // Nouvelle position avec copie de l'élément avec la fonction "slice"
      ++nextPosition[0]; // Avancement du canvas
      this.body.unshift(nextPosition); // Ajouter le nextposition à la balise "body" grace à la fct "unshift"
      this.body.pop(); // Supprime le dernier élément d'un Array
    };
    
  }

}