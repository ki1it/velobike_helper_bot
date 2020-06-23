const Scene = require('telegraf/scenes/base');
const Markup = require('telegraf/markup')

const { listLocale } = require('../botConstants')

const Datastore = require('nedb-promises'), users = new Datastore(`${process.env.DB_PATH}/users.db`);

const listStationsScene = new Scene('listStations')
listStationsScene.enter( async (ctx) => {
    const user = await users.findOne({tgId: ctx.chat.id });
    if (user.favouriteStations.length !== 0) {
        ctx.reply(listLocale.list + user.favouriteStations.join('\n'))
    } else {
        ctx.reply(listLocale.emptyList);
    }
});

module.exports = {
    listStationsScene,
};
