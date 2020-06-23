const Scene = require('telegraf/scenes/base');
const Markup = require('telegraf/markup')

const { addLocale } = require('../botConstants')

const Datastore = require('nedb-promises'), users = new Datastore(`${process.env.DB_PATH}/users.db`);

const addStationScene = new Scene('addStation')
addStationScene.enter(async (ctx) => {
    ctx.reply(addLocale.add, Markup.inlineKeyboard([
        Markup.callbackButton('Готово', 'exit')
    ]));


});
addStationScene.action('exit', (ctx => {
    ctx.scene.enter('mainMenu');
}))
addStationScene.use((async (ctx) => {
    if (parseInt(ctx.update.message.text, 10) >= 10000) {
        let stationId = ctx.update.message.text.padStart(4, '0');
        const user = await users.findOne({tgId: ctx.chat.id});
        if (!user.favouriteStations.includes(stationId)) {
            let newArray = user.favouriteStations;
            newArray.push(stationId);
            await users.update({tgId: ctx.chat.id}, {favouriteStations: newArray});
            ctx.reply(addLocale.added);
            ctx.scene.enter('addStation');
        } else {
            ctx.reply(addLocale.already);
            ctx.scene.enter('addStation');
        }
    } else {
        ctx.reply(addLocale.incorrect);
        ctx.scene.enter('addStation');
    }
}))

module.exports = {
    addStationScene,
};
