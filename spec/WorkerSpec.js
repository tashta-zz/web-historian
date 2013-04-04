var stubs = require("../specHelpers/stubs");
var htmlFetcherHelpers = require("../workers/lib/html-fetcher-helpers");
describe("html fetcher helpers", function(){

  it("should have a 'readUrls' function", function(){
    var urlArray = ["example1.com", "example2.com"];

    var urlSource = new stubs.FileReadStream(urlArray.join("\n"));

    var resultArray;
    var result = htmlFetcherHelpers.readUrls(urlSource, function(urls){
      // console.log("reading urls; urls is " + urls);
      resultArray = urls;
    });

    waits(200);
    runs(function(){
      expect(resultArray).toEqual(urlArray);
    });
  });
  
  it("should have a 'downloadUrls' function", function(){
    var result = htmlFetcherHelpers.downloadUrls('www.google.com');
    waits(400);
    runs(function(){
      expect(result).toBeTruthy();
    })
  });
});