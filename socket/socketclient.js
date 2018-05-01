var net = require('net');

function socketclient() {
	this.sendMessage = function(autoclose, message){
    	var inteval;
    	var socket=new net.Socket({
    	    readable:true,
    	    writable:true,
    	    allowHalfOpen:true
    	});
    	socket.on("data",function(data){
    	    console.log("recived from server:"+data.toString());
    	});
    	socket.on("close",function(){
    	    console.log(" client closed success ");
    	});
   	 	socket.on("error",function(err){
        	console.log(" client error: ",err);
   	 	});
   	 	socket.connect({
       		host:"192.168.2.225",
        	port:2001
    	},function(){
        	console.log(" server connected");
        	socket.write(message);
    	});
    	if(autoclose){
        	setTimeout(function(){
            	socket.destroy();
            	clearInterval(inteval)
            	//socket.end("我结束了","utf8");
        	},1000);
    	}
	};
}

module.exports = socketclient;
