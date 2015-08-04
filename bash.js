var commands = require('./command.js');

// Output a prompt
process.stdout.write('prompt > ');
// stdin 'data' event fires after a user types in a line
process.stdin.on('data', function(data) {
  var args = data.toString().split(/\s*\|\s*/g);
  if(args.length > 0) {
    args = args[0].split(" ");
    cmd = args[0];
    if(args[1]) commands[cmd](args[1]);
    else commands[cmd]();
  } else {
    var finish = args.reduce(function(a,b) {
      var newSplitA = a.split(" ");
      var newSplitB = b.split(" ");
      if(a[1]) {
        
      }
      return b(a);
    });
  }


});
