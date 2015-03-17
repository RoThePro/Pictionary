var ws = new WebSocket("ws://192.168.1.42:8888/");
ws.onopen=function(){
	console.log("Hello!");
}

ws.onmessage=function(evt){
	console.log(evt.data);
}

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var radius=7.5;
var dragging=false;

canvas.width = window.innerWidth*0.95;
canvas.height = window.innerHeight*0.95;

context.lineWidth = radius*2;

document.ontouchmove = function(event){
    event.preventDefault();
}

var putPoint = function(e){	
	if(dragging){
		context.lineTo(e.touches[0].clientX,e.touches[0].clientY);
		context.stroke();
		context.beginPath();
		context.arc(e.touches[0].clientX,e.touches[0].clientY,radius,0,Math.PI*2);
		context.fill();
		context.beginPath();
		context.moveTo(e.touches[0].clientX,e.touches[0].clientY);
		push();
	}
	console.log("Point put");
}


var engage = function(e){
	dragging=true;
	putPoint(e);
	console.log("Engaged");
}

var disengage = function(){
	dragging=false;
	context.beginPath();
	console.log("Disengaged");
}

var push=function(){
	var data = canvas.toDataURL();
	ws.send(data);
}

var check = function(){
	alert("Hello");
}
canvas.addEventListener('touchstart', engage);
canvas.addEventListener('touchmove', putPoint);
canvas.addEventListener('touchend', disengage);

