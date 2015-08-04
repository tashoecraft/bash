var fs = require('fs');
var request = require('request');

var prompt = function(){done('prompt > ');};

var pwd = function(file){return process.env.PWD;}; prompt();};
var date = function(file){return new Date()}; prompt();};

var ls = function(file){
  fs.readdir('.', function(err, files) {
  if (err) throw err;
  var output = [];
  files.forEach(function(file) {
    output.push(file.toString());
  });
  return output.join("\n");
});};

var echo = function(file) {
  return file + "\n";
};

var cat = function(file) {
  fs.readFile(file, function (err, data) {
  if (err) throw err;
  return data.toString();
});
};

var head = function(file) {
  var newOutput = "";
  fs.readFile(file, function (err, data) {
    if (err) throw err;
    var counter = 0;
    var newData = data.toString();
    for(var i = 0; counter < 5 && newData.charAt(i); i++) {
      newOutput += newData.charAt(i);
      if (newData.charAt(i) === "\n") {
        counter++;
      }
    }
  return newOutput;
  });
};

var tail = function(file) {
  fs.readFile(file, function (err, data) {
    if (err) throw err;
    var newLinesCount = data.toString().match(/\n/g).index;
    if(newLinesCount < 6)
      return data.toString();
    else
      return data.toString().match(/(.*\n){5}$/)[0];
  });
};

var sort = function(file) {
  fs.readFile(file, function (err, data) {
    if (err) throw err;
    var dataArray = data.toString().split("\n");
    var sortedArray = dataArray.sort();
    return sortedArray.join("\n");
  });
};

var wc = function(file) {
  fs.readFile(file, function (err, data) {
    if (err) throw err;
    var dataArray = data.toString().split("\n");
    return dataArray.length;
  });
};

var uniq = function(file) {
  fs.readFile(file, function (err, data) {
    if (err) throw err;
    var dataArray = data.toString().split("\n");
    var sortedArray = dataArray.sort();
    var output = [];
    for(var i = 0; i < sortedArray.length-1; i++) {
      if(sortedArray[i] === sortedArray[i+1]) {
        output.push(sortedArray[i]);
        while(sortedArray[i] === sortedArray[i+1]) {
          i++;
        }
      } else output.push(sortedArray[i]);
    }
    return output.join("\n");
  });
};

var curl = function(url) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) return response.statusCode);
  });
};

var done = function(output) {
  process.stdout.write(output);
  process.stdout.write('prompt > ');
};


module.exports.pwd = pwd;
module.exports.date = date;
module.exports.ls = ls;
module.exports.echo = echo;
module.exports.cat = cat;
module.exports.head = head;
module.exports.tail = tail;
module.exports.sort = sort;
module.exports.wc = wc;
module.exports.uniq = uniq;
module.exports.curl = curl;
