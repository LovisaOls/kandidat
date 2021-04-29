var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Bulten6213",
});

con.connect(function (err) {
  if (err) throw err;
  con.query("CREATE DATABASE mydb", function (err, result) {
    if (err) throw err;
  });
});
