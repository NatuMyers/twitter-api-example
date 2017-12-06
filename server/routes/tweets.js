let express = require('express');
let router = express.Router();
let Twit = require('twit');
let config = require('../config');

// instantiate Twit module
let twitterClient = new Twit(config.twitter);

let TWEET_COUNT = 18;
let MAX_WIDTH = 253;
let OEMBED_URL = 'statuses/oembed';
let USER_TIMELINE_URL = 'statuses/user_timeline';

// GET tweets json.
router.get('/user_timeline/:user', function(req, res) {

  let oEmbedTweets = [], tweets = [],

  params = {
    screen_name: req.params.user, // the user id passed in as part of the route
    count: TWEET_COUNT // how many tweets to return
  };

  // the max_id is passed in via a query string param
  if(req.query.max_id) {
    params.max_id = req.query.max_id;
  }

  // request data
  twitterClient.get(USER_TIMELINE_URL, params, function (err, data, resp) {

    tweets = data;

    let i = 0, len = tweets.length;

    for(i; i < len; i++) {
      getOEmbed(tweets[i]);
    }
  });


  // requests the oEmbed html
  function getOEmbed (twitterClient) {

    // oEmbed request params
    let params = {
      "id": tweet.id_str,
      "maxwidth": MAX_WIDTH,
      "hide_thread": true,
      "omit_script": true
    };

    // request data
    twitterClient.get(OEMBED_URL, params, function (err, data, resp) {
      tweet.oEmbed = data;
      oEmbedTweets.push(tweet);

      // do we have oEmbed HTML for all Tweets?
      if (oEmbedTweets.length == tweets.length) {
        res.setHeader('Content-Type', 'application/json');
        res.send(oEmbedTweets);
      }
    });
  }
});

module.exports = router;
