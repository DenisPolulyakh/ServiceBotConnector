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


intents.matches(/^список валют/i, [
    function (session) {
        session.beginDialog('/listcurrency');

    }

]);


intents.matches(/^курс USD/i, [
    function (session) {
        session.beginDialog('/profileUSD');

    }

]);

intents.matches(/^курс доллара/i, [
    function (session) {
        session.beginDialog('/profileUSD');

    }

]);
intents.matches(/^курс бакса/i, [
    function (session) {
        session.beginDialog('/profileUSD');

    }

]);
intents.matches(/^курс бакинского/i, [
    function (session) {
        session.beginDialog('/profileUSD');
    }
]);

intents.matches(/^курс EUR/i, [
    function (session) {
        session.beginDialog('/profileEUR');

    }

]);

intents.matches(/^курс евро/i, [
    function (session) {
        session.beginDialog('/profileEUR');

    }

]);
intents.matches(/^курс еврика/i, [
    function (session) {
        session.beginDialog('/profileEUR');

    }

]);
intents.matches(/^курс Евро/i, [
    function (session) {
        session.beginDialog('/profileEUR');
    }
]);

intents.matches(/^курс UAH/i, [
    function (session) {
        session.beginDialog('/profileUAH');

    }

]);

intents.matches(/^курс гривны/i, [
    function (session) {
        session.beginDialog('/profileUAH');

    }

]);

intents.matches(/^курс Гривны/i, [
    function (session) {
        session.beginDialog('/profileUAH');

    }

]);
intents.matches(/^Слава Украiне!/i, [
    function (session) {
        session.beginDialog('/profileUAH');

    }

]);

intents.matches(/^Привет, Фрэнк/i, [
    function (session) {
        session.beginDialog('/hello');
    }

]);

intents.matches(/^Привет)/i, [
    function (session) {
        session.beginDialog('/hellosimple');
    }

]);


intents.matches(/^Фрэнк, как дела\?/, [
    function (session) {
         session.beginDialog('/howareyou');
  }

]);

intents.matches(/^пизда)/i, [
    function (session) {
         session.beginDialog('/pussy');
  }

]);

bot.dialog('/profileUSD', [
    function (session) {
        var request = require('request');
        var dateFormat = require('dateformat');
        var date = dateFormat(new Date, "dd.mm.yyyy");
        request.get('https://frankbotmind.herokuapp.com/exchange?name=USD&date=' + date, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                phrase = JSON.parse(body);
                console.log(phrase);
                session.send(phrase.phrase);
            }
        })
        session.endDialog();
    }
]);

bot.dialog('/profileEUR', [
    function (session) {
        var request = require('request');
        var dateFormat = require('dateformat');
        var date = dateFormat(new Date, "dd.mm.yyyy");
        request.get('https://frankbotmind.herokuapp.com/exchange?name=EUR&date=' + date, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                phrase = JSON.parse(body);
                console.log(phrase);
                session.send(phrase.phrase);
            }
        })
        session.endDialog();
    }
]);

bot.dialog('/profileUAH', [
    function (session) {
        var request = require('request');
        var dateFormat = require('dateformat');
        var date = dateFormat(new Date, "dd.mm.yyyy");
        request.get('https://frankbotmind.herokuapp.com/exchange?name=UAH&date=' + date, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                phrase = JSON.parse(body);
                console.log(phrase);
                session.send(phrase.phrase);
            }
        })
        session.endDialog();
    }
]);

bot.dialog('/listcurrency', [
    function (session) {
        var request = require('request');
        var dateFormat = require('dateformat');
        var date = dateFormat(new Date, "dd.mm.yyyy");
        request.get('https://frankbotmind.herokuapp.com/listcurrency', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                phrase = JSON.parse(body);
                console.log(phrase);
            }
        })
        session.endDialog();
    }
]);



bot.dialog('/hello', [
    function (session) {
      session.send("Приветствую!!! Меня зовут Фрэнк Каупервуд. Я могу сказать Вам текущий курс Евро, Доллара, Гривны. Просто наберите: \"курс [валюта]\"");
      session.endDialog();
    }

      
]);

bot.dialog('/pussy', [
    function (session) {
      session.send("Смотря в каком контексте здесь пизда :)");
      session.endDialog();
    }

      
]);

bot.dialog('/howareyou', [
    function (session) {
      session.send("У меня хорошо, а ты работай, а не с ботом пизди!!!");
      session.endDialog();
    }

      
]);

bot.dialog('/hellosimple', [
    function (session) {
      session.send("Привет!");
      session.endDialog();
    }

      
]);