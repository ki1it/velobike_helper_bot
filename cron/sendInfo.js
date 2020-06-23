const Datastore = require('nedb-promises');
const data = new Datastore(`${process.env.DB_PATH}/data.db`);
const users = new Datastore(`${process.env.DB_PATH}/users.db`);
const {bot} = require('../bot')

async function sendInfo() {
    const usersList = await users.find({active: true});
    for (let i = 0; i++; i < usersList.length){
        const msg = '';
        bot.telegram.sendMessage(usersList[i].tgId, msg);
    }
}

module.exports = {
    sendInfo,
};
