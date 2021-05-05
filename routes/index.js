let express = require('express');
let mysql = require('mysql2');
let router = express.Router();
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator')

function getConnection(sqlRunner) {
  let connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  })

  connection.connect()
  sqlRunner(connection)
  connection.end()
}

/* GET home page. */
router.get('/', function(req, res, next) {
  let _generatedNome = null;

  getConnection((_c) => {
    _c.query('insert into `pessoa`(nome) values (?)', [uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
      separator: ' ',
      length: 2,
      style: "capital"
    })], (err) => {
      if (err) throw err

      getConnection((_conn) => {
        _conn.query('select * from `pessoa`', (err, results) => {
          if (err) throw err

          res.render('index', {
            title: 'Programa Full Cycle',
            pessoas: results
          });
        })
      })
    })
  })
});

module.exports = router;
