var express = require('express')
var sm = require('sitemap');

var app = express();
var sitemap = sm.createSitemap ({
    hostname: 'http://example.com',
    cacheTime: 600000
  });

sitemap.add({url: '/'});
sitemap.add({url: '/events'});
sitemap.add({url: '/categories'});





    
app.get('/sitemap.xml', function(req, res) {
  res.header('Content-Type', 'application/xml');
  res.send( sitemap.toString() );
});

app.listen(3000);