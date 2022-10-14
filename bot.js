const Client = require("./Structures/Client.js");
const config = require("./Data/config.json");
const mongoose = require("mongoose");
const client = new Client();

// client.on('ready', async () => {
// 	await mongoose.connect(
// 		'mongodb+srv://Hound:Hound123@hound.bgukii8.mongodb.net/?retryWrites=true&w=majority', {
// 			keepAlive: true,
// 		}
// 	)
// })

client.start(config.token);


