var path = require('path');
var express = require('express')
var sm = require('sitemap');
const fetch = require("node-fetch");
const host = 'http://aviline.com.br';
const app = express();




var sitemap = sm.createSitemap({
    hostname: host,
    cacheTime: 6000
});




function contains(obj) {
    var flag = false;
    sitemap.urls.forEach((e) => {
        if (e.url === obj.url) flag = true;
    });
    return flag;
}



const getData = async () => {

    try {

        sitemap = sm.createSitemap({
            hostname: host,
            cacheTime: 6000
        });

        sitemap.add({ url: '/', changefreq: 'always', priority: 1.0 });

        sitemap.add({ url: '/events', changefreq: 'daily', priority: 0.4 });

        sitemap.add({ url: '/categories', changefreq: 'daily', priority: 0.8 });

        const responsePosts = await fetch("https://aviline.herokuapp.com/api/post");
        const posts = await responsePosts.json();

        posts.forEach(news => {
            const obj = { url: `/news/${news.slug}` };
            if (!contains(obj)) {
                sitemap.add(obj);

            }

        });

        const responseEvents = await fetch(`https://aviline.herokuapp.com/api/event`);
        const events = await responseEvents.json();
        events.forEach(event => {
            const obj = { url: `/events/${event.slug}` };
            if (!contains(obj)) {
                sitemap.add(obj);

            }
        });

        const responseAuthors = await fetch(`https://aviline.herokuapp.com/api/column-author`);
        const authors = await responseAuthors.json();
        authors.forEach(author => {
            const obj = { url: `/columns/${author.slug}` };
            if (!contains(obj)) {
                sitemap.add(obj);

            }
        });

        const responseColumns = await fetch(`https://aviline.herokuapp.com/api/column`);
        const columns = await responseColumns.json();
        columns.forEach(column => {
            const obj = { url: `/column/${column.slug}` };
            if (!contains(obj)) {
                sitemap.add(obj);

            }
        }

        );


    }
    catch (e) { };
};


update();

function update() {
    setTimeout(() => {
        getData();
        update();
        console.log("Atualizou!");
    }, 30000);

}


app.use(express.static(path.join(__dirname, 'build')));

app.get('/sitemap.xml', function (req, res) {
    res.header('Content-Type', 'application/xml');
    res.send(sitemap.toString());
});


app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(process.env.PORT || 3000);
