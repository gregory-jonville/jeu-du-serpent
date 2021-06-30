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
}