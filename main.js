const Discord = require("discord.js");
const client = new Discord.Client();

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
    const Attachment = new Discord.MessageAttachment("https://cf.ltkcdn.net/gatos/images/std/236641-699x450-etapas-desarrollo-gatitos.jpg")
    generalChannel.send(Attachment)
});

client.on("message", (receivedMessage) => {
    if (receivedMessage.author != client.user) {
        receivedMessage.channel.send("Message received: " + receivedMessage.author.toString() + " " + receivedMessage.content)
        if (receivedMessage.content.startsWith("!")) {
            processCommand(receivedMessage)
        }
    }
})





function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1)
    console.log(fullCommand)
    let splitCommand = fullCommand.split(" ")
    console.log(splitCommand)
    let primaryCommmand = splitCommand[0]
    console.log(primaryCommmand)
    let arguments = splitCommand.slice(1)
    console.log(arguments)

    if (primaryCommmand == "help") {
        helpCommand(arguments, receivedMessage)
    }
}


function helpCommand(arguments, receivedMessage) {
    if (arguments.length === 0) {
        receivedMessage.channel.send("i'm not sure what you need help with. Try `!help [topic]`")
    } else {
        receivedMessage.channel.send(`It looks like you need help with ` + arguments)
    }

}





client.login("NjkxMDcwMjE0NDI2ODUzNDg4.Xna3zw.LY9Jk_ktuNoM_hVzezMq22mX_To")