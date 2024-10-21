const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');
const fs = require('fs');

const token = fs.readFileSync('token.txt', 'utf8');

module.exports = {
  name: 'ai',
  description: 'Chat with GPT-4',
  usage: '-ai <your message>',
  author: 'coffee',

  async execute(senderId, args) {
    const pageAccessToken = token;

    if (!Array.isArray(args) || args.length === 0) {
      return await sendError(senderId, 'Error: Missing input!', pageAccessToken);
    }

    const input = args.join(' ').trim();
    await handleChatResponse(senderId, input, pageAccessToken);
  },
};

const handleChatResponse = async (senderId, input, pageAccessToken) => {
  const apiUrl = `https://joshweb.click/gpt4?prompt=${encodeURIComponent(input)}&uid=${senderId}`;

  try {
    const { data } = await axios.get(apiUrl);
    const responseText = data.gpt4 || 'No response from the API.';
    const formattedMessage = `⁠(◍•ᴗ•◍) | 𝙼𝚘𝚌𝚑𝚊 𝙰𝚒\n・───────────・\n${responseText}\n・──── >ᴗ< ─────・`;

    await sendMessage(senderId, { text: formattedMessage }, pageAccessToken);
  } catch (error) {
    console.error('Error reaching the API:', error);
    await sendError(senderId, 'An error occurred while trying to reach the API.', pageAccessToken);
  }
};

const sendError = async (senderId, errorMessage, pageAccessToken) => {
  const formattedMessage = `⁠(◍•ᴗ•◍) | 𝙼𝚘𝚌𝚑𝚊 𝙰𝚒\n・───────────・\n${errorMessage}\n・──── >ᴗ< ─────・`;
  await sendMessage(senderId, { text: formattedMessage }, pageAccessToken);
};
