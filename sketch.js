//initial setup
function setup() {
  populate();
  createCanvas(800, 800);
}

//continuous
function draw() {
  background(255);

  //draw cells
  for (var i = 0; i < cells.length; i++) {
    hexagon(cells[i]);
  }
}

var cells = [];       //grid of hexagon cells
var numCells = 10000; //TODO add ability to edit in browser

//hexagon dimensions
var hexW = 10;
var hexH = Math.sqrt(3)/2 * hexW;

//fill cells array
function populate() {
  var x = 0.5*hexW, y = 0.5*hexH, clock = 0;
  noiseDetail(2, 0.6); 

  for (var i = 0; i < numCells; i++) {
    cells[i] = new Cell(x, y, noise(x, y)); //quasi-random elevation

    //flat-side-up hexagon grid
    x = (x+(0.75*hexW)) % (50*0.5*hexW);
    if (x == 0.75*hexW) {
      y += 0.2*hexH;
      clock = 0;
    }
    else if (clock == 0) {
      y += 0.2 * hexH;
      clock = 1;
    }
    else if (clock == 1) {
      y -= 0.2 * hexH;
      clock = 0;
    }
  }
}

//cell class
class Cell {
  constructor(x, y, elev) {
    this.x = x;
    this.y = y;
    this.elev = elev;
  }
}

function hexagon(cell) {
  //stroke(0);
  strokeWeight(0);

  if (cell.elev < 0.5) fill(0, 0, 255); // water
  else if (cell.elev < 0.53) fill(230, 200, 0); // sand
  else if (cell.elev < 0.75) fill(0, 255, 0); // grass
  else if (cell.elev < 0.8) fill(144, 238, 144); // light grass
  else fill(255); // snow

  //draw hexagons
  var angle = TWO_PI / 6;
  beginShape();
  for (var a = 0; a < TWO_PI; a+=angle) {
    var sx = (cell.x + cos(a) * 2) * hexW/2;
    var sy = (cell.y + sin(a) * 2) * hexW/2;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
