const Scene = require('telegraf/scenes/base');
const Markup = require('telegraf/markup')

const { addLocale } = require('../botConstants')

const {users} = require('../../db');

const addStationScene = new Scene('addStation')
addStationScene.enter(async (ctx) => {
    ctx.reply(addLocale.add, Markup.inlineKeyboard([
        Markup.callbackButton('Готово', 'exit')
    ]).extra()
    );


});
addStationScene.action('exit', (ctx => {
    ctx.scene.enter('mainMenu');
}))
addStationScene.use((async (ctx) => {
    if (ctx.update.message && parseInt(ctx.update.message.text, 10) <= 10000) {
        let stationId = ctx.update.message.text.padStart(4, '0');
        const user = await users.findOne({tgId: ctx.chat.id});
        if (!user.favouriteStations.includes(stationId)) {
            await users.update({tgId: ctx.chat.id}, {$addToSet: {favouriteStations: stationId}});
            await ctx.reply(addLocale.added);
            ctx.scene.enter('addStation');
        } else {
            await ctx.reply(addLocale.already);
            ctx.scene.enter('addStation');
        }
    } else {
        await ctx.reply(addLocale.incorrect);
        ctx.scene.enter('addStation');
    }
}))

module.exports = {
    addStationScene,
};
