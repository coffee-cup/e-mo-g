"use strict";

const Emoji = require('./emoji.js');
const Twitter = require('twitter');
const CronJob = require('cron').CronJob;

const emojiFile = 'emoji-list.json';
const crontab = '20 22 * * *';
const timeoutTime = 1000 * 30;

const client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

let tweetEmoji = function(e) {
    client.post('statuses/update', {
        status: e
    }, function(error, tweet, response) {
        if (error) {
            console.log('\n');
            console.log(error);

            // try again until success
            setTimeout(() => {
                tweetEmoji(e);
            }, timeoutTime);
        } else {
            console.log('Successfully tweeted ' + e);
        }
    });
}

new CronJob(crontab, function() {
    let e = Emoji.freshEmoji(emojiFile);
    tweetEmoji(e);
}, null, true, 'America/Vancouver');

console.log('E mo G started 💥')
