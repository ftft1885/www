var http = require('http');
var fs = require('fs');
var crypto = require('crypto');
var oss = {};
module.exports = oss;

var name = '';

oss.put = function(file,myname){
  name = '/biji/'+myname;
  var md5 = crypto.createHash('md5');
  filedata = fs.readFileSync(file);
  md5.update(filedata);
  content_md5 = md5.digest('hex').toLowerCase();
  console.log(content_md5);
  var opts = getOpts();
  var req = http.request(opts,function(res){
    var text = "";
    res.on('data',function(data){
      text += data;
    });
    res.on('end',function(){
    });
  });
  //req.write(postdata);
  req.end(filedata);
 
};

function getSid(){
  var access  = {
    id : 'ddPofY9mfxnGNEsb',
    key : 'ZT5olgXJ93JCp6kYAP1jAH64FAX4JO'
  }
  
  var params = [
    'PUT',//method
    content_md5,//contentMd5
    'application/json',//content-type
    new Date().toGMTString(),//date
    name,
  ];
  //console.log(params);

  var _sha = require('crypto').createHmac('sha1', access.key);
  _sha.update(params.join('\n'));
  return 'OSS ' + access.id + ":" + _sha.digest('base64');
}

function getHeader(){
  var headers = {
    'Content-Type' : 'application/json',
    'Content-Length' : filedata.length,
    'Content-md5' : content_md5,
    'Authorization' : getSid(),
    'Date' : new Date().toGMTString(),
    'Host' : 'oss.aliyuncs.com:80',
  };
  //console.log(headers);
  return headers;
}

function getOpts(){
  var opts = {
    headers : getHeader(),
    //url : 'http://oss.aliyuncs.com:80/biji/xxxx',
    hostname:'oss.aliyuncs.com',
    port:80,
    path:name,
    method : 'PUT'
  }
  return opts;
}
