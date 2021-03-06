require('module-alias/register')
const Discord = require('discord.js')
require('discord-reply')
const client = new Discord.Client()
const loadCommands = require('@root/commands/load-commands')
const commandBase = require('@root/commands/command-base')
const loadFeatures = require('@root/features/load-features')
client.queue = new Map()
require('discord-buttons')(client);
require('dotenv').config()

client.on('ready', async () => {
  try {
    console.log('I am ready!');
    function pickStatus() {
      // `over ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} users!`, `over ${client.guilds.cache.size.toLocaleString()} servers!`
      let status = ['over Kobayashi', 'over Tohru', 'over Ilulu', 'over Makoto Takiya', 'over Quetzalcoatl', 'over Elma', 'over Shouta Magatsuchi', 'over Fafnir'];
      let Status = Math.floor(Math.random() * status.length);

      client.user.setActivity(status[Status], {
        type: "WATCHING"
      });
    };
    setInterval(pickStatus, 5000);
  } catch (err) {
    console.log(error)
  }

  commandBase.loadPrefixes(client)
  loadCommands(client)
  loadFeatures(client)
})

client.on('guildCreate', (guild) => {
  const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
  const embed = new Discord.MessageEmbed()
    .setTitle('Thanks For Adding Me!')
    .setDescription(
      'Invite Me To Your Server [Here](https://discord.com/api/oauth2/authorize?client_id=757066313406611477&permissions=473427062&scope=bot)\nVisit The Bot Website [Here](https://oblivionghoul.github.io/KannaKamuiWebsite/)\nPlease Vote For My Bot [Here](https://top.gg/bot/757066313406611477)\nPlease Consider Donating [Here](https://www.paypal.com/paypalme/kannabot) To Keep It Running\nJoin My Support Server [Here](https://discord.gg/QpMWndNpse)\nMy Default Prefix Is `-`'
    )
    .setColor('RANDOM')
    .addField('Help', 'Use this Command get the full command list\n`-help`', true)
    .addField('SetPrefix', 'Use this Command to change the default prefix\n`-setprefix [new prefix]`', true)
    .setFooter('Bot Made By OblivionGhoul#5842', 'https://i.imgur.com/Ivtf7GP.png')
    .setThumbnail('https://i.imgur.com/Zmr7TLZ.png')
    .setURL('https://oblivionghoul.github.io/KannaKamuiWebsite/')

  channel.send(embed)
})

client.on('voiceStateUpdate', (oldState, newState) => {
  if (oldState.channelID === null || typeof oldState.channelID == 'undefined') return;
  if (newState.id !== client.user.id) return;
  return client.queue.delete(oldState.guild.id);
});

client.login(process.env.token)