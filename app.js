const koa = require('koa');
const views = require('koa-views');
const helmet = require('koa-helmet');
const logger = require('koa-logger');
const compress = require('koa-compress');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const favicon = require('koa-favicon');

const allRoutes = require('./routes/index');

const app = new koa();
app.use(logger((str, args) => {

}));
app.use(helmet());
app.use(compress());

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(koaStatic(__dirname + '/public', {
    // maxage: 600000 // 浏览器缓存十分钟
}));
app.use(views(__dirname + '/views', {
    map: {
        html: 'ejs'
    },
    extension: 'ejs'
}));

app.use(koaBody());

app.keys = ['koa oms secret'];

allRoutes(app);

app.on('error', (err, ctx) => {
    console.log('app err:', err, ctx);
});
let port = 3000
/* istanbul ignore next */
if (!module.parent) {
    app.listen(port, function () {
        console.log(`Listening on http://localhost:${port}`);
    });
}

module.exports = app;
