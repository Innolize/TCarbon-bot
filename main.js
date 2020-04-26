const discord = require("discord.js");
const ytdl = require("ytdl-core")
const client = new discord.Client();

const prefix = "!"

const queue = new Map();


client.on("ready", () => {
    console.log("conectado como " + client.user.tag)

    client.user.setActivity("+help")

    client.guilds.cache.forEach(guild => {
        console.log(guild.name)
        guild.channels.cache.forEach(channel => {
            console.log(` - ${channel.name} ${channel.type} ${channel.id}`)
        })
    })



    let generalChannel = client.channels.cache.get("691074250882285672")
    const Attachment = new discord.MessageAttachment("https://cf.ltkcdn.net/gatos/images/std/236641-699x450-etapas-desarrollo-gatitos.jpg")
    generalChannel.send(Attachment)
});

client.on("message", async message => {
    if (message.author != client.user) {
        message.channel.send("Message received: " + message.author.toString() + " " + message.content)
        if (message.content.startsWith(prefix)) {
            processCommand(message)
        } musicFunction(message)
    }
})

function processCommand(message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
}





function musicFunction(message) {
    const serverQueue = queue.get(message.guild.id);
    if (message.content.startsWith(`${prefix}play`)) {
        execute(message, serverQueue);
        return;
    } else if (message.content.startsWith("skip")) {
        execute(message, serverQueue);
        return;
    } else if (message.content.startsWith("stop")) {
        execute(message, serverQueue);
        return;
    }
}

async function execute(message, serverQueue) {
    const args = message.content.split(' ');
    const voiceChannel = message.member.voiceChannel;
    console.log(message.author.channels)
    if (!voiceChannel)
        return message.channel.send("You must be in a voice channel to play music");

    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return messaage.channel.send(`I need permission to join and speak in your voice channel`);
    }
    const songInfo = await ytdl.getInfo(args[1]);
    const song = {
        title: songInfo.title,
        url: songInfo.video_url,
    }
    if (!serverQueue) {

    } else {
        serverQueue.songs.push(song);
        console.log(serverQueue.songs);
        return message.channel.send(`${song.title} has been added to the queue`);
    }
    const queueConstruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true
    };

    queue.set(message.guild.id, queueConstruct);
    queueConstruct.songs.push(song);

    try {
        let connection = voiceChannel.join();
        queueConstruct.connection = connection;
        play(message.guild, queueConstruct.songs[0])
    } catch (err) {
        console.log(err);
        queue.delete(message.guild.id);
        return message.channel.send(err);
    }
}


function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return
    }
    const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
        .on("end", () => {
            console.log("music ended!");
            serverQueue.songs.shift();
            play(guild.serverQueue.songs[0])
        })
        .on("error", error => {
            console.error(error);
        });
    dispatcher.setVolumeLogarithhmic(serverQueue.volume / 5);
}





client.login("NjkxMDcwMjE0NDI2ODUzNDg4.Xna3zw.LY9Jk_ktuNoM_hVzezMq22mX_To")