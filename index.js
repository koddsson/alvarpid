var _ = require('lodash');
var xray = require('x-ray');

module.exports.get_episodes = function(options, callback) {
  var type = options.type || undefined;
  if (!type) {
    throw 'Type not specified!';
  }
  xray('http://nutiminn.is/' + type + '/')
    .select([{
      $root: 'article[itemprop=blogPost]',
      title: '.entry-title-smaller',
      date: '.dagssetning-smaller[datetime]',
      link: '.entry-content a[href]',
      content: '.entry-content'
    }])
    .run(function(err, arr) {
      callback(_.map(arr, function(element) {
        element.content = element.content.split('\n')[1];
        return element;
      }));
    });
};

module.exports.recent_episodes = function(options, callback) {
  xray('http://nutiminn.is/alvarpid/')
    .select([{
      $root: 'article[itemprop=blogPost]',
      title: '.entry-title-smaller',
      date: '.dagssetning-smaller[datetime]',
      link: '.entry-content a[href]',
      content: '.entry-content'
    }])
    .run(function(err, arr) {
      callback(_.map(arr, function(element) {
        element.content = element.content.split('\n')[1];
        return element;
      }));
    });
};
