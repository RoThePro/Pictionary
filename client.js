var ws = new WebSocket("ws://192.168.1.42:8888/");

ws.onopen=function(){
	ws.send("Viewer");
}
ws.onmessage=function(evt){
	var image = new Image;
	image.src = evt.data;
	document.body.insertBefore(image,document.body.firstChild);
	console.log(evt.data);
}


