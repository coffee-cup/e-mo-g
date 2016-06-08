const Emoji = require('./emoji.js');
const Secrets = require('./secrets.js');
const Twitter = require('twitter');
const CronJob = require('cron').CronJob;

const emojiFile = 'emoji-list.json';
const crontab = '10 22 * * *';
const timeoutTime = 1000 * 30;

const client = new Twitter({
    consumer_key: Secrets.consumerKey,
    consumer_secret: Secrets.consumerSecret,
    access_token_key: Secrets.accessTokenKey,
    access_token_secret: Secrets.accessTokenSecret
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
