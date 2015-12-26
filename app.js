var fs = require('fs');
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

var votePage = path.join(__dirname, 'public', 'choice.html');
var pageType = path.extname(votePage);
var pageBody = fs.readFileSync(votePage);
var startT = new Date('12/26/2015 09:00').getTime();
var endT = new Date('12/26/2015 16:00').getTime();
router.get('/', function *(next) {
	var now = Date.now();
	if (startT <= now && endT >= now) {
		this.type = pageType;
		this.body = pageBody;
	} else {
		yield next;
	}
});
/*
router.get('/databasekk', function *() {
	try {
		var rows = yield function(done) {
			dbConn.query('SELECT * from `votes`', done);
		};

		this.body = rows;
	} catch(e) {}
});
*/
router.post('/vote', function *() {
	var parser = new UAParser(this.request.header['user-agent']);

	var ip = this.request.header['x-forwarded-for'];
	var os = parser.getOS().name + ' ' + parser.getOS().version;
	var internal_ip = this.request.body.internal_ip || '';
	var browser = parser.getBrowser().name + ' ' + parser.getBrowser().version;
	var target = this.request.body.target || 0;
	var age = this.request.body.age || 0;
	var sex = this.request.body.sex || 0;

	// wait 3 secs for stopping robot
	yield function(done) {
		setTimeout(done, 3000);
	;}

	try {
		yield function(done) {
			dbConn.query('INSERT INTO `votes` SET ?', {
				os: os,
				ip: ip,
				internal_ip: internal_ip,
				browser: browser,
				target: target,
				age: age,
				gender: sex,
				user_agent: this.request.header['user-agent'] || ''
			}, done);
		};
	} catch(e) {}

	this.body = {};
});
app.use(router.middleware());

// Static file path
app.use(serve(path.join(__dirname, 'public'), { hidden: true }));

app.listen(6001, function() {
	console.log('server is running at port', 6001);
});
