var but = document.getElementById("wsBut");
var url = document.getElementById("wsUrl").value||"192.168.80.24:8089/Spring4MVCHelloWorld/getPointLocation";
var socket = {};
socket.url = "ws://"+url;
socket.ws = null;
socket.status = null;
socket.init = function(){
    this.ws = new WebSocket(this.url);
    this.ws.onopen = this.onopen;
    this.ws.onclose = this.onclose;
    this.ws.onmessage = this.onmessage;
    this.ws.onerror = this.onerror;
};
socket.close = function(){
    this.ws.close();
    this.ws = null;
};
socket.onopen = function(){
    socket.status = "opened";
    console.log("opened...");
};
socket.onclose = function(){
    console.log("closed...");
    socket.status = "closed";
};
socket.onerror = function(event){
    alert(event.data);
    socket.close();
};
socket.onmessage = function(event){
    var data = event.data;
    data&&socket.processing(data);
};
socket.processing = function(data){
    data&&console.log(data);
    var point = JSON.parse(data);
    pointLoc.R = point.R;
    pointLoc.ANG = point.ANG;
};
but.addEventListener("click",function(){
    if(socket.status!="opened"){
       socket.init();
       this.value="CLOSE";     
    }else{
       socket.close();
       this.value="OPEN"
    }
});