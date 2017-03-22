// CanvasRenderingContext2D.prototype.addTransGrid = function(a, b, c, d, e, f, delta, gridColor, frameColor, font) {
//     // define the default values for the optional arguments
//     //定义可选参数的默认值
//     if (typeof arguments[6] === "undefined") {
//         delta = 25;
//     }
//     if (typeof arguments[7] === "undefined") {
//         gridColor = '#00FF00';
//     }
//     if (typeof arguments[8] === "undefined") {
//         frameColor = '#00FF00';
//     }
//     if (typeof arguments[9] === "undefined") {
//         font = '8px sans-serif';
//     }
//     // local function, where trans([x0,y0])===[x,y] is new coordinate point for the given point [x0,y0]
//     // 局部函数，将给定点[x0,y0]变换成[x,y]
//     var trans = function(point) {
//         var x = point[0];
//         var y = point[1];
//         return [(a * x) + (c * y) + e, (b * x) + (d * y) + f];
//     }
//     // original (old) canvas width and height
//     // 原始canvas的宽高
//     var w = this.canvas.width;
//     var h = this.canvas.height;
//     // compute the new four corner points of the old canvas border
//     // 计算原始canvas边上的四个点的新位置
//     var lup = trans([0, 0]);
//     // left upper point
//     // 左上角的顶点
//     var llp = trans([0, h]);
//     // left lower point
//     // 左下角的顶点
//     var rup = trans([w, 0]);
//     // right upper point
//     // 右上角顶点
//     var rlp = trans([w, h]);
//     // right lower point
//     // 右下角顶点
//     // compute the lowest and highest x and y values of both the old and the new canvas border
//     // 计算新旧canvas边线上x、y的最大最小值
//     var minX = Math.min(lup[0], llp[0], rup[0], rlp[0], 0);
//     // is negative or zero
//     // 负数或者零
//     var maxX = Math.max(lup[0], llp[0], rup[0], rlp[0], w);
//     // is positive, at least w
//     // 正数，至少和参数w相等
//     var minY = Math.min(lup[1], llp[1], rup[1], rlp[1], 0);
//     // is negative or zero
//     // 负数或者是零
//     var maxY = Math.max(lup[1], llp[1], rup[1], rlp[1], h);
//     // is positve, at least h
//     // 正数，至少是h
//     // compute the offset for the x and y axis
//     // 计算x、y轴的位移量
//     var xOff = (minX < 0 ? -minX : 0) + delta;
//     // is positive
//     // 正数
//     var yOff = (minY < 0 ? -minY : 0) + delta;
//     // is positive
//     // 正数
//     // resize the canvas
//     // 重新设置canvas的尺寸
//     new_w = xOff + maxX + delta;
//     new_h = yOff + maxY + delta;
//     this.canvas.width = new_w;
//     this.canvas.height = new_h;
//     // offTrans([x,y]) returns the transformed point [x',y'] that takes care of the offset
//     // offTrans([x,y]) 返回计算偏移量后的点[x',y']
//     function offTrans(p) {
//         var newP = trans(p)
//         return ( [xOff + newP[0], yOff + newP[1]]) ;
//     };
//     // draw the frame, i.e. the border of the original canvas
//     // 绘制框架，换句话说就是最初的canvas边框
//     this.strokeStyle = frameColor;
//     this.lineWidth = 1.0;
//     this.lineJoin = 'miter';
//     this.lineCap = 'round';
//     this.strokeRect(xOff, yOff, w, h);
//     // draw the new grid
//     // 绘制新的网格
//     this.strokeStyle = gridColor;
//     this.lineWidth = 1.0;
//     this.beginPath();
//     for (var i = 0; i * delta <= w; i++) {
//         var p = offTrans([i * delta, 0]);
//         var q = offTrans([i * delta, h]);
//         this.moveTo(p[0], p[1]);
//         this.lineTo(q[0], q[1]);
//     }
//     for (var j = 0; j * delta <= h; j++) {
//         var p = offTrans([0, j * delta]);
//         var q = offTrans([w, j * delta]);
//         this.moveTo(p[0], p[1]);
//         this.lineTo(q[0], q[1]);
//     }
//     this.stroke();
//     // draw the two arrows for the new grid
//     // 绘制新的网格上的两个箭头
//     this.strokeStyle = gridColor;
//     this.lineWidth = 1.0;
//     this.lineJoin = 'miter';
//     this.lineCap = 'round';
//     var arrSize = 5;
//     // size of the arrow head
//     // 箭头的size
//     this.beginPath();
//     // x-arrow
//     // x箭头
//     this.moveTo(offTrans([0, 0])[0], offTrans([0, 0])[1]);
//     this.lineTo(offTrans([w, 0])[0], offTrans([w, 0])[1]);
//     this.moveTo(offTrans([w - arrSize, -arrSize])[0], offTrans([w - arrSize, -arrSize])[1]);
//     this.lineTo(offTrans([w, 0])[0], offTrans([w, 0])[1]);
//     this.moveTo(offTrans([w - arrSize, arrSize])[0], offTrans([w - arrSize, arrSize])[1]);
//     this.lineTo(offTrans([w, 0])[0], offTrans([w, 0])[1]);
//     // y-arrow
//     // y箭头
//     this.moveTo(offTrans([0, 0])[0], offTrans([0, 0])[1]);
//     this.lineTo(offTrans([0, h])[0], offTrans([0, h])[1]);
//     this.moveTo(offTrans([-arrSize, h - arrSize])[0], offTrans([-arrSize, h - arrSize])[1]);
//     this.lineTo(offTrans([0, h])[0], offTrans([0, h])[1]);
//     this.moveTo(offTrans([arrSize, h - arrSize])[0], offTrans([arrSize, h - arrSize])[1]);
//     this.lineTo(offTrans([0, h])[0], offTrans([0, h])[1]);
//     this.stroke();
//     // write the text; first the numbers of the x-axis
//     // x轴上的点
//     this.textBaseline = 'middle';
//     this.textAlign = 'center';
//     this.fillStyle = gridColor;
//     var halfDelta = -Math.floor(delta / 2);
//     // y-coordinate for the number strings
//     // y轴上的点
//     for (var i = 0; i * delta <= w; i++) {
//         this.fillText(i * delta, offTrans([i * delta, halfDelta])[0], offTrans([i * delta, halfDelta])[1]);
//     }
//     for (var j = 0; j * delta <= h; j++) {
//         this.fillText(j * delta, offTrans([halfDelta, j * delta])[0], offTrans([halfDelta, j * delta])[1]);
//     }
//     // write `x` and `y`
//     // 标注x和y
//     this.fillText('x', offTrans([w - halfDelta, 0])[0], offTrans([w - halfDelta, 0])[1]);
//     this.fillText('y', offTrans([0, h - halfDelta])[0], offTrans([0, h - halfDelta])[1]);
// };
CanvasRenderingContext2D.prototype.addScaledGrid = function(x, y, delta, gridColor, frameColor, font) {
    this.addTransGrid(x, 0, 0, y, 0, 0, delta, gridColor, frameColor, font);
};
CanvasRenderingContext2D.prototype.getCentrePoint = function(){
    var w = this.canvas.width;
    var h = this.canvas.height;
    var centrePoint = new Point(w*0.5,h*0.5);
    return centrePoint;
};
CanvasRenderingContext2D.prototype.mvpt = function(point){
    this.moveTo(point.x,point.y);
};
CanvasRenderingContext2D.prototype.lt = function(point){
    this.lineTo(point.x,point.y);
};
CanvasRenderingContext2D.prototype.generateArrowOnLine = function(line,strokeStyle){
    //x轴上的箭头
    this.beginPath();
    this.strokeStyle = strokeStyle||"#00ff00";
    this.mvpt(new transPoint(new Point(0,ctx.canvas.height*0.5)));
    this.lt(new transPoint(new Point(3,190)));
    this.stroke();
    this.beginPath();
    this.strokeStyle = strokeStyle||"#00ff00";
    this.mvpt(new transPoint(new Point(0,ctx.canvas.height*0.5)));
    this.lt(new transPoint(new Point(-3,190)));
    this.stroke();
    //y轴上的箭头
    this.beginPath();
    this.strokeStyle = strokeStyle||"#00ff00";
    this.mvpt(new transPoint(new Point(ctx.canvas.width*0.5,0)));
    this.lt(new transPoint(new Point(190,3)));
    this.stroke();
    this.beginPath();
    this.strokeStyle = strokeStyle||"#00ff00";
    this.mvpt(new transPoint(new Point(ctx.canvas.width*0.5,0)));
    this.lt(new transPoint(new Point(190,-3)));
    this.stroke();
};
/*生成坐标系*/
CanvasRenderingContext2D.prototype.generateAxisOnCentrePoint = function(strokeStyle){
    var centrePoint = this.getCentrePoint();
    //x轴
    var xAxis = new Line();
    //y轴
    var yAxis = new Line();
    xAxis.startPoint = new Point(centrePoint.x,0);
    xAxis.endPoint = new Point(centrePoint.x,centrePoint.y*2);
    yAxis.startPoint = new Point(0,centrePoint.y);
    yAxis.endPoint = new Point(centrePoint.x*2,centrePoint.y);
    this.beginPath();
    this.strokeStyle=strokeStyle;
    this.mvpt(xAxis.startPoint);
    this.lt(xAxis.endPoint);
    this.stroke();
    this.beginPath();
    this.strokeStyle=strokeStyle;
    this.mvpt(yAxis.startPoint);
    this.lt(yAxis.endPoint);
    this.stroke();
    //生成坐标轴上的箭头
    this.generateArrowOnLine(xAxis);
    //this.generateArrowOnLine(yAxis);
};
/*点*/
function Point(x,y){
    this.x = x||0;
    this.y =y||0;
};
/*线*/
function Line(startPoint,endPoint){
    this.startPoint = startPoint||(new Point());
    this.endPoint = endPoint||(new Point());
};
/*显示鼠标位置*/
function showCoordinateOfMouse(id){
     var o = id&&document.getElementById(id);
     o.addEventListener("mousemove",function(event){
         getCoordinates(event,this);
     },false);
     o.addEventListener("mouseout",function(event){
         clearCoordinates();
     },false);
     //也可以用o.onmousemove
};
/*显示鼠标位置*/
function getCoordinates(e,o){
    var rect = o.getBoundingClientRect();
    var x = e.clientX - ctx.getCentrePoint().x - rect.left;
    var y = e.clientY - ctx.getCentrePoint().y - rect.top;
    y = y * (-1);
    document.getElementById("xycoordinates").innerHTML="(x, y):("+x+", "+y+")";
};
/*消除鼠标位置*/
function clearCoordinates(){
    document.getElementById("xycoordinates").innerHTML="";
};
/*将坐标系坐标转换为canvas坐标*/
function transPoint(point){
    this.x = point.x + ctx.getCentrePoint().x;
    this.y = -1*(point.y - ctx.getCentrePoint().y);
};
/*生成grid*/
function generateGrid(delta){
    var delta = delta||20;
    var n = (ctx.canvas.width - ctx.canvas.width%delta)/delta;
    for(var i=1;i<=n;i++){
        var dashLineY = new Line(new transPoint({x:delta*i,y:0}), new transPoint({x:delta*i,y:ctx.canvas.height}));
        var dashLineX = new Line(new transPoint({x:0,y:delta*i}), new transPoint({x:ctx.canvas.width,y:delta*i}));
        drawDashLine(dashLineY);
        drawDashLine(dashLineX);      
    }
};
function initCoordinate(id){
    var cv =document.getElementById(id);
    ctx = cv.getContext("2d");
    ctx.generateAxisOnCentrePoint('#00ff00');
    //ctx.addScaledGrid(1, 1, 40, '#00ff00', '#00ff00');
};
function drawDashLine(line){
    ctx.setLineDash([1,1]);
    ctx.beginPath();
    ctx.mvpt(line.startPoint);
    ctx.lt(line.endPoint);
    ctx.stroke();
};
function generateCircles(){
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.arc (ctx.getCentrePoint().x, ctx.getCentrePoint().y, 20, 0, 2 * Math.PI, false);
    ctx.arc (ctx.getCentrePoint().x, ctx.getCentrePoint().y, 40, 0, 2 * Math.PI, false);
    ctx.arc (ctx.getCentrePoint().x, ctx.getCentrePoint().y, 60, 0, 2 * Math.PI, false);
    ctx.arc (ctx.getCentrePoint().x, ctx.getCentrePoint().y, 80, 0, 2 * Math.PI, false);
    ctx.arc (ctx.getCentrePoint().x, ctx.getCentrePoint().y, 100, 0, 2 * Math.PI, false);
    ctx.arc (ctx.getCentrePoint().x, ctx.getCentrePoint().y, 120, 0, 2 * Math.PI, false);
    ctx.stroke();
};
//r 距离 , a 角度
function drawPoint(r,a){
    ctx.strokeStyle="#FFC125"
    var x = 200+r*Number(Math.cos(Math.PI*(a/180)).toFixed(2));//toFixed四舍五入
    var y = 200-r*Number(Math.sin(Math.PI*(a/180)).toFixed(2));
    ctx.beginPath();
    ctx.arc(x,y,0.5,0,2*Math.PI,false);
    ctx.closePath();
    ctx.stroke();
};
var ctx;
initCoordinate("myCanvas");
showCoordinateOfMouse("myCanvas");
//generateGrid(20);
//generateCircles();
