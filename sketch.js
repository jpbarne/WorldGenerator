var numOfSeeds = 500;
var noiseScale = 0.07;
var zoneClicked = false;
var s;
var clickX;
var clickY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  noSmooth();

  voronoiSiteFlag(false);
  voronoiCellStrokeWeight(0);
  voronoiRndMinDist(1);

  var snow = color(255);

  for (var y = 0; y < height/30; y++) {
    for (var x = 0; x < width/30; x++) {
      var noiseVal = noise(x*noiseScale, y*noiseScale);
      var ocean = color(noiseVal*100, noiseVal*200, 255);
      var grassland = color(noiseVal*100, 200-noiseVal*150, noiseVal*100);
      var dirt = color(150 - noiseVal*100, 100-noiseVal*70, 0);

      if      (noiseVal < 0.42) voronoiSite(x*100*noiseVal, y*100*noiseVal, ocean);
      else if (noiseVal < 0.60) voronoiSite(x*100*noiseVal, y*100*noiseVal, grassland);
      else if (noiseVal < 0.67) voronoiSite(x*100*noiseVal, y*100*noiseVal, dirt);
      else if (noiseVal < 0.70) voronoiSite(x*100*noiseVal, y*100*noiseVal, grassland);
      else 	   					voronoiSite(x*100*noiseVal, y*100*noiseVal, snow);
    }
  }

  voronoi(windowWidth, windowHeight);
}


function draw() {
  voronoiDraw(0, 0);
  if(zoneClicked){
    text(s, 20, 60);
    voronoiDrawCell(clickX, clickY, s, VOR_CELLDRAW_BOUNDED, true, true);
  }
}

function mouseClicked() {
  s = voronoiGetSite(mouseX, mouseY);
  clickX = mouseX;
  clickY = mouseY;
  textSize(64);
  zoneClicked = true;
}
