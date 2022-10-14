const { ShardingManager } = require('discord.js');
const config = require('./Data/config.json');

const manager = new ShardingManager(__dirname + "/bot.js", {
    totalShards: config.shards || "auto",
    token: config.token,
    mode: "worker"
});

manager.on("shardCreate", (shard) => {
    console.log(`[MANAGER] Shard ${shard.id} is starting.`);
});

manager.spawn();
