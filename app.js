var restify = require('restify');
var builder = require('botbuilder');
//var intents = new builder.IntentDialog();


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


//bot.dialog('/', intents);


//intents.matches(/./g, [
//  function (session) {
//      session.beginDialog('/request');
//   }
//]);
bot.dialog('/', [
    function (session) {
        session.beginDialog('/request');
    }
]);

// bot.dialog('/profileUSD', [
//     function (session) {
//         var request = require('request');
//         var dateFormat = require('dateformat');
//         var date = dateFormat(new Date, "dd.mm.yyyy");
//         request.get('https://frankbotmind.herokuapp.com/exchange?name=USD&date=' + date, function (error, response, body) {
//             if (!error && response.statusCode == 200) {
//                 phrase = JSON.parse(body);
//                 console.log(phrase);
//                 session.send(phrase.phrase);
//             }
//         })
//         session.endDialog();
//     }
// ]);

// bot.dialog('/profileEUR', [
//     function (session) {
//         var request = require('request');
//         var dateFormat = require('dateformat');
//         var date = dateFormat(new Date, "dd.mm.yyyy");
//         request.get('https://frankbotmind.herokuapp.com/exchange?name=EUR&date=' + date, function (error, response, body) {
//             if (!error && response.statusCode == 200) {
//                 phrase = JSON.parse(body);
//                 console.log(phrase);
//                 session.send(phrase.phrase);
//             }
//         })
//         session.endDialog();
//     }
// ]);

// bot.dialog('/profileUAH', [
//     function (session) {
//         var request = require('request');
//         var dateFormat = require('dateformat');
//         var date = dateFormat(new Date, "dd.mm.yyyy");
//         request.get('https://frankbotmind.herokuapp.com/exchange?name=UAH&date=' + date, function (error, response, body) {
//             if (!error && response.statusCode == 200) {
//                 phrase = JSON.parse(body);
//                 console.log(phrase);
//                 session.send(phrase.phrase);
//             }
//         })
//         session.endDialog();
//     }
// ]);

function getJSONProperty(bodyJson, property) {

    console.log("Body: " + bodyJson);
    console.log("Property: " + property);
    body = JSON.parse(bodyJson);
    if (property == 'phrase') {
        return body.phrase;
    }
}

function botAnswer(session, phrases) {
    console.log("Phrases: " + phrases);
    for (i = 0; i < phrases.length; i++) {
        var m = {"text":"Qwerty","timestamp":"2017-09-15T03:01:16.9633025Z","address":{"id":"16fa840be3ea4073a0a33651d2ad0c64|0000000","channelId":"webchat","user":{"id":"H5QnNQnETbb","name":"You"},"conversation":{"id":"16fa840be3ea4073a0a33651d2ad0c64"},"bot":{"id":"frankbotskype@9egOKufsX9g","name":"FrankCowperwood"},"serviceUrl":"https://webchat.botframework.com","useAuth":true}};
        session.log("SEND "+phrases[i]);
        session.send(phrases[i]);
    }
    return body.property;
}


function cutString(strStart,strStop, text) {
        var slash = text.indexOf('/');
        if(slash==0){
                     console.log(text);
                     console.log("telegramm message");
                     text = text.substring(slash+1);
                     console.log(text);
        }
    
        var s=text.indexOf(strStart);
        var e=text.indexOf(strStop)+strStop.length;
        if(s==-1||e==-1) {return text;}
        textId = text.substring(s,e);
        console.log(textId);
        text = text.replace(textId,'').trim();
        
    
        return text;
}

bot.dialog('/request', [
    function (session) {
        var request = require('request');
        var text = session.message.text;
        //text = " курс бакса <at id=\"28:63814cf6-5153-4de5-8d39-e51ccb5b8a3a\">@FrankCowperwood</at>"
        text = cutString("<at id=","</at>",text);
        console.log(text);
        var messageToService = JSON.stringify({ text: text,timestamp:session.message.timestamp,address:session.message.address });
        console.log(messageToService);
        //var address = 'https://cleverfrankbotmind.herokuapp.com/botmind?message=' + encodeURIComponent(messageToService);
        //var address ='https://neznayka-front-controller.herokuapp.com/getAnswer?message=' + encodeURIComponent(messageToService);
        var address = 'https://cleverfrankbotmind.herokuapp.com/search?message=' + encodeURIComponent(messageToService);
        console.log(address);
        request.get(address, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var phrases = getJSONProperty(body, 'phrase');
                botAnswer(session, phrases);
            } else {
                session.send("Повторите еще раз пожалуйста через 1 минуту");
            }
        });
        session.endDialog();
    }
]);



