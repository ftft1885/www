var ajax = {};

ajax.get = function(url,callback){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState == 4){
      callback(xmlhttp.responseText);
    }
  }
  xmlhttp.open('GET',url,true);
  xmlhttp.send();
}

ajax.post = function(url,data,callback){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState == 4){
      callback(xmlhttp.responseText);
    }
  }
  xmlhttp.open('POST',url,true);
  xmlhttp.send(data);
}
