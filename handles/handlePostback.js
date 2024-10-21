const { sendMessage } = require('./sendMessage');
const fs = require('fs');
const path = require('path');

// Function to get all commands as bubbles
const getCommandsBubbles = () => {
  const COMMANDS_PATH = path.join(__dirname, '../commands');
  const commandFiles = fs.readdirSync(COMMANDS_PATH).filter(file => file.endsWith('.js'));
  
  const bubbles = commandFiles.map(file => {
    const command = require(`../commands/${file}`);
    return {
      title: `-${command.name}`,
      subtitle: command.description,
      buttons: [
        {
          type: "postback",
          title: "Use Command",
          payload: command.name.toUpperCase()
        }
      ]
    };
  });

  return bubbles;
};

const handlePostback = (event, pageAccessToken) => {
  const senderId = event.sender.id;
  const payload = event.postback.payload;

  if (payload === "SHOW_COMMANDS") {
    const bubbles = getCommandsBubbles();
    const message = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: bubbles
        }
      }
    };

    sendMessage(senderId, message, pageAccessToken);
  } else {
    console.error('Unknown postback payload:', payload);
  }
};

module.exports = { handlePostback };