var numOfSeeds = 300;
var noiseScale = 0.01;

function setup() {
  createCanvas(1600, 1600);
  noStroke();
  noSmooth();

  voronoiCellStrokeWeight(1);
  voronoiCellStroke(0);
  voronoiSiteFlag(false);
  //voronoiRndSites(numOfSeeds, 60);

  var ocean = color(0, 0, 200);
  var grassland = color(0, 150, 0);
  var lake = color(0, 255, 255);
  var snow = color(255);

  for (var y = 0; y < height/30; y++) {
    for (var x = 0; x < width/30; x++) {
      var noiseVal = noise(x*noiseScale*100, y*noiseScale*100);
      if (noiseVal < 0.4)      voronoiSite(x*100*noiseVal, y*100*noiseVal, color(0, 0, 200));
      else if (noiseVal < 0.7) voronoiSite(x*100*noiseVal, y*100*noiseVal, color(0, 150, 0));
      else if (noiseVal > 0.7) voronoiSite(x*100*noiseVal, y*100*noiseVal, color(0, 255, 255));
    }
  }

  voronoi(width, height);
}


function draw() {
  //background(255);
  voronoiDraw(0, 0);
}
