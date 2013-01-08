var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('blogdb');
var rest = require('./rest.js');

module.exports = function(req,res){
//  db.run("insert into test values('test',"+(new Date()).getTime()+")");
  var pathname = require('url').parse(req.url).pathname;
  if(pathname == '/'){pathname += 'index.html';}
  var filepath = '.' + pathname.split('.')[0];

  var filekind = pathname.split('.')[1];
  if(!filekind)  filekind = 'html';//maybe jade,ets,other day

  var contentType = "text/html";//default
  switch(filekind){
    case 'html'  :  break;
    case 'gif'   :  contentType = 'image/gif';break;
    case 'jpg'   :  contentType = 'image/jpeg';break;
    case 'png'   :  contentType = 'image/png';break;
    case 'css'   :  contentType = 'text/css';break;
    case 'js'    :  contentType = 'text/javascript';break;
    case 'get'   :  rest.get(req,res);return;break;
    case 'post'  :  rest.post(req,res);break;
  }
  filepath += '.' + filekind;

  var fs = require('fs');
  fs.readFile(filepath,function(err,data){
    if(err){
      res.writeHead(404,{'Content-Type':'text/plain'});
      res.end("ERROR:"+err);
    }
    res.writeHead(200,{'Content-Type':contentType});
    res.end(data);
  });
  //res.end('blog');
}

