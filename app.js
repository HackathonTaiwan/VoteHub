var path = require('path');
var crypto = require('crypto');
var koa = require('koa');
var session = require('koa-session');
var Router = require('koa-router');
var serve = require('koa-static');
var bodyParser = require('koa-bodyparser');
var UAParser = require('ua-parser-js');
var mysql = require('mysql');

var dbConn = mysql.createConnection(require('./db.json'));
dbConn.connect();

var app = koa();

// Static file path
app.use(serve(path.join(__dirname, 'public'), { hidden: true }));

app.use(bodyParser());

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
router.get('/xxx', function *() {
var u = this.request.header['user-agent'];
console.log(this.request);
	this.body = 'Hi'
});

router.post('/vote', function *() {
	var parser = new UAParser(this.request.header['user-agent']);

	var ip = this.request.header['x-forwarded-for'];
	var os = parser.getOS().name + parser.getOS().version;
	var internal_ip = this.request.body.internal_ip || '';
	var browser = parser.getBrowser().name + parser.getBrowser().version;
	var target = this.request.body.target || 0;
	var age = this.request.body.age || 0;

	try {
		yield function(done) {
			dbConn.query('INSERT INTO `votes` SET ?', {
				os: os,
				ip: ip,
				internal_ip: internal_ip,
				browser: browser,
				target: target,
				age: age,
				user_agent: this.request.header['user-agent'] || ''
			}, done);
		};
	} catch(e) {}

	// wait 3 secs for stopping robot
	yield function(done) {
		setTimeout(done, 3000);
	;}

	this.body = {};
});
app.use(router.middleware());

app.listen(6001, function() {
	console.log('server is running at port', 6001);
});
