var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tableauxRouter = require('./routes/tableaux')
var cardRoutes = require('./routes/cards');
var listeRoutes = require('./routes/liste');
// Importer les modèles
const db = require('./models');
const createDatabase = require('./createDatabase');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    origin: ['http://localhost:3000']

}));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tableaux', tableauxRouter);
app.use('/cards', cardRoutes);
app.use('/listes', listeRoutes);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Synchroniser les modèles avec la base de données
db.sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
// Créer la base de données si elle n'existe pas, puis synchroniser les modèles
createDatabase().then(() => {
  db.sequelize.sync()
      .then(() => {
        console.log('Database & tables created!');
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
      });
}).catch(err => {
  console.error('Failed to create database:', err);
});
module.exports = app;
