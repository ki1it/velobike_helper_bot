const axios = require('axios');
const {users} = require('../db');
const {bot} = require('../bot');

async function sendInfo() {
    const info = await axios.get('https://velobike.ru/ajax/parkings');
    const data = info.data.Items;
    const usersList = await users.find({active: true});
    for (let i = 0; i < usersList.length; i++ ){
        let msg = '';
        for (let j =0; j < usersList[i].favouriteStations.length; j++) {
            const station = data.find(o => o.Id === usersList[i].favouriteStations[j]);
            msg += `Станция ${station.Id}: ${station.FreePlaces}/${station.TotalPlaces}\n`
        }
        bot.telegram.sendMessage(usersList[i].tgId, msg);
    }
    await users.persistence.compactDatafile()
}

sendInfo()
module.exports = {
    sendInfo,
};
