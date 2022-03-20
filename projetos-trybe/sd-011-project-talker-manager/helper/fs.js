const fs = require('fs').promises;

async function readTalkerFile() {
  const rawData = await fs.readFile('./talker.json');
  const data = await JSON.parse(rawData);
  return data;
}

async function writeTalkerFile(data) {
  await fs.writeFile('./talker.json', JSON.stringify(data, null, 2));
}

module.exports = { readTalkerFile, writeTalkerFile };