'use strict'
const data = require('./data.module');
const lib = require('./lib.module');
//const crud = require('./crud/crud');
//const analytic = require('./analytics/analytics');
const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const TelegramBaseCallbackQueryController = Telegram.TelegramBaseCallbackQueryController
const TextCommand = Telegram.TextCommand
const tg = new Telegram.Telegram(data.token, { workers: 1 })

class OtherwiseController extends TelegramBaseController {
    handle($) {
        if ($._message._photo) {//<-----------
            console.log($._message._photo)
        }
        if ($) {
            lib.consul($)
            $.sendMessage('Заявка отправлена.\n Мы свяжемся с вами в течение 5 минут')
            tg.api.sendMessage(data.admin_root_id, "Новая заявка на бесплатную консультацию ...");
        }
    }
}
class CallbackQueryController extends TelegramBaseCallbackQueryController {
    handle($) {
        if ($._data == 'next_step') {  tg.api.sendPhoto($._from._id,  'AgADAgADiakxGwM5cEqwQ3vFkQekHeG7tw4ABAkO-WYuKHlO4nkFAAEC',data.procClOpt) }
        if ($._data == 'next_step_1') {  tg.api.sendPhoto($._from._id,  'AgADAgADlKkxGwM5cEo9Lth0sCU-pqDstw4ABPZTUTisj7LXSboBAAEC',data.procClOpt_1) }
        if ($._data == 'next_step_2') {  tg.api.sendPhoto($._from._id,  'AgADAgADlakxGwM5cErl-feoohUos9TJtw4ABNafWDq4VSK6KIUFAAEC',data.procClOpt_2) }
        if ($._data == 'next_step_3') {  tg.api.sendPhoto($._from._id,  'AgADAgADlqkxGwM5cEoJzU57H7CbUgRI8w4ABJ3yy11wfS1iy7IBAAEC',data.procClOpt_3) }
    }
}
class StartController extends TelegramBaseController {
    startHandler($) {
        lib.newUser($)
       // if($._userId == data.admin_root_id){ $.sendMessage(data.start_text_admin, data.opt_admin) }
       // else{ 
            $.sendMessage(data.start_text, data.opt) 
     //   } 
    }
    get routes() { return { 'startCommand': 'startHandler' } }
}
class RootController extends TelegramBaseController {
    rootHandler($) {
        if ($.message.from.id == data.admin_root_id) {
            analytic.add('/root', $);
            lib.adminMode($, (result) => { $.sendMessage(result.text, result.opt) })
        }
    }
    get routes() { return { 'rootCommand': 'rootHandler' } }
}
class AdminController extends TelegramBaseController {
    adminHandler($) {
        if ($.message.from.id != data.admin_root_id) {
            analytic.add('/admin', $);
            lib.adminMode($, (result) => { $.sendMessage(result.text, result.opt) })
        }
    }
    get routes() { return { 'adminCommand': 'adminHandler' } }
}
class RefController extends TelegramBaseController {
    refFun($) {
        //analytic.add('Реферальная программа', $);
        lib.refcom($, (result) => {
            $.runInlineMenu({
                layout: 1,
                method: 'sendMessage',
                params: [result, data.parse],
                menu: [
                    { text: 'Пригласить друга', callback: (callbackQuery, msg) => { 
                        //analytic.add('Пригласить друга', msg); 
                        lib.getref(msg, (r) => { $.sendMessage(r.text, r.opt) }) } },
                ]
            })
        })
    }
    get routes() { return { 'refCom': 'refFun' } }
}
class Qwest extends TelegramBaseController {
    qQwest($) { 
        //analytic.add('О компании', $); 
        $.sendMessage(data.qwest, data.qwestOpt)
    }
    get routes() { return { 'qwest': 'qQwest' } }
}
class Company extends TelegramBaseController {
    qCompany($) { 
        //analytic.add('О компании', $); 
        $.sendMessage(data.company,data.copmOpt)
    }
    get routes() { return { 'company': 'qCompany' } }
}
class VarCl extends TelegramBaseController {
    qVarCl($) { 
        //analytic.add('Варианты оклейки', $); 
        $.sendMessage(data.varCl, data.varClOpt);
    }
    get routes() { return { 'varCl': 'qVarCl' } }
}
class ProcCl extends TelegramBaseController {
    qProcCl($) { 
        //analytic.add('Процесс оклейки', $); 
        tg.api.sendPhoto($._userId,  'AgADAgADiakxGwM5cEqwQ3vFkQekHeG7tw4ABAkO-WYuKHlO4nkFAAEC',data.procClOpt)
    }
    get routes() { return { 'procCl': 'qProcCl' } }
}
class Contact extends TelegramBaseController {
    qContact($) { 
        //analytic.add('Процесс оклейки', $); 
        $.sendMessage(data.contact, data.contactOpt)
    }
    get routes() { return { 'contact': 'qContact' } }
}
class RSS extends TelegramBaseController {
    qRSS($) { 
        //analytic.add('rss', $); 
        $.sendMessage(data.rss, data.rssOpt)
    }
    get routes() { return { 'rss': 'qRSS' } }
}
class Stat extends TelegramBaseController {
    qStat($) { 
        //analytic.add('stat', $); 
        $.sendMessage(data.stat, data.statOpt)
    }
    get routes() { return { 'stat': 'qStat' } }
}
class Upload extends TelegramBaseController {
    qStat($) { 
        //analytic.add('upload', $); 
        $.sendMessage(data.upload, data.uploadOpt)
    }
    get routes() { return { 'upload': 'qUpload' } }
}
class Consul extends TelegramBaseController {
    qConsul($) { 
        //analytic.add('consul', $); 
        $.sendMessage(data.consul, data.consulOpt)
    }
    get routes() { return { 'consul': 'qConsul' } }
}

tg.router
    .when(new TextCommand('/start', 'startCommand'), new StartController())
    .when(new TextCommand('О компании', 'company'), new Company())
    .when(new TextCommand('Варианты оклейки', 'varCl'), new VarCl())
    .when(new TextCommand('Процесс оклейки', 'procCl'), new ProcCl())
    .when(new TextCommand('Отвечаем на вопросы', 'qwest'), new Qwest())
    .when(new TextCommand('Бесплатная консультация', 'consul'), new Consul())
    .when(new TextCommand('Контакты и адрес', 'contact'), new Contact())
    .when(new TextCommand('Пригласи друга', 'refCom'), new RefController())
    .when(new TextCommand('Рассылка', 'rss'), new RSS())
    .when(new TextCommand('Статистика', 'stat'), new Stat())
    .when(new TextCommand('Выгрузить базу', 'upload'), new Upload())
    .callbackQuery(new CallbackQueryController())
    .otherwise(new OtherwiseController())
