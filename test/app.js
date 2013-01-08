module.exports = function(req,res){
  console.log("enter");
  console.log(req.headers);
  res.end("yes");
}
