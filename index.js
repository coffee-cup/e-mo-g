const Emoji = require('./emoji.js');
const Secrets = require('./secrets.js');
const Twitter = require('twitter');

const emojiFile = 'emoji-list.json';

const client = new Twitter({
    consumer_key: Secrets.consumerKey,
    consumer_secret: Secrets.consumerSecret,
    access_token_key: Secrets.accessTokenKey,
    access_token_secret: Secrets.accessTokenSecret
});

let e = '';

let tweetEmoji = function() {
    e = Emoji.freshEmoji(emojiFile);

    client.post('statuses/update', {
        status: e
    }, function(error, tweet, response) {
        if (error) {
            console.log(error);
        }
    });
}

tweetEmoji();
