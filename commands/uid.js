const { sendMessage } = require('../handles/sendMessage');
const fs = require('fs');

const token = fs.readFileSync('token.txt', 'utf8');

module.exports = {
  name: 'uid',
  description: 'Get your UID',
  usage: '-uid',
  author: 'coffee',

  async execute(senderId) {
    const pageAccessToken = token;

    try {
      await sendMessage(senderId, { text: `${senderId}` }, pageAccessToken);
    } catch (error) {
      console.error('Error sending UID:', error);
      await sendMessage(senderId, { text: 'Error: Unable to retrieve your UID.' }, pageAccessToken);
    }
  },
};