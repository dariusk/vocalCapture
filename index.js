//var request = require('request');
//var cheerio = require('cheerio');
//var _ = require('underscore');
//_.mixin( require('underscore.deferred') );
//var inflection = require('inflection');
//var wordfilter = require('wordfilter');
var mic = require('microphone');
var fs = require('fs');
var c = 0;
// PCM wav header
var header = new Buffer([
0x52,0x49,0x46,0x46,0x24,0x00,0x00,0x80,0x57,0x41,0x56,0x45,0x66,0x6d,0x74,0x20,0x10,0x00,0x00,0x00,0x01,0x00,0x02,0x00,0x80,0xbb,0x00,0x00,0x00,0xee,0x02,0x00,0x04,0x00,0x10,0x00,0x64,0x61,0x74,0x61,0x00,0x00,0x00,0x80]);
var first = true;

Array.prototype.pick = function() {
  return this[Math.floor(Math.random()*this.length)];
};

Array.prototype.pickRemove = function() {
  var index = Math.floor(Math.random()*this.length);
  return this.splice(index,1)[0];
};

var words = ['account','begin'];
function generate() {
  if (c < words.length) {
    console.log(words[c]);
    mic.startCapture({

    });
    var bufs = [];
    // don't write the header on the first wav
    if (!first) {
      bufs.push(header);
    }
    first = false;
    mic.audioStream.on('data', function(data) {
      bufs.push(data);
    });
    setTimeout(function() {
      var buf = Buffer.concat(bufs);
      fs.writeFile('./audio/' + words[c] + '.wav', buf);
      c++;
    },1500);
  }
  else {
    process.exit(1);
  }
}
generate();
setInterval(generate, 2000);
