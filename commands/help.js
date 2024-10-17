const fs = require('fs');
const path = require('path');

// Hardcoded command categories and their respective commands
const commandCategories = {
  "📖 | 𝙴𝚍𝚞𝚌𝚊𝚝𝚒𝚘𝚗": ['ai', 'blackbox', 'chatgpt', 'gemini', 'mixtral'],
  "🖼 | 𝙸𝚖𝚊𝚐𝚎": ['gmage', 'imagine', 'pinterest'],
  "🎧 | 𝙼𝚞𝚜𝚒𝚌": ['lyrics', 'spotify'],
  "👥 | 𝙼𝚎𝚖𝚋𝚎𝚛𝚜": ['alldl', 'font', 'gtranslate', 'help']
};

module.exports = {
  name: 'help',
  description: 'Show available commands',
  usage: '-help',
  author: 'System',

  execute(senderId, args, pageAccessToken, sendMessage) {
    if (args.length > 0) {
      // If a specific command name is provided, fetch its information
      const commandName = args[0];
      const commandInfo = fetchCommandInfo(commandName);
      sendMessage(senderId, { text: commandInfo }, pageAccessToken);
    } else {
      // Otherwise, send the list of available commands
      const helpMessage = buildHelpMessage();
      sendMessage(senderId, { text: helpMessage }, pageAccessToken);
    }
  }
};

// Function to build the help message
function buildHelpMessage() {
  let helpMessage = `━━━━━━━━━━━━━━\n`;
  helpMessage += `𝙰𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎 𝙲𝚘𝚖𝚖𝚊𝚗𝚝𝚜:\n`;
  helpMessage += `╭─╼━━━━━━━━╾─╮\n`;

  for (const [category, commands] of Object.entries(commandCategories)) {
    helpMessage += `│ ${category}\n`;
    commands.forEach(command => {
      helpMessage += `│ - ${command}\n`;
    });
    helpMessage += `╰─━━━━━━━━━╾─╯\n`;
  }

  helpMessage += `Chat -𝚑𝚎𝚕𝚙 <command name>\n`;
  helpMessage += `𝚃𝚘 𝚜𝚎𝚎 𝚑𝚘𝚠 𝚝𝚘 𝚞𝚜𝚎 \n`;
  helpMessage += `𝚊𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎 𝚌𝚘𝚖𝚖𝚊𝚗𝚍𝚜.\n\n`;
  helpMessage += `𝙴𝚡𝚊𝚖𝚙𝚕𝚎: -help ai\n`;
  helpMessage += `━━━━━━━━━━━━━━`;

  return helpMessage;
}

// Function to fetch command information (to be called when a specific command is requested)
function fetchCommandInfo(commandName) {
  const commandsDir = path.join(__dirname, '../commands');
  const commandFilePath = path.join(commandsDir, `${commandName}.js`);
  
  if (fs.existsSync(commandFilePath)) {
    const command = require(commandFilePath);
    return `
━━━━━━━━━━━━━━
𝙲𝚘𝚖𝚖𝚊𝚗𝚍 𝙽𝚊𝚖𝚎: ${command.name}
𝙳𝚎𝚜𝚌𝚛𝚒𝚙𝚝𝚒𝚘𝚗: ${command.description}
𝚄𝚜𝚊𝚐𝚎: ${command.usage}
━━━━━━━━━━━━━━
    `;
  } else {
    return `Command "${commandName}" not found.`;
  }
}