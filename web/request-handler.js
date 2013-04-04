var fs =require('fs');
var qs =require('qs');

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var mimeTypes = {
  'css':'text/css',
  'ttf':'font/opentype',
  'js':'application/javascript',
  'html':'text/html',
  'txt':'text'
};

exports.handleRequest = function (req, res, outputOverride) {
  var directoryStructure = req.url.split('/');
  var file = directoryStructure.pop();
  var directory = directoryStructure.pop();

  var routerHelper = function(file, rootPath){
    var type = file.split('.').pop();
    var fullPath = rootPath+file; 
    fs.readFile(fullPath, function(error, content){
      if (error) {
        console.log('ERROR!')
        statusCode = 500;
      } else {
        statusCode = 200;
        headers['Content-Type'] = mimeTypes[type];
        res.writeHead(statusCode, headers);
        res.end(content, 'utf-8');
      }
    });
  };

  if (req.method === 'GET'){
    switch (directory){
      case "public":
        var getRoot = './web/public/';
        routerHelper(file, getRoot);
        break;
      case "":
        getRoot = './web/public/index.html';
        routerHelper("", getRoot);
        break;
      case "sites":
        var getRoot = './data/sites/';
        routerHelper(file, getRoot);
        break;
      case "data":
        var getRoot = './data/'
        routerHelper(file, getRoot);
        break;
      default:
        statusCode = 404;
        res.writeHead(statusCode, headers);
        res.end("error");
    }
  }
  if (req.method === 'POST'){
    statusCode = 302;
    req.on('data', function(data){
      receivedUrl = JSON.parse(data);
      output = receivedUrl.url + '\n';
      if(outputOverride){
        outputOverride.write(output);
      }else{
        var writeStream = fs.createWriteStream('./data/sites.txt', {'flags': 'a'});
        writeStream.write(output);
      }
      headers['Content-Type'] = "application/json";
      res.writeHead(statusCode, headers);
      res.end(output, 'utf-8');
    })
  }
};