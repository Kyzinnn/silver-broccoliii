const fs = require('fs');
const path = require('path');
const { sendMessage } = require('./sendMessage');
const commands = new Map();
const prefix = '-';

const commandFiles = fs.readdirSync(path.join(__dirname, '../commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`../commands/${file}`);
  commands.set(command.name.toLowerCase(), command);
}

async function handleMessage(event, pageAccessToken) {
  if (!event || !event.sender || !event.sender.id) {
    console.error('Invalid event object');
    return;
  }

  const senderId = event.sender.id;

  // Always send the commands menu when the user interacts
  const message = {
    text: "To see all commands, tap the button below:",
    quick_replies: [
      {
        content_type: "text",
        title: "Commands",
        payload: "SHOW_COMMANDS"
      }
    ]
  };
  sendMessage(senderId, message, pageAccessToken);
}

module.exports = { handleMessage };