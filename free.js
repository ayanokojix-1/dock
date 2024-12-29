const { proto, generateWAMessageFromContent } = require('@whiskeysockets/baileys');
async sendPoll(jid, question, options, pollType = 0) {
  
  const pollMessage = {
    pollCreationMessage: {
      name: question,
      options: options: options.map((option) => ({ optionName: option })),
      selectableOptionsCount: pollType, // 0 for single choice, 1 for multiple choice
    },
  };
  const message = generateWAMessageFromContent(jid, proto.Message.fromObject(pollMessage), {
    userJid: sock.user.id,
  });
  await sock.relayMessage(jid, message.message, {
    messageId: message.key.id,
  });
  const option = ['x' ,'pp', 'Asr']
  sendPoll(message.key.remoteJid, 'do you like cake',option)
