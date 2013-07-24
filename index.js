var express = require("express");
var app = express();
var port = 3700;
 

var wdata=[ {arr: [] ,max:0,avg:0 },{arr:[],max:0,avg:0 },{arr:[],max:0,avg:0 },{arr:[],max:0,avg:0 },{arr:[],max:0,avg:0 } ];
app.get("/", function(req, res){
    res.send('<!DOCTYPE html><html><head></head><title>Real time web chat</title><script src="/chat.js"></script><script src="/drag.js"></script><script src="/socket.io/socket.io.js"></script><link href="/style.css" rel="stylesheet" type="text/css" media="screen" /><body><center><div class="deletezone" ondrop="dropdelete(event)" ondragover="allowDrop(event)">Drop here to Delete</div><div class="container"><div class="shelfcontainer"><div class="shelf" id="1" ondrop="drop(event)" ondragover="allowDrop(event)"></div><div class="s1 stats">Available Position : <span id="av1">10</span><br />Max items : <span id="max1">0</span><br />Avg items : <span id="avg1">0</span></div></div><div class="shelfcontainer"><div class="shelf" id="2" ondrop="drop(event)" ondragover="allowDrop(event)"></div><div class="s1 stats">Available Position : <span id="av2">10</span><br />Max items : <span id="max2">0</span><br />Avg items : <span id="avg2">0</span></div></div><div class="shelfcontainer"><div class="shelf" id="3" ondrop="drop(event)" ondragover="allowDrop(event)"></div><div class="s1 stats">Available Position : <span id="av3">10</span><br />Max items : <span id="max3">0</span><br />Avg items : <span id="avg3">0</span></div></div><div class="shelfcontainer"><div class="shelf" id="4" ondrop="drop(event)" ondragover="allowDrop(event)"></div><div class="s1 stats">Available Position : <span id="av4">10</span><br />Max items : <span id="max4">0</span><br />Avg items : <span id="avg4">0</span></div></div><div class="shelfcontainer"><div class="shelf" id="5" ondrop="drop(event)" ondragover="allowDrop(event)"></div><div class="s1 stats">Available Position : <span id="av5">10</span><br />Max items : <span id="max5">0</span><br />Avg items : <span id="avg5">0</span></div></div><div class="boxb"  ondragstart="drag(event)" id="boxb" ></div><br /><br /><br /><label>Items</label><input type="text" id="items" size="5"/><input type="button" value="set" onclick="setitems()"/></div></div></center></body></html>');
});
 
 
app.use(express.static(__dirname + '/public'));
var io = require('socket.io').listen(app.listen(port));//app.listen(port);

io.sockets.on('connection', function (socket) {
//console.log(datastore);
    socket.emit('message',  wdata ); //send first copy of data to client on connection
    socket.on('send', function (data) {
	wdata=data;//update the server's data with the received data
    io.sockets.emit('message', data); //re-emit the updated data to all connected clients
    });
});
console.log("Listening on port " + port);