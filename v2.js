'use strict'
const data = require('./data.module');
//const lib = require('./lib.module');
//const crud = require('./crud/crud');
//const analytic = require('./analytics/analytics');
const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const TelegramBaseInlineQueryController = Telegram.TelegramBaseInlineQueryController
const TelegramBaseCallbackQueryController = Telegram.TelegramBaseCallbackQueryController
const TextCommand = Telegram.TextCommand
const tg = new Telegram.Telegram(data.token, { workers: 1 })

class OtherwiseController extends TelegramBaseController {
    handle($) {
        if (!$._message._photo && !$._message._forwardFrom) {
            lib.text_input($._message,
                (result) => { $.sendMessage(result.text, result.opt); tg.api.forwardMessage(data.chat, $.chatId, $.message.messageId) },
                (result) => { $.sendMessage(result.text, result.opt) }
            )
        }
        if ($._message._photo) {//<-----------
            lib.add_photo($,
                (result) => $.sendMessage(result.text, result.opt),
                (result) => $.sendPhoto(result.file, result.opt),
            )
        }

    }
}

class InlineModeController extends TelegramBaseInlineQueryController {
    handle($) {
        lib.inlinecom($.inlineQuery.query, (result) => { tg.api.answerInlineQuery($.inlineQuery.id, result, { cache_time: 0 }) })
    }
}
class FeedBackController extends TelegramBaseController {
    feedback($) { lib.feed_back($); analytic.add('Обратная связь', $); $.sendMessage(data.link_text) }
    get routes() { return { 'FeedBack': 'feedback' } }
}
class StartController extends TelegramBaseController {
    startHandler($) {
        $.sendMessage(data.start_text, data.opt)
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
        analytic.add('Реферальная программа', $);
        lib.refcom($, (result) => {
            $.runInlineMenu({
                layout: 1,
                method: 'sendMessage',
                params: [result, data.parse],
                menu: [
                    {
                        text: 'Рейтинг',
                        message: 'Выберите период',
                        layout: 1,
                        menu: [
                            {
                                text: 'За неделю', callback: (callbackQuery, msg) => {
                                    analytic.add('Рейтинг', msg);
                                    lib.search_week((r) => { $.deleteMessage(msg._messageId); $.sendMessage(r.text, r.opt) })
                                }
                            },
                            {
                                text: 'За месяц', callback: (callbackQuery, msg) => {
                                    analytic.add('Рейтинг', msg);
                                    lib.search_month((r) => { $.deleteMessage(msg._messageId); $.sendMessage(r.text, r.opt) })
                                }
                            },
                            {
                                text: 'За весь период', callback: (callbackQuery, msg) => {
                                    analytic.add('Рейтинг', msg);
                                    lib.search_all((r) => { $.deleteMessage(msg._messageId); $.sendMessage(r.text, r.opt) })
                                }
                            }
                        ]
                    },
                    { text: 'Пригласить друга', callback: (callbackQuery, msg) => { analytic.add('Пригласить друга', msg); lib.getref(msg, (r) => { $.sendMessage(r.text, r.opt) }) } },
                    { text: '⬅️ Назад', callback: (callbackQuery, msg) => { $.deleteMessage(msg._messageId) } }
                ]
            })
        })
    }
    get routes() { return { 'ref_com': 'refFun' } }
}
class SetController extends TelegramBaseController {
    setFun($) { analytic.add('Настройка рассылки', $); lib.setcom($, (r) => { $.sendMessage(r.text, r.opt) }) }
    get routes() { return { 'set_com': 'setFun' } }
}
class SaleController extends TelegramBaseController {
    saleFun($) {
        analytic.add('Премиум скидки', $);
        lib.salecom($, (r) => {
            if (r.buy) {
                $.runInlineMenu({
                    layout: 1,
                    method: 'sendMessage',
                    params: [r.text, data.parse],
                    menu: [{
                        text: 'Оплатить', callback: () => {
                            //оплата
                        }
                    }]
                })
            } else { $.sendMessage(r.text, data.parse) }
        })
    }
    get routes() { return { 'sale_com': 'saleFun' } }
}
class Company extends TelegramBaseController {
    qCompany($) { 
        analytic.add('О компании', $); 
        $.sendMessage(r.text, r.opt)
    }
    get routes() { return { 'company': 'qCompany' } }
}
class VarCl extends TelegramBaseController {
    qVarCl($) { 
        analytic.add('Варианты оклейки', $); 
        $.sendMessage(data.varCl, data.varClOpt);
        console.log('d')
    }
    get routes() { return { 'varCl': 'qVarCl' } }
}
class ProcCl extends TelegramBaseController {
    qProcCl($) { 
        analytic.add('Процесс оклейки', $); 
        $.sendMessage(r.text, r.opt)
    }
    get routes() { return { 'procCl': 'qProcCl' } }
}


tg.router
    .when(new TextCommand('/start', 'startCommand'), new StartController())
    .when(new TextCommand('О компании', 'company'), new Company())
    .when(new TextCommand('Варианты оклейки', 'varCl'), new VarCl())
    .when(new TextCommand('Процесс оклейки', 'procCl'), new ProcCl())
    .when(new TextCommand('Отвечаем на вопросы', 'startCommand'), new StartController())
    .when(new TextCommand('Бесплатная консультация', 'startCommand'), new StartController())
    .when(new TextCommand('Контакты', 'startCommand'), new StartController())
    .when(new TextCommand('Оставить заявку', 'startCommand'), new StartController())
