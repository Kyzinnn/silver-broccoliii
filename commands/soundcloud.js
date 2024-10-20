const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');
const fs = require('fs');
const path = require('path');

const token = fs.readFileSync('token.txt', 'utf8');

module.exports = {
  name: 'soundcloud',
  description: 'Search and play a track from SoundCloud',
  usage: '-soundcloud [track name]',
  author: 'coffee',

  async execute(senderId, args) {
    const pageAccessToken = token;

    if (!Array.isArray(args) || args.length === 0) {
      return await sendMessage(senderId, { text: 'Error: Missing track name!' }, pageAccessToken);
    }

    const query = args.join(' ').trim();
    const apiUrl = `https://betadash-search-download.vercel.app/sc?search=${encodeURIComponent(query)}`;

    try {
      const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
      
      if (response && response.data) {
        // Create a temporary file path for the audio
        const audioPath = path.resolve(__dirname, `../temp/${query}.mp3`);
        fs.writeFileSync(audioPath, response.data);

        // Send the caption first
        await sendMessage(senderId, { text: `🎵 Now playing: ${query}` }, pageAccessToken);

        // Send the audio file as an attachment
        await sendMessage(senderId, {
          attachment: {
            type: 'audio',
            payload: {
              is_reusable: true,
              url: audioPath,
            },
          },
        }, pageAccessToken);

        // Delete the temporary file after sending
        fs.unlinkSync(audioPath);
      } else {
        await sendMessage(senderId, { text: 'Error: Unable to find or play the track.' }, pageAccessToken);
      }
    } catch (error) {
      console.error('Error fetching SoundCloud track:', error);
      await sendMessage(senderId, { text: 'Error: Unable to process your request.' }, pageAccessToken);
    }
  },
};