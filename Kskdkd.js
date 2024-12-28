const Command = require('../lib/Command');

async function handleEditCommand(sock, message, args) {
    try {
      // Extract the quoted message information
      const quotedMessageContext = message.message.extendedTextMessage?.contextInfo;
      if (!quotedMessageContext || !quotedMessageContext.quotedMessage) {
        return sock.sendMessage(message.key.remoteJid, { text: 'Please quote a message to edit.' });
      }

      // Get the stanzaId (message ID), participant (sender), and remoteJid (chat ID)
      const stanzaId = quotedMessageContext.stanzaId;
      const participant = quotedMessageContext.participant || message.key.remoteJid;
      const remoteJid = message.key.remoteJid;
      const fromMe = true;

      // Reconstruct the key for the quoted message
      const quotedMessageKey = {
        remoteJid: remoteJid,
        fromMe: fromMe,
        id: stanzaId,
      };

      // Get the new text to replace the quoted message
      const newText = args.join(' ');
      if (!newText) {
        return sock.sendMessage(remoteJid, { text: 'You need to provide new text to edit the message.' });
      }

      // Edit the quoted message
      await sock.sendMessage(remoteJid, {
        text: newText,
        edit: quotedMessageKey, // Pass the reconstructed key
      });
    } catch (error) {
      console.error('Error editing message:', error);
      sock.sendMessage(message.key.remoteJid, { text: 'Failed to edit the message.' });
    }
};
const editCommand = new Command( 'edit',
                                'edit a mesage',
                                handleEditCommand,
  'private',
  'utility',
  false
)
module.exports = { editCommand };
