const Scene = require('telegraf/scenes/base');
const Markup = require('telegraf/markup')

const { deleteLocale } = require('../botConstants')

const {users} = require('../../db');

const deleteStationScene = new Scene('deleteStation')
deleteStationScene.enter(async (ctx) => {
    ctx.reply(deleteLocale.delete, Markup.inlineKeyboard([
        Markup.callbackButton('Готово', 'exit')
    ]).extra()
    );


});
deleteStationScene.action('exit', (ctx => {
    ctx.scene.enter('mainMenu');
}))
deleteStationScene.use((async (ctx) => {
    if(ctx.update.message) {
        if (parseInt(ctx.update.message.text, 10) <= 10000) {
            let stationId = ctx.update.message.text.padStart(4, '0');
            const user = await users.findOne({tgId: ctx.chat.id});
            if (user.favouriteStations.includes(stationId)) {
                await users.update({tgId: ctx.chat.id}, {$pull: {favouriteStations: stationId}});
                await ctx.reply(deleteLocale.deleted);
                ctx.scene.enter('deleteStation');
            } else {
                ctx.reply(deleteLocale.already);
                ctx.scene.enter('deleteStation');
            }
        } else {
            ctx.reply(deleteLocale.incorrect);
            ctx.scene.enter('deleteStation');
        }
    }
}))

module.exports = {
    deleteStationScene,
};
