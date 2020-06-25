const axios = require('axios');
const {users} = require('../db');
const {bot} = require('../bot');

async function sendInfo() {
    const info = await axios.get('https://velobike.ru/ajax/parkings');
    const data = info.data.Items;
    const usersList = await users.find({active: true});
    for (let i = 0; i++; i < usersList.length){
        let msg = '';
        for (const e in usersList.favouriteStations) {
            const station = data.find(o => o.Id === e);
            msg += ``
        }
        bot.telegram.sendMessage(usersList[i].tgId, msg);
    }
}

sendInfo()
module.exports = {
    sendInfo,
};
