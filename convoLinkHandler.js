const crypto = require('crypto');

function generateRandomString() {
  return crypto.randomBytes(3).toString('hex');
}

function initiateNewConvo() {
  const randomString = generateRandomString();
  const message = `set title to '#${randomString}'`;
  
  // TODO: Implement the steps to send the message, check for updates, and store the convoUrl
  
  return message;
}

module.exports = {
  initiateNewConvo
};