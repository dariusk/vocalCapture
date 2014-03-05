//var request = require('request');
//var cheerio = require('cheerio');
var _ = require('underscore');
_.mixin( require('underscore.deferred') );
//var inflection = require('inflection');
//var wordfilter = require('wordfilter');
var exec = require('child_process').exec;
var markov = require('markov');
var m = markov(2);

Array.prototype.pick = function() {
  return this[Math.floor(Math.random()*this.length)];
};

Array.prototype.pickRemove = function() {
  var index = Math.floor(Math.random()*this.length);
  return this.splice(index,1)[0];
};

var words = [
  'time',
  'person',
  'year',
  'way',
  'day',
  'thing',
  'man',
  'world',
  'life',
  'hand',
  'part',
  'child',
  'eye',
  'woman',
  'place',
  'work',
  'week',
  'case',
  'point',
  'government',
  'company',
  'number',
  'group',
  'problem',
  'the',
  'be',
  'to',
  'of',
  'and',
  'a',
  'in',
  'that',
  'have',
  'I',
  'it',
  'for',
  'not',
  'on',
  'with',
  'he',
  'as',
  'you',
  'do',
  'at',
  'this',
  'but',
  'his',
  'by',
  'from',
  'they',
  'we',
  'say',
  'her',
  'she',
  'or',
  'an',
  'will',
  'my',
  'one',
  'all',
  'would',
  'there',
  'their',
  'what',
  'so',
  'fact',
  'is',
  'are'
];
var sentence;

var phrase = 'a good part of that is “just marketing,” but even the best slogans, ads, landing pages, PR campaigns, etc., will fall down if they are not supported by the experience people have when they hit our site, when they sign up for an account, when they first begin using the product and when they start using it day in, day out.';


//for (var i=0;i<5;i++) {
//  sentence.push(words.pick());
//}
var ind = 1;
var outOld;

function concat() {
  console.log('sox ./audio/' + sentence[ind-1] + '.wav ./audio/' + sentence[ind] + '.wav ./audio/ofile.wav');
  exec('sox ./audio/' + sentence[ind-1] + '.wav ./audio/' + sentence[ind] + '.wav ./audio/ofile.wav').on('close', function() {
    if (ind < sentence.length) {
      ind++;
      outOld = 'ofile';
      concatNext();
    }
  });
}

function concatNext() {
  console.log(sentence[ind]);
  var out = 'ofile';
  if (ind % 2 == 0) {
    out = 'ofile2';
  }
  console.log('sox ./audio/' + outOld + '.wav ./audio/' + sentence[ind] + '.wav ./audio/' + out + '.wav');
  exec('sox ./audio/' + outOld + '.wav ./audio/' + sentence[ind] + '.wav ./audio/' + out + '.wav').on('close', function() {
    if (ind < sentence.length) {
      ind++;
      outOld = out;
      concatNext();
    }
  });
}
var markov = '';
m.seed(phrase, function () {
    var res = m.respond(phrase,170).join(' ');
    res = 'the marketing campaigns are the best way for people to work'
    sentence = res.replace(/\W+/g,' ').trim().split(' ');
    
    //res = inflection.humanize(res).substr(0,170);
    console.log(res);



concat();

    });
