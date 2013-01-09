var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(__dirname+'/blogdb');
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
  var pathname = require('url').parse(req.url).pathname.split('.')[0];
  switch(pathname){
    case '/addnewblog' : add_new_blog(req,res);break;
  }
};

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
    }
  });
  req.on('end',function(){
    res.writeHead(302,{'Location':'http://localhost'});
    res.end();
  });
}

function send_all_blog(res){   
  db.all('select * from blog',function(err,rows){
    res.end(JSON.stringify(rows));
  })
};

module.exports = rest;
