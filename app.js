const koa = require('koa');
const views = require('koa-views');
const helmet = require('koa-helmet');
const logger = require('koa-logger');
const compress = require('koa-compress');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const favicon = require('koa-favicon');
const onerror = require('koa-onerror');
const log = require('./utils/log');

const allRoutes = require('./routes/index');

const app = new koa();
app.use(logger((str, args) => {
    log.info(args.slice(1).join(','));
}));
app.use(helmet());
app.use(compress());

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(koaStatic(__dirname + '/public'));
app.use(views(__dirname + '/views', {
    map: {html: 'ejs'}, // 注意如果这样配置的话  {html:'ejs'} 模板的后缀名是.html
    extension: 'ejs'
}));

app.use(koaBody());

onerror(app);

allRoutes(app);

app.on('error', (err, ctx) => {
    console.error('app err:', err, ctx);
});
let port = 3000
/* istanbul ignore next */
if (!module.parent) {
    app.listen(port, function () {
        console.log(`Listening on http://localhost:${port}`);
    });
}

module.exports = app;
