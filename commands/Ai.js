const Groq = require('groq-sdk');

// Primary and fallback API keys
const primaryApiKey = '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';
const fallbackApiKey = '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';

// Initialize Groq with the primary API key
let groq = new Groq({ apiKey: primaryApiKey });

const messageHistory = new Map();
const maxMessageLength = 2000;

const boldFontMap = {
  // ... (existing font mapping)
};

const splitMessageIntoChunks = (text, maxLength) => {
  const messages = [];
  for (let i = 0; i < text.length; i += maxLength) {
    messages.push(text.slice(i, i + maxLength));
  }
  return messages;
};

const applyBoldFont = (text) => {
  return text.split('').map(char => boldFontMap[char] || char).join('');
};

const transformBoldContent = (text) => {
  return text.replace(/\*\*(.*?)\*\*/g, (_, boldText) => applyBoldFont(boldText));
};

const wrapResponseMessage = (text) => {
  const header = "(⁠◍⁠•⁠ᴗ⁠•⁠◍⁠) | 𝙼𝚘𝚌𝚑𝚊 𝙰𝚒\n・───────────・\n";
  const footer = "\n・──── >ᴗ< ─────・";
  return `${header}${text}${footer}`;
};

// Function to switch API key
const switchApiKey = () => {
  groq = new Groq({ apiKey: fallbackApiKey });
};

module.exports = {
  name: 'ai',
  description: 'Interact with llama3 Ai.',
  usage: '-ai <question>',
  author: 'Nics/Coffee',

  async execute(senderId, messageText, pageAccessToken, sendMessage) {
    try {
      console.log("User Message:", messageText);

      const userHistory = messageHistory.get(senderId) || [];
      if (userHistory.length === 0) {
        userHistory.push({ role: 'system', content: 'Your name is Mocha AI. You can answer any questions asked.' });
      }
      userHistory.push({ role: 'user', content: Array.isArray(messageText) ? messageText[0] : messageText });

      const chatCompletion = await groq.chat.completions.create({
        messages: userHistory,
        model: 'llama3-8b-8192',
        temperature: 1,
        max_tokens: 1025,
        top_p: 1,
        stream: true,
        stop: null
      });

      let responseMessage = '';

      for await (const chunk of chatCompletion) {
        const chunkContent = chunk.choices[0]?.delta?.content || '';
        responseMessage += chunkContent;

        if (responseMessage.length >= maxMessageLength) {
          const messages = splitMessageIntoChunks(responseMessage, maxMessageLength);
          for (const message of messages) {
            let transformedMessage = transformBoldContent(message);
            if (transformedMessage.trim().length > 0) {
              sendMessage(senderId, { text: wrapResponseMessage(transformedMessage) }, pageAccessToken);
            }
          }
          responseMessage = '';
        }
      }

      if (responseMessage.trim()) {
        userHistory.push({ role: 'assistant', content: responseMessage });
        messageHistory.set(senderId, userHistory);

        let transformedMessage = transformBoldContent(responseMessage);
        sendMessage(senderId, { text: wrapResponseMessage(transformedMessage) }, pageAccessToken);
      } else {
        throw new Error("Received empty response from Groq.");
      }

    } catch (error) {
      console.error('Error communicating with Groq:', error.message);

      if (error.message.includes('API limit') || error.message.includes('cooldown')) {
        console.log('Switching to fallback API key...');
        switchApiKey();
        // Retry the function with the fallback API key
        return this.execute(senderId, messageText, pageAccessToken, sendMessage);
      }

      sendMessage(senderId, { text: wrapResponseMessage("An error occurred while trying to reach the API.") }, pageAccessToken);
    }
  }
};