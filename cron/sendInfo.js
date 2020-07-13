const axios = require('axios');
const {users, store} = require('../db');
const {bot} = require('../bot');

async function sendInfo() {
    const info = await axios.get('https://velobike.ru/ajax/parkings');
    const data = info.data.Items;
    const usersList = await users.find({active: true});
    for (let i = 0; i < usersList.length; i++ ){
        let msg = '';
        for (let j =0; j < usersList[i].favouriteStations.length; j++) {
            const station = data.find(o => o.Id === usersList[i].favouriteStations[j]);
            msg += `${station.Id} св.${station.FreePlaces}/зан ${station.TotalPlaces-station.FreePlaces}\n`
        }
        const message = await bot.telegram.sendMessage(usersList[i].tgId, msg);
        if(usersList[i].lastMsg){

            bot.telegram.deleteMessage(message.chat.id, usersList[i].lastMsg)
                .catch((e) => {
                    console.error(e)
                });
        }
        await users.update({tgId: usersList[i].tgId}, {$set:{lastMsg: message.message_id}});
    }
    store.persistence.compactDatafile()
}

sendInfo()
module.exports = {
    sendInfo,
};
