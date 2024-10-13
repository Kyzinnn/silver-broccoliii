const axios = require('axios');
module.exports = {
  name: 'chatgpt',
  description: 'Ask a question to GPT-4',
  author: 'Deku (rest api)',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    const prompt = args.join(' ');
    try {
      const apiUrl = `https://ajiro-rest-api.gleeze.com/api/gpt4o1?prompt=${encodeURIComponent(prompt)}&uid=100${senderId}`;
      const response = await axios.get(apiUrl);
      const { message, img_urls } = response.data;

      // Clean up the message by removing the markdown-style image link
      const cleanMessage = message.replace(/!.*?.*?/, '').trim();

      // Split the response message if it exceeds 2000 characters
      const maxMessageLength = 2000;
      if (cleanMessage.length > maxMessageLength) {
        const messages = splitMessageIntoChunks(cleanMessage, maxMessageLength);
        for (const msg of messages) {
          sendMessage(senderId, { text: msg }, pageAccessToken);
        }
      } else {
        sendMessage(senderId, { text: cleanMessage }, pageAccessToken);
      }

      // If there are image URLs, send them as attachments
      if (img_urls && img_urls.length > 0) {
        for (const imgUrl of img_urls) {
          sendMessage(senderId, { attachment: { type: 'image', payload: { url: imgUrl } } }, pageAccessToken);
        }
      }
    } catch (error) {
      console.error('Error calling GPT-4 API:', error);
      sendMessage(senderId, { text: 'Please enter a valid question.' }, pageAccessToken);
    }
  }
};

function splitMessageIntoChunks(message, chunkSize) {
  const chunks = [];
  for (let i = 0; i < message.length; i += chunkSize) {
    chunks.push(message.slice(i, i + chunkSize));
  }
  return chunks;
}
