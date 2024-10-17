const fs = require('fs');
const path = require('path');

const commandCategories = {
  "📖 | 𝙴𝚍𝚞𝚌𝚊𝚝𝚒𝚘𝚗": ['ai', 'blackbox', 'chatgpt', 'gemini', 'mixtral'],
  "🖼 | 𝙸𝚖𝚊𝚐𝚎": ['gmage', 'imagine', 'pinterest'],
  "🎧 | 𝙼𝚞𝚜𝚒𝚌": ['lyrics', 'spotify'],
  "👥 | 𝙾𝚝𝚑𝚎𝚛𝚜": ['alldl', 'font', 'gtranslate', 'help']
};

module.exports = {
  name: 'help',
  description: 'Show available commands',
  usage: '-help',
  author: 'System',
  
  execute(senderId, args, pageAccessToken, sendMessage) {
    const helpMessage = buildHelpMessage();
    sendMessage(senderId, { text: helpMessage }, pageAccessToken);
  }
};

function buildHelpMessage() {
  let helpMessage = `━━━━━━━━━━━━━━\n`;
  helpMessage += `𝙰𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎 𝙲𝚘𝚖𝚖𝚊𝚗𝚝𝚜:\n`;
  
  for (const [category, commands] of Object.entries(commandCategories)) {
    helpMessage += `╭─╼━━━━━━━━╾─╮\n`;  // Add roof line for each category
    helpMessage += `│ ${category}\n`;
    commands.forEach(command => {
      helpMessage += `│ - ${command}\n`;
    });
    helpMessage += `╰─━━━━━━━━━╾─╯\n`;  // Add bottom line for each category
  }

  helpMessage += `Chat -𝚑𝚎𝚕𝚙 <command name>\n`;
  helpMessage += `𝚃𝚘 𝚜𝚎𝚎 𝚑𝚘𝚠 𝚝𝚘 𝚞𝚜𝚎 \n`;
  helpMessage += `𝚊𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎 𝚌𝚘𝚖𝚖𝚊𝚗𝚍𝚜.\n\n`;
  helpMessage += `𝙴𝚡𝚊𝚖𝚙𝚕𝚎: -help ai\n`;
  helpMessage += `━━━━━━━━━━━━━━`;

  return helpMessage;
}