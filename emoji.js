var emojis = require('emojis-list');
var jsonfile = require('jsonfile');

const emoji = {

    getEmojiList: function(filename) {
        var ejs = [];
        try {
            ejs = jsonfile.readFileSync(filename);
        } catch (e) {
            console.log('file not found ' + filename);
            jsonfile.writeFileSync(filename, emojis);
            ejs = emojis;
        }
        return ejs;
    },

    freshEmoji: function(filename, debug = false) {
        if (debug) console.log('\n');

        const emojiList = this.getEmojiList(filename);
        if (debug) console.log('emoji length: ' + emojiList.length);

        const index = Math.floor(Math.random()*emojiList.length);
        if (debug) console.log('index: ' + index);

        var e = emojiList.splice(index, 1)[0];
        if (debug) console.log('e: ' + e);

        jsonfile.writeFileSync(filename, emojiList);

        return e;
    }
}


module.exports = emoji;
