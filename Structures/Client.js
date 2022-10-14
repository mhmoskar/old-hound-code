/** @format */
const Discord = require("discord.js");
const Command = require("./Command.js");
const Event = require("./Event.js");
const config = require("../Data/config.json");
//const intents = new Discord.Intents(37377);
const fs = require("fs");
const { Model } = require("mongoose");
const { Intents, Permissions} = require("discord.js");

//["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGE_TYPING"], partials: ['CHANNEL',] 
class Client extends Discord.Client {
	constructor() {
		super({    
			intents: [
				Intents.FLAGS.GUILDS, 
				Intents.FLAGS.GUILD_MESSAGES,
				Intents.FLAGS.GUILD_PRESENCES,
				Intents.FLAGS.GUILD_MEMBERS,
				Intents.FLAGS.GUILD_INTEGRATIONS,
				Intents.FLAGS.GUILD_MESSAGE_TYPING,
				Intents.FLAGS.DIRECT_MESSAGES, 
				Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, 
				Intents.FLAGS.DIRECT_MESSAGE_TYPING,

			],
//			partials: ['CHANNEL'],
			Permissions: [Permissions.FLAGS.ADMINISTRATOR]
		});
		console.log(this.options.intents);
		/**
		 * @type {Discord.Collection<string, Command>}
		 */
		this.commands = new Discord.Collection();

		this.prefix = config.prefix;
	}


	start(token) {
		fs.readdirSync("./Commands")
			.filter(file => file.endsWith(".js"))
			.forEach(file => {
				/**
				 * @type {Command}
				 */
				const command = require(`../Commands/${file}`);
				console.log(`[COMMAND] ${command.name} loaded`);
				this.commands.set(command.name, command);
		});

		fs.readdirSync("./Events")
			.filter(file => file.endsWith(".js"))
			.forEach(file => {
				/**
				 * @type {Event}
				 */
				const event = require(`../Events/${file}`);
				console.log(`[EVENT] ${event.event} loaded`);
				this.on(event.event, event.run.bind(null, this));
			});

		this.login(token);
	}
}


module.exports = Client;