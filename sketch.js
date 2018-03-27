var numOfSeeds = 300;
var noiseScale = 0.07;
var zoneClicked = false;
var s;
var clickX;
var clickY;

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
  var dirt = color(150, 100, 0);
  var snow = color(255);

  for (var y = 0; y < height/30; y++) {
    for (var x = 0; x < width/30; x++) {
      var noiseVal = noise(x*noiseScale, y*noiseScale);
      ocean = color(noiseVal*100, noiseVal*200, 255);
      grassland = color(noiseVal*100, 200-noiseVal*150, noiseVal*100);
      dirt = color(150 - noiseVal*100, 100-noiseVal*70, 0);
      if      (noiseVal < 0.40)  voronoiSite(x*100*noiseVal, y*100*noiseVal, ocean);
      else if (noiseVal < 0.60) voronoiSite(x*100*noiseVal, y*100*noiseVal, grassland);
      else if (noiseVal < 0.67) voronoiSite(x*100*noiseVal, y*100*noiseVal, dirt);
      else if (noiseVal < 0.70) voronoiSite(x*100*noiseVal, y*100*noiseVal, grassland);
      else if (noiseVal > 0.70) voronoiSite(x*100*noiseVal, y*100*noiseVal, color(255, 255, 255));
    }
  }

  voronoi(width, height);
}


function draw() {
  //background(255);
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
