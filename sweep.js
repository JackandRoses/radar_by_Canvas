var radius = 20*6,
sweepSize = 10,
hueStart = 150,
hueEnd = 200,
saturation = 50,
lightness = 60;

var pointLoc = {R:'0',ANG:'0'};//默认目标极坐标

var gradient = ctx.createLinearGradient(0,10,0,0);
gradient.addColorStop( 0, 'hsla( ' + hueStart + ', ' + saturation + '%, ' + lightness + '%, 1 )' );
gradient.addColorStop( 1, 'hsla( ' + hueEnd + ', ' + saturation + '%, ' + lightness + '%, 0.1 )' );

function dToR( degrees ){ 
  return degrees * (Math.PI / 180);
};

function renderSweep(){
  ctx.beginPath();
  ctx.moveTo( 0, 0 );
  ctx.arc( 0, 0, radius, 0, dToR(sweepSize), false);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(0,0);
  ctx.lineTo(120,20);
  ctx.closePath();
  ctx.stroke();
};

function renderOuterFrame(){
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(getAcPoint(-198,150).x,getAcPoint(-198,150).y);
  ctx.arcTo(getAcPoint(-200,200).x,getAcPoint(-200,200).y,getAcPoint(-100,200).x,getAcPoint(-100,200).y,50);
  ctx.lineTo(getAcPoint(150,200).x,getAcPoint(150,200).y);
  ctx.stroke();
}

function getAcPoint(x,y){
    var p = {};
    p.x = x + ctx.getCentrePoint().x;
    p.y = -1*(y - ctx.getCentrePoint().y);
    return p;
};

function init(){
  window.requestAnimationFrame(draw);
};

function draw() {
  ctx.globalCompositeOperation = 'lighter';
  ctx.clearRect(0,0,400,400);
  ctx.strokeStyle = '#00ff00';
  ctx.save();
  initCoordinate("myCanvas");
  generateGrid(20);
  generateCircles();
  renderOuterFrame();
  drawPoint(pointLoc.R,pointLoc.ANG);
  ctx.translate(200,200);
  var time = new Date();
  ctx.rotate( ((2*Math.PI)/6)*time.getSeconds() + ((2*Math.PI)/6000)*time.getMilliseconds() );
  renderSweep();
  ctx.restore();
  window.requestAnimationFrame(draw);
};
init();
