const {Client, RichEmbed} = require('discord.js');
const bot = new Client();
const {prefix, welcomeText, infoColor, whatWeAre} = require('./config.json');

bot.on('ready', () =>{
    console.log('Bot Online!');
})

bot.on('message',msg=>{
    let args = msg.content.substring(prefix.length).split(" ");

    switch(args[0]){
        case 'ping':
            msg.channel.send('no comprehende');
            console.log('someone said ping');
            break;
        case 'botinfo':
            msg.channel.send('im a robot designed to please master malware');
            console.log('someone wanted info on bot');
            break;
        case 'purge':
            if(!args[1]) return msg.channel.send('**ERROR, DEFINE ARGS!**');
            msg.channel.bulkDelete(args[1] + 1);
            console.log('purged ' + args[1] + ' messages');
            break;
        case 'kick':
            if(!msg.member.hasPermission('KICK_MEMBERS')) return msg.channel.send('**Insufficient Permissions**');
            if(!args[1]) return msg.channel.send('**Error, define args.**');
            let member = msg.mentions.members.first();
            member.kick().then((member) => {
                msg.channel.send(member + '** has been kicked!** :wave:');
            })
            break;
        case 'embed':
            console.log('someone did embed command idk');
            msg.delete();
            const embed = new RichEmbed()
                .setTitle('Welcome')
                .setColor(infoColor)
                .setDescription(welcomeText)
                .addField('What is Structor Studios?',whatWeAre)
            msg.channel.send(embed);
            break;
        case 'nick':
            console.log('attempt to nick')
            msg.delete();
            if(!args[2]) return msg.channel.send('**Error, define args.**');
            let mem = msg.mentions.members.first();
            mem.setNickname(args[2])
            .then(msg.channel.send(`**Nicked ${mem} to: ${args[2]}**`));
            break;
    }
})

bot.login(process.env.BOT_TOKEN)
