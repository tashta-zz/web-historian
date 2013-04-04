var httpGet = require('http-get');

exports.readUrls = function(urlSource, cb){
  urlSource.setEncoding();
  var array = [];
  urlSource.on('data', function(data){
    //turn it back into an array
    array = data.split('\n');
  });
  urlSource.on('end', function(){
    cb(array);
  })

};

exports.downloadUrls = function(url){
  var file = '/Users/Catalyst/code/archive.org/data/sites/'+url;

  var toDL = {url: 'http://'+url};
  console.log(file)
  httpGet.get(toDL, file, function (error, result) {
    if (error) {
      console.error(error);
    } else {
      console.log(result);
      console.log('File downloaded at: ' + result.file);
    }
  });
    return true;
};