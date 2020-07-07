const Scene = require('telegraf/scenes/base');
const Markup = require('telegraf/markup');
const {users} = require('../../db');
const {mainMenuSceneLocale} = require('../botConstants');

const mainMenuScene = new Scene('mainMenu')
mainMenuScene.enter(async (ctx) => {
    const msg = await ctx.reply(mainMenuSceneLocale.main, Markup.inlineKeyboard([
            [Markup.callbackButton('Мои станции', 'list')],
            [Markup.callbackButton('Добавить станцию', 'add'),
                Markup.callbackButton('Удалить станцию', 'delete')],
            [Markup.callbackButton('Включить мониторинг', 'on'),
                Markup.callbackButton('Выключить мониторинг', 'off')]
        ]).extra()
    )
    const user = await users.findOne({tgId: ctx.chat.id});
    if (user.lastMenuMsg) {
        await ctx.store.deleteMsg(msg.chat.id, user.lastMenuMsg);
    }
    await users.update({tgId: ctx.chat.id}, {$set: {lastMenuMsg: msg.message_id}});
});
mainMenuScene.action('list', (ctx) => ctx.scene.enter('listStations'));
mainMenuScene.action('add', (ctx) => ctx.scene.enter('addStation'));
mainMenuScene.action('delete', (ctx => ctx.scene.enter('deleteStation')));
mainMenuScene.action('on', (ctx => ctx.store.monitorOn(ctx)));

mainMenuScene.action('off', (ctx => ctx.store.monitorOff(ctx)));

module.exports = {
    mainMenuScene,
};
