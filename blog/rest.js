var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('blogdb');
var rest = {};

rest.get = function(req,res){
  var pathname = require('url').parse(req.url).pathname.split('.')[0];
  console.log(pathname);
  switch(pathname){
    case '/all-blog' : send_all_blog(res);break;
    default : res.end("nothing");
  }
}

rest.post = function(req,res){
  res.end(req.headers);
};

function send_all_blog(res){   
  db.all('select * from blog',function(err,rows){
    res.end(JSON.stringify(rows));
  })
};

module.exports = rest;
