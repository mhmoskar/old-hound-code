/** @format */

const Event = require("../Structures/Event.js");
const { MessageEmbed } = require("discord.js")


module.exports = new Event("messageCreate", (client, message) => {

	if (message.author.bot) return;

	if (!message.content.startsWith(client.prefix)) return;

	const args = message.content.substring(client.prefix.length).split(/ +/);

	const command = client.commands.find(cmd => cmd.name == args[0]);

  // the ID of the guild the message.author is a member of

	if (!command) return message.reply(`${args[0]} is not a valid command!`);

	 if(!message.guild)	
		return command.run(message, args, client)

	// 	const permission = message.member.permission.cache.has(permission, true);
	// if (!permission)
	// 	return message.reply(
	// 		`You do not have the permission \`${command.permission}\` to run this command!`
	// 	);

// 	const logs = client.channels.cache.find(channel => channel.id === '1012119979778375801')
// // 	const embed = new MessageEmbed()
// //         .setTitle(`Command Used - ${command}`)
// //         .setColor('#000279')
// //         .addField('User', message.author.username)
// //     logs.send({ embeds: [embed]})
// 	logs.send(`*${message.author.username}* **\n${args[0]}**`)


	command.run(message, args, client);
});

