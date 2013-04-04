var helpers = require('/Users/Catalyst/code/archive.org/workers/lib/html-fetcher-helpers.js');
var fs = require('fs');
var _ = require('underscore');
var cronJob = require('cron').CronJob;
var job = new cronJob({
  cronTime: '*/1 * * * *',
  onTick: function() {
    helpers.readUrls(fs.createReadStream('/Users/Catalyst/code/archive.org/data/sites.txt'), function(siteArray){
      _.each(siteArray, function(url){
        if(!fs.existsSync('/Users/Catalyst/code/archive.org/data/sites/'+url)){
          helpers.downloadUrls(url);
        }
      });
    });
  },
  start: false,
  timeZone: "America/Los_Angeles"
});
job.start();