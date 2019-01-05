var express = require('express')
var sm = require('sitemap');

var app = express();
var sitemap = sm.createSitemap({
    hostname: 'http://aviline.com.br',
    cacheTime: 600000
});

sitemap.add({ url: '/' });
sitemap.add({ url: '/events' });
sitemap.add({ url: '/categories' });


try{
fetch("https://aviline.herokuapp.com/api/post")
    .then(function (response) {
        return response.json();
    })
    .then(function (res) {

        res.forEach(news => {
            sitemap.add({ url: `/news/${slug}` });
        });
       
    });
}
catch(e){}

try{
    fetch("https://aviline.herokuapp.com/api/category")
        .then(function (response) {
            return response.json();
        })
        .then(function (res) {
    
            res.forEach(news => {
                sitemap.add({ url: `/categories/${name}` });
            });
           
        });
    }
    catch(e){}



try{
    fetch(`https://aviline.herokuapp.com/api/event`)
        .then(function (response) {
            return response.json();
        })
        .then(function (res) {
    
            res.forEach(news => {
                sitemap.add({ url: `/events/${slug}` });
            });
           
        });
    }
    catch(e){}


    try{
        fetch(`https://aviline.herokuapp.com/api/column-author`)
            .then(function (response) {
                return response.json();
            })
            .then(function (res) {
        
                res.forEach(news => {
                    sitemap.add({ url: `/columns/${slug}` });
                });
               
            });
        }
        catch(e){} 
    

try{
    fetch(`https://aviline.herokuapp.com/api/column`)
        .then(function (response) {
            return response.json();
        })
        .then(function (res) {
    
            res.forEach(news => {
                sitemap.add({ url: `/column/${slug}` });
            });
           
        });
    }
    catch(e){}



app.get('/sitemap.xml', function (req, res) {
    res.header('Content-Type', 'application/xml');
    res.send(sitemap.toString());
});

app.listen(3000);