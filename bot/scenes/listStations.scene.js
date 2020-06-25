const Scene = require('telegraf/scenes/base');
const Markup = require('telegraf/markup')

const { listLocale } = require('../botConstants')

const {users} = require('../../db');

const listStationsScene = new Scene('listStations')
listStationsScene.enter( async (ctx) => {
    const user = await users.findOne({tgId: ctx.chat.id });
    if (user.favouriteStations.length !== 0) {
        ctx.reply(listLocale.list + '\n' + user.favouriteStations.join('\n'))
    } else {
        ctx.reply(listLocale.emptyList);
    }
    ctx.scene.enter('mainMenu');
});

module.exports = {
    listStationsScene,
};
