const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');
const fs = require('fs');

const token = fs.readFileSync('token.txt', 'utf8');

module.exports = {
  name: 'uid',
  description: 'Fetch the user ID',
  usage: '-uid [profile link]',
  author: 'coffee',

  async execute(senderId, args) {
    const pageAccessToken = token;

    if (!args || args.length === 0) {
      return await sendUid(senderId, senderId, pageAccessToken);
    }

    const input = args.join(' ').trim();
    if (isValidUrl(input)) {
      await handleProfileLink(senderId, input, pageAccessToken);
    } else {
      await sendError(senderId, 'Error: Please provide a valid profile link.', pageAccessToken);
    }
  },
};

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const handleProfileLink = async (senderId, link, pageAccessToken) => {
  try {
    const uid = await findUid(link);
    await sendMessage(senderId, { text: `${link} => ${uid}` }, pageAccessToken);
  } catch (e) {
    await sendError(senderId, `${link} (ERROR) => ${e.message}`, pageAccessToken);
  }
};

const sendUid = async (senderId, uid, pageAccessToken) => {
  await sendMessage(senderId, { text: uid }, pageAccessToken);
};

const sendError = async (senderId, errorMessage, pageAccessToken) => {
  await sendMessage(senderId, { text: errorMessage }, pageAccessToken);
};