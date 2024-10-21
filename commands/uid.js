const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'uid',
  description: 'Get your UID',
  usage: '-uid',
  author: 'coffee',

  async execute(senderId) {
    try {
      await sendMessage(senderId, { text: `Your UID is: ${senderId}` });
    } catch (error) {
      console.error('Error sending UID:', error);
      await sendMessage(senderId, { text: 'Error: Unable to retrieve your UID.' });
    }
  },
};