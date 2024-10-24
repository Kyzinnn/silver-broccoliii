const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');
const fs = require('fs');

const token = fs.readFileSync('token.txt', 'utf8');

module.exports = {
  name: 'audio',
  description: 'Sends an audio song via title',
  usage: '-audio <song name>',
  author: 'coffee',
  async execute(senderId, args) {
    const pageAccessToken = token;

    if (!args || !Array.isArray(args) || args.length === 0) {
      await sendMessage(senderId, { text: 'Please provide a song title.' }, pageAccessToken);
      return;
    }

    const input = args.join(' ');

    try {
      const trackURLServices = [
        { url: 'https://spotify-play-iota.vercel.app/spotify', params: { query: '' } }
      ];

      for (const { url, params } of trackURLServices) {
        try {
          params.query = input;
          const response = await axios.get(url, { params });
          if (response.data.trackURLs && response.data.trackURLs.length > 0) {
            const trackUrl = response.data.trackURLs[0];
            const downloadLink = await axios.get(`https://sp-dl-bice.vercel.app/spotify?id=${encodeURIComponent(trackUrl)}`);
            const downloadUrl = downloadLink.data.download_link;

            await sendMessage(senderId, { attachment: { type: 'audio', payload: { url: downloadUrl } } }, pageAccessToken);
            return;
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }

      await sendMessage(senderId, { text: 'Error: Could not find song.' }, pageAccessToken);

    } catch (error) {
      console.error('Error:', error);
      await sendMessage(senderId, { text: 'Error: Unexpected error.' }, pageAccessToken);
    }
  }
};
