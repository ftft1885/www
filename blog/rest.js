var rest = {};

rest.get = function(req,res){
  res.end(req.headers);
}

rest.post = function(req,res){
  res.end(req.headers);
};

module.exports = rest;
