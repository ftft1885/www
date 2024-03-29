var sqlite3 = require('sqlite3').verbose();
var oss = require('./backup.js');
var db = new sqlite3.Database(__dirname+'/blog.db');
var rest = {};

var i = 1;//backup num

function backup(num){
  oss.put(__dirname+'/blog.db','blog'+num+'.db');
  console.log("backup"+num);
  if(num == 10) i = 1;
}

rest.get = function(req,res){
  var pathname = require('url').parse(req.url).pathname.split('.')[0];
  console.log(pathname);
  switch(pathname){
    case '/all-blog' : send_all_blog(res);break;
    default : res.end("nothing");
  }
}

rest.post = function(req,res){
  var pathname = require('url').parse(req.url).pathname.split('.')[0];
  switch(pathname){
    case '/addnewblog' : add_new_blog(req,res);break;
    case '/blog-update': update_blog(req,res);break;
  }
};

function update_blog(req,res){
  req.on('data',function(data){
    var json = JSON.parse(data+"");
    var stmt = "update blog set title='"+json.title+"'"
    + ",content='"+json.content+"'"
    + "where rowid="+json.rowid+";";
    console.log(stmt);
    db.run(stmt,function(){
      console.log('success');
      backup(i++);
    });
    res.end('ok');
  });
}

function add_new_blog(req,res){
  req.on('data',function(data){
    var form = require('querystring').parse(data+"");
    console.log(form);
    var _value = ['\''+form.title+'\''
                  ,'\''+form.content+'\''
		  ,'\''+'ft'+'\''
		  ,(new Date()).getTime()
		  ];
    console.log(_value);
    var value = _value.join(',');
    console.log(value);
    console.log(new Date());
    if(form.psw == "iloveft"){
      var stmt = 'insert into blog(title,content,author,pubdate)'
      +'values('+value+');';
      console.log(stmt);
      db.run(stmt);
      backup(i++);
    }
  });
  req.on('end',function(){
    res.writeHead(302,{'Location':'http://localhost'});
    res.end();
  });
}

function send_all_blog(res){   
  db.all('select rowid,* from blog',function(err,rows){
    console.log(rows);
    res.end(JSON.stringify(rows));
  })
};

module.exports = rest;
