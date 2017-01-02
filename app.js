var restify = require('restify');
var builder = require('botbuilder');
var intents = new builder.IntentDialog();


//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', intents);

intents.matches(/^курс USD/i, [
    function (session) {
        session.beginDialog('/profile');

    }

]);

intents.matches(/^курс доллара/i, [
    function (session) {
        session.beginDialog('/profile');

    }

]);
intents.matches(/^курс бакса/i, [
    function (session) {
        session.beginDialog('/profile');

    }

]);
intents.matches(/^курс бакинского/i, [
    function (session) {
        session.beginDialog('/profile');

    }

]);
intents.matches(/^привет/i, [
    function (session) {
        session.beginDialog('/hello');

    }

]);

bot.dialog('/profile', [
    function (session) {
        var request = require('request');
        var dateFormat = require('dateformat');
        var date=dateFormat(new Date, "dd.mm.yyyy");
        request.get('https://frankbotmind.herokuapp.com/exchange?name=USD&date='+date, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                phrase = JSON.parse(body);
                console.log(phrase);
                session.send(phrase.phrase[0]+phrase.phrase[1]);


            }
        })
        session.endDialog();
    }
]);

bot.dialog('/hello', [
    function (session) {
    //     var request = require('request');
    //     var dateFormat = require('dateformat');
    //     var date=dateFormat(new Date, "dd.mm.yyyy");
    //     request.get('https://frankbotmind.herokuapp.com/exchange?name=USD&date='+date, function (error, response, body) {
    //         if (!error && response.statusCode == 200) {
    //             phrase = JSON.parse(body);
    //             console.log(phrase);
                session.send("Привет!");
                session.send("Хотите узнать курс доллара? Просто наберите: \"курс доллара\"");
        


        //     }
        // })
        session.endDialog();
   }
]);