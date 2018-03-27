var numOfSeeds = 300;
var noiseScale = 0.01;

function setup() {
  createCanvas(1600, 1600);
  noStroke();
  noSmooth();

  voronoiCellStrokeWeight(1);
  voronoiCellStroke(0);
  voronoiSiteFlag(false);
  voronoiRndSites(numOfSeeds, 60);

  var ocean = color(0, 0, 200);
  var grassland = color(0, 150, 0);
  var lake = color(0, 255, 255);
  var snow = color(255);

  /*for (var y = 0; y < height/numOfSeeds; y++) {
    for (var x = 0; x < width/numOfSeeds; x++) {
      var noiseVal = noise(x*noiseScale, y*noiseScale);
      if (noiseVal < 0.4) voronoiSite(x, y, color(0, 0, 200));
      else if (noiseVal < 0.7) voronoiSite(x, y, color(0, 150, 0));
      else if (noiseVal > 0.7) voronoiSite(x, y, color(255));
    }
  }*/

  voronoi(width, height);
}


function draw() {
  background(255);
  voronoiDraw(0, 0, false, false);
}
