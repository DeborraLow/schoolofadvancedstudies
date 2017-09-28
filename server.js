//  OpenShift sample Node application
const express = require('express'),
  app = express(),
  morgan = require('morgan'),
  router = express.Router(),
  xFrameOptions = require('x-frame-options'),
  subdomain = require('express-subdomain'),
  path = require('path'),
  env = process.env,
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  compression = require('compression'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  nodemailer = require('nodemailer'),
  fs = require('fs'),
  index = require('./routes/index'),
  users = require('./routes/users');

Object.assign = require('object-assign')

app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'))

const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
//   mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
//   mongoURLLabel = "";
//
// if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
//   var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
//     mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
//     mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
//     mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
//     mongoPassword = process.env[mongoServiceName + '_PASSWORD']
//   mongoUser = process.env[mongoServiceName + '_USER'];
//
//   if (mongoHost && mongoPort && mongoDatabase) {
//     mongoURLLabel = mongoURL = 'mongodb://';
//     if (mongoUser && mongoPassword) {
//       mongoURL += mongoUser + ':' + mongoPassword + '@';
//     }
//     // Provide UI label that excludes user id and pw
//     mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
//     mongoURL += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
//
//   }
// }
// var db = null,
//   dbDetails = new Object();
//
// var initDb = function(callback) {
//   if (mongoURL == null)
//     return;
//
//   var mongodb = require('mongodb');
//   if (mongodb == null)
//     return;
//
//   mongodb.connect(mongoURL, function(err, conn) {
//     if (err) {
//       callback(err);
//       return;
//     }
//
//     db = conn;
//     dbDetails.databaseName = db.databaseName;
//     dbDetails.url = mongoURLLabel;
//     dbDetails.type = 'MongoDB';
//
//     console.log('Connected to MongoDB at: %s', mongoURL);
//   });
// };
//
// initDb(function(err) {
//   console.log('Error connecting to Mongo. Message:\n' + err);
// });

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'marat.goya@gmail.com',
        pass: 'tpjtmfpffyikaxgh'
    }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(xFrameOptions('ALLOW-FROM http://webvisor.com/'));
// app.use(evercookie.backend({
//   pngPath: '/evercookie_png.php',
//   etagPath: '/evercookie_etag.php',
//   cachePath: '/evercookie_cache.php'
// }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(compression());

app.use('/', index);
app.use(subdomain('advanced', router));
//openshift health app test
app.get('/health', function(req, res) {
  res.writeHead(200);
  res.end();
});

app.listen(port, ip, function() {
  console.log(`Application worker ${process.pid} started...`);
});

app.use('/users', users);
app.post('/subscribe', function(req, res) {

    var email = req.body.email;
    console.log("Received new email: " + email);
    fs.readFile('public/assets/emails.txt', (err, data) => {
      if (err) console.log(err);
      fs.writeFile('public/assets/emails.txt', data + '\n' + email)
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"SAS" <sas@utmn.ru>', // sender address
        to: 'marat.goya@gmail.com', // list of receivers
        subject: 'Новый подписчик на рассылку Школы перспективных исследований', // Subject line
        text: email, // plain text body
        html: '<b>'+email+'</b>' // html body
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
    res.redirect('/');
});
app.post('/sendresult', function(req, res) {
    var now = new Date();
    var results = now.toLocaleString('en-US', { timeZone: 'Asia/Yekaterinburg' }) + ' - ' + req.headers['x-forwarded-for'] + ': ' + req.body;
    console.log("Received new test result: " + results);
    fs.readFile('public/assets/results.txt', (err, data) => {
      if (err) console.log(err);
      fs.writeFile('public/assets/results.txt', data + '\n' + results)
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"SAS" <sas@utmn.ru>', // sender address
        to: 'marat.goya@gmail.com', // list of receivers
        subject: 'Новый результат опроса по открытым лекциям Школы', // Subject line
        text: results, // plain text body
        html: '<b>'+results+'</b>' // html body
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
