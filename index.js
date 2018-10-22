const TelegramBot = require('node-telegram-bot-api');
const data = require("./data.module");
const crud = require('./crud/crud');
const lib = require('./lib.module');
const bot = new TelegramBot(data.token, { polling: true });

bot.onText(admin_com, (msg) => { lib.adminMode(msg, (result) => { bot.sendMessage(result.id, result.text, result.opt) }) });

bot.on('callback_query', (msg) => { 
        if (!result.admin) { }
        else {
            //admin----------------------------------------------------------------------------------
            if (msg.data == "back_adm") { bot.deleteMessage(u_id, msg.message.message_id) }
            lib.getPost((post) => {
                if (post) {
                    var p_id = post.post_id;
                    if (msg.data == "defer") {
                        post.setDT = true; bot.sendMessage(u_id, "Выберите день или укажите дату", data.data_set);
                        crud.findOneAndUpdate({ post_id: p_id }, post, "posts", () => { })
                    }
                    if (msg.data.slice(0, 5) == "data_") {
                        if (post.setDT) {
                            bot.deleteMessage(u_id, msg.message.message_id); bot.sendMessage(u_id, "Укажите время в формате: HH:MM");
                            if (msg.data.slice(5, 6) == "1") post.date = lib.getDate();
                            if (msg.data.slice(5, 6) == "2") { date = lib.getDate(); date.d += 1; post.date = date }
                            if (msg.data.slice(5, 6) == "3") { date = lib.getDate(); date.d += 2; post.date = date }
                            crud.findOneAndUpdate({ post_id: p_id }, post, "posts", () => { })
                        }
                    }
                    if (msg.data == "set_data") { if (post.setDT) { bot.deleteMessage(u_id, msg.message.message_id); bot.sendMessage(u_id, "Укажите дату в формате: DD:MM:YYYY") } }
                    if (msg.data == "cancel") { crud.deleteOneToEnd({ post_id: p_id }, "posts", () => { bot.deleteMessage(u_id, msg.message.message_id); bot.sendMessage(u_id, 'Предложение отменено') }) }
                    if (msg.data == "1") {
                        if (post.type == 1) { opts = data.opts_set_1; post.type = 0; post.state = false }
                        else { opts = data.opts_set_2; post.type = 1; post.state = true }
                        opts.message_id = msg.message.message_id; opts.chat_id = u_id;
                        bot.editMessageText(data.set_type_cl, opts);
                        crud.findOneAndUpdate({ post_id: p_id }, post, "posts", () => { })
                    }
                    if (msg.data == "done") {
                        bot.deleteMessage(u_id, msg.message.message_id);
                        if (post.state) { bot.sendMessage(u_id, data.choice_gen, data.opts_set_3_adm) }
                        else { bot.sendMessage(u_id, data.not_choice); bot.sendMessage(u_id, data.set_type_cl, data.opts_set_1) }
                    }
                    if (msg.data == "back") {
                        bot.deleteMessage(u_id, msg.message.message_id); bot.sendMessage(u_id, data.new_offer_text);
                        result.offer_set = true; crud.findOneAndUpdate({ user_id: u_id }, result, "users", () => { })
                    }
                    if (msg.data == 'back_size') {
                        var opts = post.gen; opts.message_id = msg.message.message_id; opts.chat_id = u_id;
                        bot.editMessageText(data.choice_gen, opts)
                    }
                    if (msg.data == "2_2") {
                        var inline = { reply_markup: { inline_keyboard: JSON.parse(post.gen.reply_markup).inline_keyboard } };
                        var inline = inline.reply_markup.inline_keyboard; var opts = {};
                        if (inline[0][0].text.slice(0, 1) != data.pref.slice(0, 1)) {
                            inline[0][0].text = data.pref + inline[0][0].text;
                            post.gen_set.push(data.man_gen); post.gender.push(2);
                        } else {
                            inline[0][0].text = inline[0][0].text.slice(2, 15);
                            post = lib.find_genT(data.man_gen, post); post = lib.find_genI(1, post)
                        }
                        post.gen.reply_markup = JSON.stringify({ inline_keyboard: inline })
                        opts = post.gen; opts.message_id = msg.message.message_id; opts.chat_id = u_id;
                        bot.editMessageText(data.choice_gen, opts);
                        crud.findOneAndUpdate({ post_id: p_id }, post, "posts", () => { })
                    }
                    if (msg.data == "2_3") {
                        var inline = { reply_markup: { inline_keyboard: JSON.parse(post.gen.reply_markup).inline_keyboard } };
                        var inline = inline.reply_markup.inline_keyboard; var opts = {};
                        if (inline[1][0].text.slice(0, 1) != data.pref.slice(0, 1)) {
                            inline[1][0].text = data.pref + inline[1][0].text;
                            post.gen_set.push("Женский"); post.gender.push(3);
                        } else {
                            inline[1][0].text = inline[1][0].text.slice(2, 15);
                            post = lib.find_genT("Женский", post); post = lib.find_genI(1, post)
                        }
                        post.gen.reply_markup = JSON.stringify({ inline_keyboard: inline })
                        opts = post.gen; opts.message_id = msg.message.message_id; opts.chat_id = u_id;
                        bot.editMessageText(data.choice_gen, opts);
                        crud.findOneAndUpdate({ post_id: p_id }, post, "posts", () => { })
                    }
                    if (msg.data == 'back_gen') {
                        if (result.cross) { var opts = data.opts_set_2 } else { var opts = data.opts_set_1 }
                        opts.message_id = msg.message.message_id; opts.chat_id = u_id;
                        bot.editMessageText(data.set_text, opts);
                    }
                    if (msg.data == "done_gen") {
                        if (post.gen_set[0]) {
                            text = 'Выберите систему размеров';
                            bot.deleteMessage(u_id, msg.message.message_id);
                            bot.sendMessage(u_id, text, data.set_type_size);
                        } else { bot.sendMessage(u_id, data.not_choice) }
                    }
                    if (msg.data.slice(0, 5) == "type_") {
                        var opts = {}; var indx = msg.data.slice(5, 7); post.type_size = indx
                        post.state = true;
                        bot.deleteMessage(u_id, msg.message.message_id);
                        if (post.gender.indexOf(2) != -1 && post.gender.indexOf(3) == -1) {
                            if (indx == "RU") { opts = data.RUM }; if (indx == "UK") { opts = data.UKM }
                            if (indx == "US") { opts = data.USM }; if (indx == "EU") { opts = data.EUM }
                            post.inline_keyboardM = JSON.parse(opts.reply_markup).inline_keyboard
                        }


                        if (post.gender.indexOf(2) == -1 && post.gender.indexOf(3) != -1) {
                            if (indx == "RU") { opts = data.RUW }; if (indx == "UK") { opts = data.UKW }
                            if (indx == "US") { opts = data.USW }; if (indx == "EU") { opts = data.EUW }
                            post.inline_keyboardW = JSON.parse(opts.reply_markup).inline_keyboard
                        }

                        if (post.gender.indexOf(2) != -1 && post.gender.indexOf(3) != -1) {
                            if (indx == "RU") { opts = data.RUWM }; if (indx == "UK") { opts = data.UKWM }
                            if (indx == "US") { opts = data.USWM }; if (indx == "EU") { opts = data.EUWM }
                            post.inline_keyboardWM = JSON.parse(opts.reply_markup).inline_keyboard
                        }
                        bot.sendMessage(u_id, data.choice_size_cross, opts)
                        crud.findOneAndUpdate({ post_id: post.post_id }, post, "posts", () => { })
                    }
                    if (msg.data.slice(0, 1) == "3") {
                        lib.set_size_post(msg, (opts) => {
                            post.inline_keyboard = opts.reply_markup.inline_keyboard;
                            opts.message_id = msg.message.message_id; opts.chat_id = u_id;
                            bot.editMessageText(data.choice_size_cross, opts);
                        })
                    }
                    if (msg.data == "done_2") {
                        if (post.state_size > 0) { bot.deleteMessage(u_id, msg.message.message_id); bot.sendMessage(u_id, 'Пришлите фотографию') }
                        else { bot.sendMessage(u_id, data.not_choice) }
                    }
                    if (msg.data == "vip") {
                        var opt = post.post_item;
                        if (post.vip) {
                            opt.reply_markup = data.post_admin.reply_markup; bot.deleteMessage(u_id, msg.message.message_id);
                            bot.sendPhoto(u_id, post.photo_file_id, opt); post.vip = false;
                        } else {
                            opt.reply_markup = data.post_admin_pr.reply_markup; bot.deleteMessage(u_id, msg.message.message_id);
                            bot.sendPhoto(u_id, post.photo_file_id, opt); post.vip = true;
                        }
                        crud.findOneAndUpdate({ post_id: post.post_id }, post, "posts", () => { })
                    }
                }
            })
            lib.getPostFree((post) => {
                if (post) {

            if (msg.data === "publicPF") {
                lib.postF4(msg.from.id,
                    (result) => { bot.sendMessage(result.id, result.text) },
                    (result) => {
                         for (var i = 0; i < result.sort1.length; i++) { 
                         if (post.photo_file_id != '') { bot.sendPhoto(result.sort1[i].user_id, result.file_id, result.opt)  }
                         if (post.photo_file_id == '') { bot.sendMessage(result.sort1[i].user_id, result.text, { parse_mode: "HTML"})  }
                    } 
                    }
                )
            }

                    var p_id = post.post_id;
                    if (msg.data == "deferPF") {
                        post.setDT = true; bot.sendMessage(u_id, "Выберите день или укажите дату", data.data_set);
                        crud.findOneAndUpdate({ post_id: p_id }, post, "post_free", () => { })
                    }
                    if (msg.data.slice(0, 5) == "data_") {
                        if (post.setDT) {
                            bot.deleteMessage(u_id, msg.message.message_id); bot.sendMessage(u_id, "Укажите время в формате: HH:MM");
                            if (msg.data.slice(5, 6) == "1") post.date = lib.getDate();
                            if (msg.data.slice(5, 6) == "2") { date = lib.getDate(); date.d += 1; post.date = date }
                            if (msg.data.slice(5, 6) == "3") { date = lib.getDate(); date.d += 2; post.date = date }
                            crud.findOneAndUpdate({ post_id: p_id }, post, "post_free", () => { })
                        }
                    }
                    if (msg.data == "set_data") { if (post.setDT) { bot.deleteMessage(u_id, msg.message.message_id); bot.sendMessage(u_id, "Укажите дату в формате: DD:MM:YYYY") } }
                    if (msg.data == "cancelPF") { crud.deleteOneToEnd({ post_id: p_id }, "post_free", () => { bot.deleteMessage(u_id, msg.message.message_id); bot.sendMessage(u_id, 'Пост удален') }) }
                    if (msg.data == "vipPF") {
                        var opt = { reply_markup: '' }
                        if (post.vip) {
                            opt.reply_markup = data.post_free_admin.reply_markup; bot.deleteMessage(u_id, msg.message.message_id);
                            if (post.photo_file_id) { bot.sendPhoto(u_id, post.photo_file_id, opt); post.vip = false }
                            if (!post.photo_file_id) { bot.sendMessage(u_id, post.text, opt); post.vip = false }

                        } else {
                            opt.reply_markup = data.post_free_admin_pr.reply_markup; bot.deleteMessage(u_id, msg.message.message_id);
                            if (post.photo_file_id) { bot.sendPhoto(u_id, post.photo_file_id, opt); post.vip = true }
                            if (!post.photo_file_id) { bot.sendMessage(u_id, post.text, opt); post.vip = true }
                        }
                        crud.findOneAndUpdate({ post_id: post.post_id }, post, "post_free", () => { })
                    }
                    if (msg.data === "addPhotoPF") {
                            post.add_photo = true;
                            bot.sendMessage(u_id, 'Пришлите фотографию');
                            crud.findOneAndUpdate({ post_id: post.post_id }, post, "post_free", () => { })
                    }
                }
            })
            if (msg.data == "add_adm") {
                if (u_id == data.admin_root_id) {
                    bot.deleteMessage(u_id, msg.message.message_id); bot.sendMessage(u_id, data.add_adm_text);
                    result.add_adm = true; crud.findOneAndUpdate({ user_id: u_id }, result, "users", () => { })
                }
            }
            if (msg.data === "public") {
                lib.postF2(msg.from.id,
                    (result) => { bot.sendMessage(result.id, result.text) },
                    (result) => {
                        if (result.sort1) { for (var i = 0; i < result.sort1.length; i++) { bot.sendPhoto(result.sort1[i].user_id, result.file_id, result.opt) } }
                    }
                )
            }
        }
});

bot.on('inline_query', (msg) => { lib.inlinecom(msg, (result) => { bot.answerInlineQuery(msg.id, result, { cache_time: 0 }) }) });

setInterval(() => {
    lib.defer(
        (result) => { bot.sendMessage(result.id, result.text) },
        (result) => { var sort = result.sort1; for (var i = 0; i < sort.length; i++) { bot.sendPhoto(sort[i].user_id, result.file_id, result.opt1) } })
}, 60000);