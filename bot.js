var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

bot.on('ready', function(evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + '-(' + bot.id + ')');
});

bot.on('message', function(user, userID, channelID, message, evt) {
    if(message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch(cmd) {
            case 'pick2':
                bot.sendMessage({
                    to: channelID,
                    message: pick2()
                });
                break;

            case 'pick4':
                bot.sendMessage({
                    to: channelID,
                    message: pick4()
                });
                break;

            case 'order':
                bot.sendMessage({
                    to: channelID,
                    message: order()
                });
                break;

            case 'help':
                bot.sendMessage({
                    to: channelID,
                    message: help()
                });
                break;
        }
    }
});

function pick2() {
    let pool = pickn(2);
    let i, str = '', rand;
    
    rand = Math.floor(Math.random() * 3);
    if(rand < 1) {
        str += '흐음...';
    } else if(rand < 2) {
        str += '음...';
    } else {
        str += '어...';
    }

    str += pool[0] + '와 ' + pool[1] + '는 어떠신가요?';

    return str;
}

function pick4() {
    let pool = pickn(4);
    let i, str = '', rand;
    
    rand = Math.floor(Math.random() * 3);
    if(rand < 1) {
        str += '흐음...';
    } else if(rand < 2) {
        str += '음...';
    } else {
        str += '어...';
    }

    str += '한 분 께서는 ' + pool[0] + '와 ' + pool[1] + '를,\n';
    str += '다른 분 께서는 ' + pool[2] + '와 ' + pool[3] + '는 어떠신가요?';

    return str;
}

function pickn(n) {
    let ret = [];
    let megami = [
        {"name": '유리나', "another": true}, 
        {"name": '사이네', "another": true}, 
        {"name": '히미카', "another": true}, 
        {"name": '토코요', "another": true}, 
        {"name": '오보로', "another": true}, 
        {"name": '유키히', "another": false}, 
        {"name": '신라', "another": false}, 
        {"name": '하가네', "another": false}, 
        {"name": '치카게', "another": true}, 
        {"name": '쿠루루', "another": false}, 
        {"name": '탈리야', "another": false}, 
        {"name": '라이라', "another": false}, 
        {"name": '우츠로', "another": true}, 
        {"name": '호노카', "another": false}
    ];

    // shuffle list using fisher-yates
    var j, x, i;
    for(i = megami.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = megami[i];
        megami[i] = megami[j];
        megami[j] = x;
    }

    for(i = 0; i < n; i++) {
        let megsel = megami[i]["name"];

        if(megami[i]["another"]) {
            if(Math.floor(Math.random() * 2) < 1) {
                megsel += "A";
            }
        }
        
        if(megsel.includes('호노카')) {
            megsel = '저';
        } else {
            megsel += '씨';
        }
        ret.push(megsel);
    }

    return ret;
}

function order() {
    let str = '';
    if(Math.floor(Math.random() * 2) < 1) {
        str += '선공이에요!';
    } else {
        str += '후공이에요!';
    }

    return str;
}

function help() {
    let str = '';
    str += '후루요니 플레이를 도와주는 포와포와입니다!\n';
    str += '!pick2, !pick4, !order 등의 커맨드를 이용해보세요!\n';
    str += '원하는 기능이 있으시거나 제가 잘못 동작한다면 제작자에게 문의해주세요!';

    return str;
}
