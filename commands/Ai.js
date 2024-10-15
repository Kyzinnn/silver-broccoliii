const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: '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' });

const messageHistory = new Map();
const maxMessageLength = 2000;

const sbd = {
  // (bold font mapping remains the same)
};

// Function to split a message into chunks
function splitMessageIntoChunks(text, maxLength) {
  const messages = [];
  for (let i = 0; i < text.length; i += maxLength) {
    messages.push(text.slice(i, i + maxLength));
  }
  return messages;
}

// Function to apply bold font transformation
function applyBoldFont(text) {
  return text.split('').map(char => sbd[char] || char).join('');
}

// Function to detect and transform bold text in the content
function transformBoldContent(text) {
  return text.replace(/\*\*(.*?)\*\*/g, (_, boldText) => applyBoldFont(boldText));
}

// Wrapping response message with header and footer
function wrapResponseMessage(text) {
  const header = "(⁠◍⁠•⁠ᴗ⁠•⁠◍⁠) | 𝙼𝚘𝚌𝚑𝚊 𝙰𝚒\n・───────────・\n";
  const footer = "\n・──── >ᴗ< ─────・";
  return `${header}${text}${footer}`;
}

module.exports = {
  name: 'ai',
  description: 'response within seconds',
  author: 'Nics',

  async execute(senderId, messageText, pageAccessToken, sendMessage) {
    try {
      console.log("User Message:", messageText);

      // Send an empty message to indicate processing
      sendMessage(senderId, { text: '' }, pageAccessToken);

      let userHistory = messageHistory.get(senderId) || [];
      if (userHistory.length === 0) {
        userHistory.push({ role: 'system', content: 'Your name is Mocha AI. You can answer any questions asked.' });
      }
      userHistory.push({ role: 'user', content: messageText });

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
            // Check if the transformed message is not empty
            if (transformedMessage.trim().length > 0) {
              sendMessage(senderId, { text: wrapResponseMessage(transformedMessage) }, pageAccessToken);
            }
          }
          responseMessage = '';
        }
      }

      // Send any remaining part of the response
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
      sendMessage(senderId, { text: wrapResponseMessage("An error occurred while trying to reach the API.") }, pageAccessToken);
    }
  }
};