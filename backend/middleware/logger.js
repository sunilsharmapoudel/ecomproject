import colors from "colors";
import fs from "fs";

function logger(req, res, next) {
  let reqColors = {
    GET: "bgGreen",
    POST: "yellow",
    PUT: "blue",
    DELETE: "red",
  };

  let start = Date.now();
  res.on("finish", () => {
    let end = Date.now();
    let today = new Date();
    let log = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()} - ${req.method
      } ${req.originalUrl} ${req.ip} ${res.statusCode} ${end - start}ms \n`;

    let saveLog = fs.appendFile("log.txt", log, function (err) {
      if (err) throw err;
      console.log('log file updated')
    })

    console.log(log[reqColors[req.method]]);
  });

  next();
}

export default logger;