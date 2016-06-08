const Emoji = require('./emoji.js');
const emojiFile = 'emoji-list.json';

const list = Emoji.getEmojiList(emojiFile);
console.log('🍒  There are ' + list.length + ' emojis left.');
