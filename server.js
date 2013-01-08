var http = require('http');
var localhost = 'localhost';//yitiaobiji.com

http.createServer(function(req,res){
  var host = req.headers.host;
  switch(host){
    case '69.85.84.73'  :  require('./test/app.js')(req,res);
	break;
    case 'yitiaobiji.com' : require('./blog/app.js')(req,res);break;
    case localhost  :  require('./blog/app.js')(req,res);
    	break;
	
    default : res.end("welcome ft server");
  }
}).listen(80,function(){console.log("Big Server on 80");});
