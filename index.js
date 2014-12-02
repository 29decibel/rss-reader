/**
 * Libraries shines
 * 1. node-readability
 * 2. feedparser
 * 3. request
 * 4. immutable.js
 * 5. q
 */



var read = require('node-readability');

read('http://www.paulgraham.com/progbot.html', function(err, article, meta) {
  // Main Article
//  console.log(article.content);
  // Title
  //console.log(article.title);

/*
 *  // HTML Source Code
 *  console.log(article.html);
 *  // DOM
 *  console.log(article.document);
 *
 *  // Response Object from Request Lib
 *  console.log(meta);
 */

  // Close article to clean up jsdom and prevent leaks
  // article.close();
});






var FeedParser = require('feedparser'),
    request = require('request');

var req = request('http://www.allthingsdistributed.com/atom.xml'),
    feedparser = new FeedParser();

req.on('error', function (error) {
  // handle any request errors
});

req.on('response', function (res) {
  var stream = this;

  if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

  stream.pipe(feedparser);
});


feedparser.on('error', function(error) {
  // always handle errors
});

feedparser.on('readable', function() {
  // This is where the action is!
  var stream = this,
      meta = this.meta, // **NOTE** the "meta" is always available in the context of the feedparser instance,
      item;

  while (item = stream.read()) {
    console.log(item);
  }
});


