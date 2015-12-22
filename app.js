var crypto = require('crypto');
var koa = require('koa');
var session = require('koa-session');
var Router = require('koa-router');
var serve = require('koa-static');

var app = koa();

// Static file path
app.use(serve(path.join(__dirname, 'public'), { hidden: true }));

// Initializing session and setting it expires in one month
app.keys = 'ASDasd123v4rfv5tgbyhiujm21ed' || [];
app.use(session(app, {
	maxAge: 30 * 24 * 60 * 60 * 1000
}));

// Initializing locals to make template be able to get
app.use(function *(next) {
	if (!this.state.id)
		this.state.id = crypto.randomBytes(32).toString('base64');	

	yield next;
});

// Routes
var router = new Router();
router.get('/', function *() {
	this.body = 'Hi'
});
app.use(router.middleware());

app.listen(6001, function() {
	console.log('server is running at port', 6001);
});
