var emojis = require('emojis-list');
var jsonfile = require('jsonfile');

const emoji = {

    getEmojiList: function(filename) {
        var ejs = [];
        try {
            ejs = jsonfile.readFileSync(filename);
        } catch (e) {
            console.log('file not found');
            jsonfile.writeFileSync(filename, emojis);
            ejs = emojis;
        }
        return ejs;
    },

    freshEmoji: function(filename) {

        const emojiList = this.getEmojiList(filename);
        console.log('emoji length: ' + emojiList.length);

        const index = Math.floor(Math.random()*emojiList.length);
        console.log('index: ' + index);

        var e = emojiList.splice(index, 1)[0];
        console.log('e: ' + e);

        jsonfile.writeFileSync(filename, emojiList);

        return e;
    }
}


module.exports = emoji;
