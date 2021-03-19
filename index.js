require('module-alias/register')
const Discord = require('discord.js')
const client = new Discord.Client()
const loadCommands = require('@root/commands/load-commands')
const commandBase = require('@root/commands/command-base')
const loadFeatures = require('@root/features/load-features')
client.queue = new Map()

client.on('ready', async () => {
  try {
    console.log('I am ready!');
    function pickStatus() {
      let status = [`over ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} users!`, `over ${client.guilds.cache.size.toLocaleString()} servers!`]; //change change status
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

//Server stats channel IDs
let stats = {
  serverID: '705454198464053331', //can change channel ID 
  member: "738642924346146817", //can change channel ID 
  bots: "738642927366176905" //can change channel ID 
}

//welcome message
client.on('guildMemberAdd', member => {
  const autoRole = member.guild.roles.cache.get('705475155782008936'); //can change auto role ID
  if (!autoRole) return;
  member.roles.add(autoRole.id);
  //update server count
  if (member.guild.id !== stats.serverID) return;
  client.channels.cache.get(stats.member).setName(`Members: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
  client.channels.cache.get(stats.bots).setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
})
//leave message 
client.on('guildMemberRemove', member => {
  //update server count
  if (member.guild.id !== stats.serverID) return;
  client.channels.cache.get(stats.member).setName(`Members: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
  client.channels.cache.get(stats.bots).setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
})

client.on('message', message => {
  var { content } = message
  content = content.toLowerCase()
  if (message.author.id !== '396850772488355841') return
  if (content.includes("ur mom") || content.includes("your mom")) return message.react('<:wazowski:735907372920209521>')
})

client.on('guildCreate', (guild) => {
  const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
  const embed = new Discord.MessageEmbed()
  .setTitle('Thanks For Adding Me!')
  .setDescription('Invite Me To Your Server [Here](https://discord.com/api/oauth2/authorize?client_id=757066313406611477&permissions=473427062&scope=bot)\nPlease Consider Donating [Here](https://www.paypal.com/paypalme/kannabot) To Keep It Running\nAny Issues Or Suggestions? Join My Support Server [Here](https://discord.gg/QpMWndNpse)\nMy Default Prefix Is [-]')
  .setColor('RANDOM')
  .addField('Help', 'Use this Command get the full command list\n(usage: -help)')
  .addField('SetPrefix', 'Use this Command to change the default prefix\n(usage: -setprefix [new prefix])')
  .setFooter('Bot Made By OblivionGhoul#5842', 'https://i.imgur.com/Ivtf7GP.png')
  .setThumbnail('https://i.imgur.com/Zmr7TLZ.png')
  .setURL('https://github.com/OblivionGhoul/KannaKamuiBot')

  channel.send(embed)
})

client.login("")