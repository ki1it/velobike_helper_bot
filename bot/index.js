const {Telegraf} = require('telegraf');
const session = require('telegraf/session');
const Stage = require('telegraf/stage');

const {mainMenuScene} = require('./scenes/mainMenu.scene');
const {listStationsScene} = require('./scenes/listStations.scene');
const {addStationScene} = require('./scenes/addStation.scene');
const {deleteStationScene} = require('./scenes/deleteStation.scene');
const {helpLocale} = require('./botConstants')

const {users} = require('../db');

const stage = new Stage([mainMenuScene, listStationsScene, addStationScene, deleteStationScene], {default: 'mainMenu', tll: 1800})
const bot = new Telegraf(process.env.BOT_TOKEN)
console.log('Bot started')

bot.command('help', (ctx) => ctx.reply(helpLocale.help))
bot.command('on', (ctx) => {users.update({tgId: ctx.chat.id},{$set:{active: true}})})
bot.command('off', (ctx) => {users.update({tgId: ctx.chat.id},{$set:{active: true}})})
bot.use(session())
bot.use(async (ctx, next) => {
    const user = await users.findOne({tgId: ctx.chat.id});
    if (!user) {await users.insert({tgId: ctx.chat.id, favouriteStations:[], active: false, lastMsg: null});}
    return next();
});
bot.use(stage.middleware())
bot.command('menu', (ctx) => ctx.scene.enter('mainMenu'))
bot.command('add', (ctx) => ctx.scene.enter('addStation'))
bot.command('delete', (ctx) => ctx.scene.enter('deleteStation'))
bot.command('list', (ctx) => ctx.scene.enter('listStations'))
bot.launch()

module.exports = {
    bot
}

