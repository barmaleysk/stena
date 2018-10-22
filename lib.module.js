const crud = require('./crud/crud');
const data = require('./data.module');
const connect = require('./crud/connect');
const config = require('./crud/configdb');
const analytic = require('./analytics/analytics');
var client;
connect.connect(config.url, () => { client = crud.getDB(); });



var post_sort = function (post, callback) {
    crud.findS("users", (users) => {
        if (users) {
            post.cross_size = duplicate(post.cross_size);
            sort_0 = []; sort_1 = []; sort_2 = []; sort_3 = [];
            i_0 = 0; i_1 = 0; i_2 = 0; i_3 = 0;
            if (!post.vip) { for (var i = 0; i < users.length; i++) { if (!users[i].subscribe) { sort_3.push(users[i]); } } }
            if (post.vip) { for (var i = 0; i < users.length; i++) { if (users[i].vip && users[i].subscribe) { sort_0.push(users[i]); i_0++; } } }
            if (i_0 > 0) { for (var i = 0; i < users.length; i++) { if (users[i].cross) { sort_1.push(sort_0[i]); i_1++; } } }
            else { for (var i = 0; i < users.length; i++) { if (users[i].cross) { sort_1.push(users[i]); i_1++; } } }
            if (i_1 > 0) {
                for (var j = 0; j < sort_1.length; j++) {
                    for (var j1 = 0; j1 < sort_1[j].gender.length; j1++) {
                        for (var j2 = 0; j2 < post.gender.length; j2++) { if (sort_1[j].gender[j1] == post.gender[j2]) { sort_2.push(sort_1[j]); i_2++ } }
                    }
                }
            }
            if (i_2 > 0) {
                for (var k = 0; k < sort_2.length; k++) {
                    for (var l = 0; l < sort_2[k].cross_size.length; l++) {
                        ig = 0;
                        for (var g = 0; g < post.cross_size.length; g++) {
                            if (sort_2[k].cross_size[l] == post.cross_size[g]) {
                                if (sort_3[0]) {
                                    for (var u = 0; u < sort_3.length; u++) { if (sort_3[u].user_id == sort_2[k].user_id) { ig++; } }
                                    if (ig == 0) { sort_3.push(sort_2[k]) }
                                } else { sort_3.push(sort_2[k]); }
                            }
                        }
                    }
                }
            }
            callback(sort_3);
        }
    })
};
var formSize = function (size, text, type) {
    var text = text + "\n\n" + "Размеры:"
    size = duplicate(size);
    for (var i = 0; i < size.length; i++) {
        if (i == 0) { text = text + type + size[i] }
        if (i > 0) { text = text + ", " + type + size[i] }
    }
    return text
};
var size_conform = function (type, size_1, size_2, gender) {
    var indx_1; var indx_2 = RUm.indexOf(size_2)
    if (gender.indexOf(2) != -1 && gender.indexOf(3) == -1) {
        if (type == "UK") { indx_1 = data.UKMm.indexOf(size_1) };
        if (type == "US") { indx_1 = data.USMm.indexOf(size_1) }
        if (type == "EU") { indx_1 = data.EUMm.indexOf(size_1) };
    }
    if (gender.indexOf(2) == -1 && gender.indexOf(3) != -1) {
        if (type == "UK") { indx_1 = data.UKWm.indexOf(size_1) };
        if (type == "US") { indx_1 = data.USWm.indexOf(size_1) }
        if (type == "EU") { indx_1 = data.EUWm.indexOf(size_1) };
    }
    if (gender.indexOf(2) != -1 && gender.indexOf(3) != -1) {
        if (type == "UK") { indx_1 = data.UKWMm.indexOf(size_1) };
        if (type == "US") { indx_1 = data.USWMm.indexOf(size_1) }
        if (type == "EU") { indx_1 = data.EUWMm.indexOf(size_1) };
    }
    return indx_1 == indx_2
}
var size_convert = function (sizeIn, size) {
    var indx; var gender = sizeIn.slice(4, 5); var type = sizeIn.slice(2, 4)
    if (gender == "M") {
        if (type == "UK") { indx = data.UKMm.indexOf(size) }; if (type == "US") { indx = data.USMm.indexOf(size) }
        if (type == "EU") { indx = data.EUMm.indexOf(size) }; if (type == "RU") { indx = data.RUMm.indexOf(size) }
        var ind = data.RUMm[indx]
    }
    if (gender == "W") {
        if (type == "UK") { indx = data.UKWm.indexOf(size) }; if (type == "US") { indx = data.USWm.indexOf(size) }
        if (type == "EU") { indx = data.EUWm.indexOf(size) }; if (type == "RU") { indx = data.RUWm.indexOf(size) }
        var ind = data.RUWm[indx]
    }
    if (gender == "U") {
        if (type == "UK") { indx = data.UKWMm.indexOf(size) }; if (type == "US") { indx = data.USWMm.indexOf(size) }
        if (type == "EU") { indx = data.EUWMm.indexOf(size) }; if (type == "RU") { indx = data.RUWMm.indexOf(size) }
    }
    return ind
}
var sorting = function (sort_1, text2, callback) {
    max = 0; sort = []; k = sort_1.length;
    for (var l = 0; l < k; l++) {
        for (var j = 1; j < sort_1.length; j++) { if (sort_1[j].ref > sort_1[max].ref) { max = j; } }
        sort.push(sort_1[max]); sort_1.splice(max, 1); max = 0;
    }
    top = sort.length; text = text2;
    if (top > 10) top = 10;
    for (var i = 0; i < top; i++) {
        var name = ''; var lastname = '';
        if (sort[i].name != undefined) { name = sort[i].name }
        if (sort[i].lastname != undefined) { lastname = sort[i].lastname }
        text = text + "\n"; text = text + (i + 1) + ". " + name + " " + lastname + ": " + sort[i].ref;
    }
    callback(text);
};
module.exports.text_input = function (msg, sendForward, send) {
    var result_1 = { text: '', opt: data.parse };
    var result_2 = { text: '', opt: '' }; var u_id = msg.from.id;
    find_id(u_id, (result) => {
        if (result) {
            result.input = true;
            if (result.link_action && msg.text != 'Настройка рассылки'
                && msg.text != 'Реферальная программа' && msg.text != 'Обратная связь'
                && msg.text != 'Премиум скидки' && msg.text != '/root') {
                result.link_action = false;
                result_1.text = 'Ваше предложение принято';
                sendForward(result_1);
                client.collection("users").update({ user_id: u_id }, result, () => { })
            }
            if (result.offer_set && msg._text != 'Новый оффер'
                && msg._text != 'Новый пост' && msg._text != 'Отложенные посты'
                && msg._text != 'Таблица офферов' && msg._text != '/root'
                && msg._text != 'Статистика' && msg._text != 'Управление администраторами') {
                getPost(u_id, (post) => {
                    post.text = msg._text; result.offer_set = false;
                    post.old_price = true; result_2.text = data.old_price;
                    result_2.opt = data.parse; send(result_2);
                    client.collection("users").update({ user_id: u_id }, result, () => { })
                    client.collection("posts").update({ post_id: post.post_id }, post, () => { })
                })
            }
            if (msg._text != 'Новый оффер'
                && msg._text != 'Новый пост' && msg._text != 'Отложенные посты'
                && msg._text != 'Таблица офферов' && msg._text != '/root'
                && msg._text != 'Статистика' && msg._text != 'Управление администраторами') {
                getPost(u_id, (post) => {

                    if (post.old_price && post.text != '' && result.input) {
                        result.input = false
                        post.old_p = msg._text; post.old_price = false;
                        post.new_price = true; result_2.text = data.new_price;
                        result_2.opt = data.parse; send(result_2);
                        client.collection("users").update({ user_id: u_id }, result, () => { })
                        client.collection("posts").update({ post_id: post.post_id }, post, () => { })
                    }

                    if (post.new_price && post.old_p != '' && result.input) {
                        post.new_p = msg._text; post.new_price = false;
                        post.delivery = true; result_2.text = data.delivery;
                        result_2.opt = data.parse; send(result_2);
                        result.input = false
                        client.collection("users").update({ user_id: u_id }, result, () => { })
                        client.collection("posts").update({ post_id: post.post_id }, post, () => { })
                    }
                    if (post.delivery && post.new_p != '' && result.input) {
                        post.deliv = msg._text; post.delivery = false;
                        post.link = true; result_2.text = data.link;
                        result_2.opt = data.parse; send(result_2);
                        result.input = false
                        client.collection("users").update({ user_id: u_id }, result, () => { })
                        client.collection("posts").update({ post_id: post.post_id }, post, () => { })
                    }

                    if (post.link && post.deliv != '' && result.input) {
                        post.link_p = msg._text; post.link = false; result_2.text = data.choice_gen;
                        result_2.opt = data.opts_set_3_adm; send(result_2);
                        result.input = false
                        client.collection("users").update({ user_id: u_id }, result, () => { })
                        client.collection("posts").update({ post_id: post.post_id }, post, () => { })
                    }
                })
            }

            getPost(u_id, (post) => { if (post && post.setDT) { send(setDataTime(msg, post, "posts")) } })
            getPostFree(u_id, (post) => {
                if (post) {
                    if (result.link && msg._text != 'Новый оффер'
                        && msg._text != 'Новый пост' && msg._text != 'Отложенные посты'
                        && msg._text != 'Таблица офферов' && msg._text != '/root'
                        && msg._text != 'Статистика' && msg._text != 'Управление администраторами') {
                        result_2.text = msg._text; result_2.opt = data.post_free_admin
                        post.text = msg._text; post.new_post = false; send(result_2);
                        client.collection("post_free").update({ post_id: post.post_id }, post, () => { })
                    }
                    if (post.setDT) { send(setDataTime(msg, post, "post_free")) }
                }
            })

        }
    })
};
module.exports.add_photo = function (msg, callback) {
    var u_id = msg._message._from._id;
    getPost(u_id, (post) => {
        find_id(u_id, (result) => {
            if (msg._message._photo && result.admin && post.state) {
                post.photo_file_id = msg._message._photo[msg._message._photo.length - 1].file_id; post.state = false;
                client.collection("posts").update({ post_id: post.post_id }, post, () => { })
                postF(u_id, (result) => { callback(result) });
            }
        })
    })
    getPostFree(u_id, (post) => {
        if (msg._message._photo && post.add_photo) {
            post.add_photo = false; post.photo_file_id = msg._message._photo[msg._message._photo.length - 1].file_id;
            var opts = { caption: post.text, parse_mode: "HTML", reply_markup: data.post_free_admin.reply_markup }
            client.collection("post_free").update({ post_id: post.post_id }, post, () => { })
            callback({ file: post.photo_file_id, opt: opts })
        }
    })
};
// module.exports.table_offer = function (msg, callback) {
//     crud.find({ deferred: true }, "posts", (r1) => { 
//         crud.find({ deferred: true }, "post_free", (r2) => { 

//         }) 
//     })    
// }


//-------на тест--------------------------------
var createPost = function (msg) {
    var post = {
        post_id: make_id(5),
        user_id: msg.message.from.id,
        text: '', date: {},
        time: {}, setDT: false,
        deferred: false,
        vip: false, photo_file_id: '',
        new_post: true, add_photo: false,
        admin_opt: JSON.parse(data.post_free_admin.reply_markup).inline_keyboard,
    };
    crud.insertOne(post, "post_free", () => { })
};
var setDataTime = function (msg, post, collect) {
    var result = { text: "Данные указаны неверно! Повторите ввод в верном формате", opt: data.parse }
    time = { h: 0, m: 0 }; date = { d: 0, m: 0, y: 0 }
    if (msg._text.length == 5) {
        if (msg._text.slice(3, 5) <= 60 && msg._text.slice(0, 2) <= 24 && msg._text.slice(2, 3) == ":") {
            time.h = +msg._text.slice(0, 2); time.m = +msg._text.slice(3, 5)
            post.time = time; post.setDT = false; post.deferred = true;
            result.text = "Предложение будет опубликовано " + post.date.d + "." + post.date.m + "." + post.date.y + " в " + msg._text
        }
    }
    if (msg._text.length == 4) {
        if (msg._text.slice(2, 4) <= 60 && msg._text.slice(0, 1) <= 24 && msg._text.slice(1, 2) == ":") {
            time.h = +msg._text.slice(0, 1); time.m = +msg._text.slice(2, 4)
            post.time = time; post.setDT = false; post.deferred = true;
            result.text = "Предложение будет опубликовано " + post.date.d + "." + post.date.m + "." + post.date.y + " в " + msg._text
        }
    }
    if (msg._text.length == 10) {
        if (msg._text.slice(0, 2) <= 31 && msg._text.slice(3, 5) <= 12 && msg._text.slice(2, 3) == "." && msg._text.slice(5, 6) == "." && msg._text.slice(6, 10) <= 2050) {
            date.d = +msg._text.slice(0, 2); date.m = +msg._text.slice(3, 5)
            date.y = +msg._text.slice(6, 10); post.date = date;
            result.text = "Укажите время в формате: HH:MM"
        }

    }
    if (msg._text.length == 9) {
        if (msg.text.slice(0, 1) <= 31 && msg._text.slice(2, 4) <= 12 && msg._text.slice(1, 2) == "." && msg._text.slice(4, 5) == "." && msg._text.slice(5, 9) <= 2050) {
            date.d = +msg._text.slice(0, 1); date.m = +msg._text.slice(2, 4)
            date.y = +msg._text.slice(5, 9); post.date = date;
            result.text = "Укажите время в формате: HH:MM"
        }
    }
    client.collection(collect).update({ post_id: post.post_id }, post, () => { })
    return result
}
var getPostLimit = function (id, nat, lim, callback) { crud.findLimit("posts", { user_id: id }, nat, lim, (r) => { callback(r) }) }
var post_sortPF = function (post, callback) {
    crud.findS("users", (users) => {
        if (users) {
            sort_0 = [];
            if (post.vip) { users.map(user => { if (user.vip) sort_0.push(user) }); callback(sort_0) }
            else { callback(users) }
        }
    })
};
var postF5 = function (post, callback, sort_call) {
    var opts = { caption: post.text, parse_mode: "HTML" }
    post_sortPF(post, (r) => {
        if (r[0]) {
            var _result = { text: 'Сообщение увидели: ' + r.length, id: u_id }
            var _result_ = { sort: r, opt: opts, file_id: post.photo_file_id }
            sort_call(_result_)
        }
        else { var _result = { text: 'Пока что это некому отправлять ', id: u_id } }
        callback(_result)
    })
};
var postF3 = function (post, callback, sort_call) {
    var u_id = post.user_id
    var opts = { caption: formSize(post.cross_size, post.text, post.size_type), parse_mode: "HTML" }
    post_sort(post, (r) => {
        if (r[0]) {
            var _result = { text: 'Сообщение увидели: ' + r.length, id: u_id }
            var _result_ = { sort: r, opt: opts, file_id: post.photo_file_id }
            sort_call(_result_)
        }
        else { var _result = { text: 'Пока что это некому отправлять ', id: u_id } }
        callback(_result)
    })
};
var create_user = function (msg) {
    var ref_g = make_id(15);
    var user = {
        user_id: msg._id,
        cross: true,
        state_1: false,
        link_action: false,
        link_offer: [], link_ref: data.link_bot + ref_g,
        ref: ref_g,
        referal: 0,
        ref_accaunt: [],
        inline_keyboard: '',
        state_size: 0,
        gender: 0,
        subscribe: false,
        cross_size: [],
        cross_push: '',
        admin: false,
        offer_set: false,
        referal_data: [],
        my_ref: 0,
        name: msg._firstName,
        lastname: msg._lastName,
        add_adm: false,
        vip: false,
        new_post: false,
        ref_lock: true,
        input: false
    };
    return user;
};


module.exports.det_stat_size = function (msg, callback) {
    var u_id = msg.from.id;
    find_id(u_id, (r) => {
        if (u_id == data.admin_root_id && r.admin) {
            var result = { text: '', id: data.admin_root_id, opt: data.stat_back }
            var sizeM = Array(21).fill(0), sizeW = Array(17).fill(0)
            crud.findS("users", (res) => {
                res.map(item => {
                    if (item.gender == 2) {
                        item.cross_size.forEach(el => { data.EUWm.forEach((el_2, i) => { if (el == el_2) sizeM[i]++ }) });
                    }
                    if (item.gender == 3) {
                        item.cross_size.forEach(el => { data.EUWm.forEach((el_2, i) => { if (el == el_2) sizeW[i]++ }) });
                    }
                })
                result.text = `Статистика подписок на размеры\nМужчины:\n
38: <b>${sizeM[0]}</b>,      38.5: <b>${sizeM[1]}</b>,
39: <b>${sizeM[2]}</b>,      39.5: <b>${sizeM[3]}</b>,
40: <b>${sizeM[4]}</b>,      40.5: <b>${sizeM[5]}</b>,
41: <b>${sizeM[6]}</b>,      41.5: <b>${sizeM[7]}</b>,
42: <b>${sizeM[8]}</b>,      42.5: <b>${sizeM[9]}</b>,
43: <b>${sizeM[10]}</b>,     43.5: <b>${sizeM[11]}</b>,
44: <b>${sizeM[12]}</b>,     44.5: <b>${sizeM[13]}</b>,
45: <b>${sizeM[14]}</b>,     45.5: <b>${sizeM[15]}</b>,
46: <b>${sizeM[16]}</b>,     46.5: <b>${sizeM[17]}</b>,
47: <b>${sizeM[18]}</b>,     47.5: <b>${sizeM[19]}</b>,
48: <b>${sizeM[20]}</b>

Женщины:

36: <b>${sizeW[0]}</b>,      36.5: <b>${sizeW[1]}</b>,
37: <b>${sizeW[2]}</b>,      37.5: <b>${sizeW[3]}</b>,
38: <b>${sizeW[4]}</b>,      38.5: <b>${sizeW[5]}</b>,
39: <b>${sizeW[6]}</b>,      39: <b>${sizeW[7]}</b>
40: <b>${sizeW[8]}</b>,      40.5: <b>${sizeW[9]}</b>,
41: <b>${sizeW[10]}</b>,     41.5: <b>${sizeW[11]}</b>,
42: <b>${sizeW[12]}</b>,     42.5: <b>${sizeW[13]}</b>,
43: <b>${sizeW[14]}</b>,     43.5: <b>${sizeW[15]}</b>,
44: <b>${sizeW[16]}</b>`
                callback(result);
            })
        }
    })

}
module.exports.table_offer = function (msg, callback) {
    var u_id = msg.message.from.id;
    find_id(u_id, (r) => {
        if (u_id == data.admin_root_id && r.admin) {
            var result = { text: '', id: data.admin_root_id, opt: data.back }//<------------
            var sizeM = Array(21).fill(0), sizeW = Array(21).fill(0)
            crud.findS("posts", (res) => {
                res.map(item => {
                    if (item.gender == 2) {
                        item.cross_size.forEach(el => { data.EUWm.forEach((el_2, i) => { if (el == el_2) sizeM[i]++ }) });
                    }
                    if (item.gender == 3) {
                        item.cross_size.forEach(el => { data.EUWm.forEach((el_2, i) => { if (el == el_2) sizeW[i]++ }) });
                    }
                })
                result.text = `Статистика рассылки по размерам\nМужчины:\n
38: <b>${sizeM[0]}</b>,     38.5: <b>${sizeM[1]}</b>,
39: <b>${sizeM[2]}</b>,     39.5: <b>${sizeM[3]}</b>,
40: <b>${sizeM[4]}</b>,     40.5: <b>${sizeM[5]}</b>,
41: <b>${sizeM[6]}</b>,     41.5: <b>${sizeM[7]}</b>,
42: <b>${sizeM[8]}</b>,     42.5: <b>${sizeM[9]}</b>,
43: <b>${sizeM[10]}</b>,    43.5: <b>${sizeM[11]}</b>,
44: <b>${sizeM[12]}</b>,    44.5: <b>${sizeM[13]}</b>,
45: <b>${sizeM[14]}</b>,    45.5: <b>${sizeM[15]}</b>,
46: <b>${sizeM[16]}</b>,    46.5: <b>${sizeM[17]}</b>,
47: <b>${sizeM[18]}</b>,    47.5: <b>${sizeM[19]}</b>,
48: <b>${sizeM[20]}</b>

Женщины:\n
36: <b>${sizeW[0]}</b>,     36.5: <b>${sizeW[1]}</b>,
37: <b>${sizeW[2]}</b>,     37.5: <b>${sizeW[3]}</b>,
38: <b>${sizeW[4]}</b>,     38.5: <b>${sizeW[5]}</b>,
39: <b>${sizeW[6]}</b>,     39: <b>${sizeW[7]}</b>
40: <b>${sizeW[8]}</b>,     40.5: <b>${sizeW[9]}</b>,
41: <b>${sizeW[10]}</b>,    41.5: <b>${sizeW[11]}</b>,
42: <b>${sizeW[12]}</b>,    42.5: <b>${sizeW[13]}</b>,
43: <b>${sizeW[14]}</b>,    43.5: <b>${sizeW[15]}</b>,
44: <b>${sizeW[16]}</b>`
                callback(result);
            })
        }
    })

}

module.exports.getDate = function () { var date = new Date(); return { d: date.getDate(), m: date.getMonth() + 1, y: date.getFullYear() } };
module.exports.newDate = function () { var date = new Date(); return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear() };
module.exports.postF2 = function (u_id, callback, sort_call) {
    getPost(u_id, (post) => {
        var opts = { caption: formSize(post.cross_size, post.text, post.size_type), parse_mode: "HTML" }
        post_sort(post, (r) => {
            if (r[0]) {
                var _result = { text: 'Сообщение увидели: ' + r.length, id: u_id }
                var _result_ = { sort: r, opt: opts, file_id: post.photo_file_id }
                sort_call(_result_)
            }
            else { var _result = { text: 'Пока что это некому отправлять ', id: u_id } }
            callback(_result)
        })
    })
};
module.exports.postF4 = function (u_id, callback, sort_call) {
    getPostFree(u_id, (post) => {
        var opts = { caption: post.text, parse_mode: "HTML" }
        post_sortPF(post, (r) => {
            if (r[0]) {
                var _result = { text: 'Сообщение увидели: ' + rt.length, id: u_id }
                var _result_ = { sort: r, opt: opts, file_id: post.photo_file_id, text: post.text }
                sort_call(_result_)
            }
            else { var _result = { text: 'Пока что это некому отправлять ', id: u_id } }
            callback(_result)
        })
    })
};
module.exports.defer = function (msg, callback, posted) {
    getPosts(msg._userId, (r) => {
        r.map(item => {
            if (item.deferred && JSON.stringify(newDate()) == JSON.stringify(item.date) && JSON.stringify(newTime()) == JSON.stringify(item.time)) {
                postF3(item, (r) => { callback(r) }, (r) => { posted(r) })
            }
        })
    })
    getPostsFree(msg._userId, (r) => {
        r.map(item => {
            if (item.deferred && JSON.stringify(newDate()) == JSON.stringify(item.date) && JSON.stringify(newTime()) == JSON.stringify(item.time)) {
                postF5(item, (r) => { callback(r) }, (r) => { posted(r) })
            }
        })
    })
}
module.exports.TwoPost = function (msg, callback) {
    getPostLimit(msg._userId, -1, 3, (r) => {
        var sort = []
        r.map(item => {
            var opts = { caption: formSize(item.cross_size, item.text, item.size_type), parse_mode: "HTML" }
            sort.push({ opt: opts, file: item.photo_file_id })
        })
        callback(sort)
    })
};
module.exports.newOffer = function (msg) {
    var set = { reply_markup: data.opts_set_3_adm.reply_markup };
    var post = {
        post_id: make_id(5),
        user_id: msg.userId,
        text: '',
        type: 0,
        size_type: '',
        gender: [],
        gen_set: [],
        cross_size: [],
        gen: set,
        state_size: 0,
        state: false,
        inline_keyboard: {},
        admin_opt: JSON.parse(data.post_admin.reply_markup).inline_keyboard,
        photo_file_id: '',
        vip: false,
        post_item: '',
        date: {},
        time: {},
        setDT: false,
        deferred: false,
        type_size: '',
        old_price: false,
        new_price: false,
        delivery: false,
        link: false,
        old_p: '',
        new_p: '',
        deliv: '',
        link_p: ''
    };
    client.collection("users").update({ user_id: msg.userId }, { $set: { offer_set: true } }, () => { })
    crud.insertOne(post, "posts", () => { })
};
module.exports.NewPost = function (msg, callback) {
    console.log(msg)
    createPost(msg);
    callback({ id: msg.userId, text: data.new_post_text, opt: data.parse })
}

//-----------Добавить условие о том, кто добавил пост для ограничения-------------------------------------------------------------------
//module.exports.getPost = function (callback) { crud.findS("posts", (result) => { callback(result[result.length - 1]) }) };
// var getPostFree = function (callback) { crud.findS("post_free", (r) => { callback(r[r.length - 1]) }) };
// var getPostFreeAll = function (callback) { crud.findS("post_free", (r) => { callback(r) }) };
// module.exports.getPostFree = function (callback) { crud.findS("post_free", (r) => { callback(r[r.length - 1]) }) };
var getPostsFreeAll = function (callback) { crud.findS("post_free", (result) => { callback(result) }) }
var getPostsAll = function (callback) { crud.findS("posts", (r) => { callback(r) }) }
//var getPost = function (callback) { crud.findS("posts", (r) => { callback(r[r.length - 1]) }) }
//-----тесты-------------------------------------------------------
var getPostFree = function (id, callback) { crud.find({ user_id: id }, "post_free", (r) => { callback(r[r.length - 1]) }) };
var getPostsFree = function (id, callback) { crud.find({ user_id: id }, "post_free", (r) => { callback(r) }) };
var getPosts = function (callback) { crud.find({ user_id: id }, "posts", (r) => { callback(r) }) };
var getPost = function (id, callback) { crud.find({ user_id: id }, "posts", (r) => { callback(r[r.length - 1]) }) };

module.exports.getPostFree = function (id, callback) { crud.find({ user_id: id }, "post_free", (r) => { callback(r[r.length - 1]) }) };
module.exports.getPost = function (id, callback) { crud.find({ user_id: id }, "posts", (r) => { callback(r[r.length - 1]) }) };
//---------------------------------------------------------------------------------------------------------------------------------------


//------------------Проверено---------------------------
module.exports.adminMode = function (msg, callback) {
    var u_id = msg.message.from.id;
    find_adm(u_id, (res_adm) => {
        if (u_id == data.admin_root_id || res_adm) {
            find_id(u_id, (r) => {
                var result = { text: data.admin_text, opt: '' }
                if (!result.admin) {
                    if (res_adm) { result.opt = data.admin_opt } else { result.opt = data.admin_root_opt }
                    r.admin = true;
                } else { result.text = data.admin_text_2; result.opt = data.opt; r.admin = false }
                client.collection("users").update({ user_id: u_id }, r, () => { })
                callback(result);
            })
        }
    })
};
module.exports.det_stat_key = function (msg, callback) {
    var u_id = msg.from.id;
    find_id(u_id, (result) => {
        if (result) {
            if (u_id == data.admin_root_id && result.admin) {
                var _result = { text: '', id: data.admin_root_id, opt: data.stat_next_2 }

                var keysAll = Array(6).fill(0), keysWeek = Array(6).fill(0), keysMonth = Array(6).fill(0)
                var date = newDate();
                var y = date.y; var d = date.d; var m = date.m
                analytic.getStatAll(result1 => {
                    result1.map(item => {
                        if (item.event == 'Реферальная программа') keysAll[0]++
                        if (item.event == 'Рейтинг') keysAll[1]++
                        if (item.event == 'Настройка рассылки') keysAll[2]++
                        if (item.event == 'Премиум скидки') keysAll[3]++
                        if (item.event == 'Пригласить друга') keysAll[4]++
                        if (item.event == 'Обратная связь') keysAll[5]++


                        if (item.event == 'Реферальная программа') { if (item.data.y == y & item.data.m == m & item.data.d > d - 7) keysWeek[0]++ }
                        if (item.event == 'Рейтинг') { if (item.data.y == y & item.data.m == m & item.data.d > d - 7) keysWeek[1]++ }
                        if (item.event == 'Настройка рассылки') { if (item.data.y == y & item.data.m == m & item.data.d > d - 7) keysWeek[2]++ }
                        if (item.event == 'Премиум скидки') { if (item.data.y == y & item.data.m == m & item.data.d > d - 7) keysWeek[3]++ }
                        if (item.event == 'Пригласить друга') { if (item.data.y == y & item.data.m == m & item.data.d > d - 7) keysWeek[4]++ }
                        if (item.event == 'Обратная связь') { if (item.data.y == y & item.data.m == m & item.data.d > d - 7) keysWeek[5]++ }

                        if (item.event == 'Реферальная программа') { if (item.data.y == y & item.data.m == m & item.data.d > d - 7) keysMonth[0]++ }
                        if (item.event == 'Рейтинг') { if (item.data.y == y & item.data.m == m & item.data.d > d - 7) keysMonth[1]++ }
                        if (item.event == 'Настройка рассылки') { if (item.data.y == y & item.data.m == m & item.data.d > d - 7) keysMonth[2]++ }
                        if (item.event == 'Премиум скидки') { if (item.data.y == y & item.data.m == m & item.data.d > d - 7) keysMonth[3]++ }
                        if (item.event == 'Пригласить друга') { if (item.data.y == y & item.data.m == m & item.data.d > d - 7) keysMonth[4]++ }
                        if (item.event == 'Обратная связь') { if (item.data.y == y & item.data.m == m & item.data.d > d - 7) keysMonth[5]++ }
                    }
                    )
                    _result.text = `\nСтатистика нажатий:\n\nЗа неделю:\nРеферальная программа: <b>${keysWeek[0]}</b>
Рейтинг: <b>${keysWeek[1]}</b>\nНастройка рассылки: <b>${keysWeek[2]}</b>\nПремиум скидки: <b>${keysWeek[3]}</b>
Пригласить друга: <b>${keysWeek[4]}</b>\nОбратная связь: <b>${keysWeek[5]}</b>\n\nЗа месяц:\nРеферальная программа: <b>${keysMonth[0]}</b>
Рейтинг: <b>${keysMonth[1]}</b>\nНастройка рассылки: <b>${keysMonth[2]}</b>\nПремиум скидки: <b>${keysMonth[3]}</b>
Пригласить друга: <b>${keysMonth[4]}</b>\nОбратная связь:<b>${keysMonth[5]}</b>\n\nЗа все время:\nРеферальная программа: <b>${keysAll[0]}</b>
Рейтинг: <b>${keysAll[1]}</b>\nНастройка рассылки: <b>${keysAll[2]}</b>\nПремиум скидки: <b>${keysAll[3]}</b>
Пригласить друга: <b>${keysAll[4]}</b>\nОбратная связь: <b>${keysAll[5]}</b>`

                    callback(_result);
                })
            }
        }
    })

}
module.exports.users_stat = function (msg, callback) {
    var u_id = msg.userId;
    find_id(u_id, (result) => {
        if (u_id == data.admin_root_id && result.admin) {
            var _result = { text: '' }
            var sub = 0
            crud.findS("users", (result) => {
                result.map(item => { if (item.subscribe) sub++ })
                _result.text = `Зарегистрировано: <b>${result.length}</b>\nПодписчиков: <b>${sub}</b>`;
                callback(_result);
                console.log(result)
            })
        }
    })

};
module.exports.det_stat_common = function (msg, callback) {
    var u_id = msg.from.id;
    find_id(u_id, (result) => {
        if (result) {
            if (u_id == data.admin_root_id && result.admin) {
                var _result = { text: '', id: data.admin_root_id, opt: data.stat_next }
                var man = 0, woman = 0, sub = 0, referal = 0
                crud.findS("users", (result) => {
                    result.map(item => {
                        if (item.subscribe) sub++
                        if (item.referal > 0) referal = referal + item.referal;
                        if (item.gender == 2) man++
                        if (item.gender == 3) woman++
                    })
                    // _result.text = "Зарегистрировано: " + result.length + "\nПодписчиков: " + sub + "\nВсего мужчин: " + man + "\nВсего женщин: " + woman;
                    // _result.text += "\nВсего приглашенных: " + referal + "\nНажатия: \nЗа неделю: \nРеферальная программа: " + keysWeek[0];
                    // _result.text += "\nРейтинг: " + keysWeek[1] + "\nНастройка рассылки: " + keysWeek[2] + "\nПремиум скидки: " + keysWeek[3];
                    // _result.text += "\nПригласить друга: " + keysWeek[4] + "\nОбратная связь: " + keysWeek[5] + "\nЗа месяц: \nРеферальная программа: " + keysMonth[0];
                    // _result.text += "\nРейтинг: " + keysMonth[1] + "\nНастройка рассылки: " + keysMonth[2] + "\nПремиум скидки: " + keysMonth[3];
                    // _result.text += "\nПригласить друга: " + keysMonth[4] + "\nОбратная связь: " + keysMonth[5] + "\nЗа все время: \nРеферальная программа: " + keysAll[0];
                    // _result.text += "\nРейтинг: " + keysAll[1] + "\nНастройка рассылки: " + keysAll[2] + "\nПремиум скидки: " + keysAll[3];
                    // _result.text += "\nПригласить друга: " + keysAll[4] + "\nОбратная связь: " + keysAll[5];
                    _result.text = `Зарегистрировано: <b>${result.length}</b>\nВсего приглашенных: <b>${referal}</b>\nПодписчиков: <b>${sub}</b>\nВсего мужчин: <b>${man}</b>\nВсего женщин: <b>${woman}</b>`
                    callback(_result);
                })
            }
        }
    })
}
module.exports.lay_off = function (id, msg, callback) {
    find_id(+id, (r) => {
        var name = ''; var lastname = ""
        if (r.name) { name = r.name } else { name = '' };
        if (r.lastname) { lastname = r.lastname } else { lastname = '' };
        var txt = `Администратор ${name} ${lastname}`
        var inl = JSON.parse(data.lay_off.reply_markup).inline_keyboard
        inl[0][0].callback_data = "lay_" + id
        var opts = { reply_markup: JSON.stringify({ inline_keyboard: inl }) };
        callback({ id: msg.from.id, text: txt, opt: opts })
    })
}
module.exports.lay_adm = function (id, msg, callback) {
    find_id(+id, (r) => {
        var name = ''; var lastname = ""
        if (r.name) { name = r.name } else { name = '' };
        if (r.lastname) { lastname = r.lastname } else { lastname = '' };
        var txt = `Администратор ${name} ${lastname} уволен`
        crud.findOneAndUpdate({ user_id: +id }, { $set: { admin: false } }, "users", () => { })
        crud.deleteOneToEnd({ id: +id }, "admins", () => { })
        callback({ id: msg.from.id, text: txt, opt: data.parse })
    })
}
module.exports.set_size = function (msg, result, callback) {
    var inline_keyboard = result.inline_keyboard;
    inline_keyboard.map(item => {
        if (typeof item == 'object') {
            item.map(item => {
                if (item.callback_data == msg._data) {
                    if (item.text.slice(0, 1) != data.pref.slice(0, 1)) {
                        result.cross_size.push(item.text); item.text = data.pref + item.text;
                        result.state_size += 1;
                    } else {
                        for (var y = 0; y < result.cross_size.length; y++) {
                            if (result.cross_size[y] == item.text.slice(3, 7)) { result.cross_size.splice(y, 1) }
                        }
                        item.text = item.text.slice(3, 7); result.state_size -= 1;
                    }
                }
            })
        }
    })
    result.inline_keyboard = inline_keyboard
    client.collection("users").update({ user_id: msg.from.id }, result, () => { })
    callback({ reply_markup: JSON.stringify({ inline_keyboard: inline_keyboard }) });
};
module.exports.set_size_post = function (msg, result, callback) {
    var inline_keyboard = result.inline_keyboard;
    inline_keyboard.map(item => {
        if (typeof item == 'object') {
            item.map(item => {
                if (item.callback_data == msg._data) {
                    if (item.text.slice(0, 1) != data.pref.slice(0, 1)) {
                        result.cross_size.push(item.text); item.text = data.pref + item.text;
                        result.state_size += 1;
                    } else {
                        for (var y = 0; y < result.cross_size.length; y++) {
                            if (result.cross_size[y] == item.text.slice(3, 7)) { result.cross_size.splice(y, 1) }
                        }
                        item.text = item.text.slice(3, 7); result.state_size -= 1;
                    }
                }
            })
        }
    })
    result.inline_keyboard = inline_keyboard
    client.collection("posts").update({ user_id: msg.from.id }, result, () => { })
    callback({ reply_markup: JSON.stringify({ inline_keyboard: inline_keyboard }) });
};
module.exports.size_select = function (u_id, result, callback) {
    var size = result.cross_size; text = "Вы выбрали:"
    size = duplicate(size);
    for (var i = 0; i < size.length; i++) {
        if (i == 0) { text = text + " EU " + size[i] }
        if (i > 0) { text = text + ", EU " + size[i] }
    }
    callback(text);
    client.collection("users").update({ user_id: u_id }, { $set: { subscribe: true } })
};
module.exports.newUser = function (msg) {
    find_id(msg._userId, (result) => {
        if (!result) { crud.insertOne(create_user(msg.message.from), "users", () => { }) }
    })
};
module.exports.add_admin = function (msg, callback) {
    var u_id = msg.from.id; var adm_id = msg.forwardFrom.id
    find_id(u_id, (r) => {
        if (r) {
            if (u_id == data.admin_root_id && r.add_adm) {
                var res = { text: '', opt: data.parse }
                var _res = { id: adm_id, name: '', last_name: '' }
                var name = ''; var lastname = ""
                if (msg.forwardFrom.firstName) { name = msg.forwardFrom.firstName; _res.name = msg.forwardFrom.firstName } else { name = '' };
                if (msg.forwardFrom.lastName) { lastname = msg.forwardFrom.lastName; _res.last_name = msg.forwardFrom.lastName } else { lastname = '' };
                res.text = data.add_new_adm + name + " " + lastname; callback(res);
                crud.insertOne(_res, "admins", () => { });
                crud.findOneAndUpdate({ user_id: u_id }, { $set: { add_adm: false } }, "users", () => { })
            }
        }
    })
};
module.exports.admins = function (callback) {
    var start = [{ text: "Добавить", callback_data: "add_adm" }]; var end = [{ text: "⬅️ Назад", callback_data: "back" }]
    var inline_keyboard = []; inline_keyboard.push(start)
    crud.findS("admins", (result) => {
        for (var i = 0; i < result.length; i++) {
            var add = [{ text: "", callback_data: "" }]; add[0].text = result[i].name + " " + result[i].last_name;
            add[0].callback_data = "adm_" + result[i].id; inline_keyboard.push(add)
        }
        inline_keyboard.push(end); reply = { reply_markup: JSON.stringify({ inline_keyboard }) }
        callback(reply)
    })
}
module.exports.getUsers = function (callback) { crud.findS("users", (result) => { callback(result) }) }
module.exports.find_id = function (id, callback) { crud.findOne({ user_id: id }, "users", (result) => { if (result) { callback(result) } else { callback(false) } }) };
//------------------Служебные внутренние---------------------------
var find_acc = function (id, callback) { crud.findOne({ ref_accaunt: id }, "users", (result) => { if (result) { callback(false) } else { callback(true) } }) };
var find_ref = function (_ref, callback) { crud.findOne({ ref: _ref }, "users", (result) => { if (result) { callback(result) } else { callback(false) } }) };
var find_id = function (id, callback) { crud.findOne({ user_id: id }, "users", (result) => { if (result) { callback(result) } else { callback(false) } }) };
var newDate = function () { var date = new Date(); return { d: date.getDate(), m: date.getMonth() + 1, y: date.getFullYear() } };
var make_id = function (n) {
    var text = ""; var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < n; i++)  text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
};
var newTime = function () { var date = new Date(); return { h: date.getHours(), m: date.getMinutes() } };
var compareNumeric = function (a, b) { if (a > b) return 1; if (a < b) return -1 }
var find_adm = function (id, callback) {
    var res = false;
    crud.findS("admins", (admins) => { admins.map(item => { if (item.id == id) res = true }); callback(res) })
};
var duplicate = function (arr) {
    var i = 0, current, length = arr.length, unique = [], arr2 = []
    for (; i < length; i++) { current = arr[i]; if (!~unique.indexOf(current)) { unique.push(current) } }
    unique.map(item => arr2.push(+item))
    unique = arr2.sort(compareNumeric)
    return unique
}
//-------------------RexCom-----------------------------
module.exports.salecom = function (msg, callback) {
    find_id(msg.message.from.id, (r) => {
        client.collection("users").update({ user_id: msg.message.from.id }, { $set: { link_action: true } }, () => { })
        if (r.referal >= 3) { callback({ text: data.sale_text_4, buy: false }) }
        if (r.referal < 3) { callback({ text: data.sale_text_1, buy: true }) }
    });
}
module.exports.refcom = function (msg, callback) {
    find_id(msg.message.from.id, (r) => {
        client.collection("users").update({ user_id: msg.message.from.id }, { $set: { link_action: true } }, () => { })
        callback(data.sale_text_2 + r.referal + data.sale_text_3)
    });
}
module.exports.setcom = function (msg, callback) {
    callback({ text: data.choice_gen, opt: data.opts_set_3 })
    client.collection("users").update({ user_id: msg.message.from.id }, { $set: { link_action: true } }, () => { })
}
module.exports.linkcom = function (msg, callback) {
    callback({ text: data.link_text, opt: data.parse })
    client.collection("users").update({ user_id: msg.message.from.id }, { $set: { link_action: true } }, () => { })
}
module.exports.inlinecom = function (msg, callback) {
    var result = [{
        id: "1", type: "article", title: `Поделиться ссылкой`,
        input_message_content: { message_text: `SaleFinder - бот, высылающий самые большие скидки на кроссовки нужного размера в крупнейших интернет-магазинах. Попробуй 😏` },
        reply_markup: { inline_keyboard: [[{ "text": "😏 Попробовать", "url": `${data.link_bot + msg}` }]] }
    }];
    callback(result)
}
module.exports.getref = function (msg, callback) {
    find_id(msg._chat._id, (result) => {
        var opts = {
            reply_markup: JSON.stringify({
                "inline_keyboard": [[{ "text": "🌍 Поделиться в Telegram", "switch_inline_query": `${result.ref}` }]]
            }),
            parse_mode: "HTML"
        };
        callback({ text: data.ref_text, opt: opts })
    })

}
module.exports.feed_back = function (msg) {
    client.collection("users").update({ user_id: msg.message.from.id }, { $set: { link_action: true } }, () => { })
}
//-------------------Рейтинг----------------------------
module.exports.search_week = function (callback) {
    var sort_1 = []; var text = 'Рейтинг за неделю\n';
    var date = new Date(); d = date.getDate(); m = date.getMonth() + 1; y = date.getFullYear();
    crud.findS("users", (users) => {
        if (users) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].referal_data) {
                    l = 0;
                    for (var j = 0; j < users[i].referal_data.length; j++) {
                        if (users[i].referal_data[j].y == y & users[i].referal_data[j].m == m & users[i].referal_data[j].d > d - 7) { l++ }
                    }
                    if (l > 0) { u = { name: users[i].name, lastname: users[i].lastname, ref: l }; sort_1.push(u) }
                }
            }
            sorting(sort_1, text, (result) => { callback({ text: result, opt: data.back }) })
        }
    })
};
module.exports.search_month = function (callback) {
    var sort_2 = []; var text = 'Рейтинг за месяц\n';
    var date = new Date(); d = date.getDate(); m = date.getMonth() + 1; y = date.getFullYear();
    crud.findS("users", (users) => {
        if (users) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].referal_data) {
                    l = 0;
                    for (var j = 0; j < users[i].referal_data.length; j++) {
                        if (users[i].referal_data[j].y == y & users[i].referal_data[j].m == m - 1 & users[i].referal_data[j].d >= d) { l++; nm = users[i].name; lnm = users[i].lastname; }
                    }
                    if (d > 1) {
                        for (var j = 0; j < users[i].referal_data.length; j++) {
                            if (users[i].referal_data[j].y == y & users[i].referal_data[j].m == m & users[i].referal_data[j].d <= d) { l++ }
                        }
                    }
                    if (l > 0) { u = { name: users[i].name, lastname: users[i].lastname, ref: l }; sort_2.push(u) }
                }
            }
            sorting(sort_2, text, (result) => { callback({ text: result, opt: data.back }) })
        }
    })
};
module.exports.search_all = function (callback) {
    var sort_2 = []; var text = 'Рейтинг за весь период\n';
    crud.findS("users", (result) => {
        if (result) {
            for (var i = 0; i < result.length; i++) {
                if (result[i].referal_data) {
                    l = 0;
                    for (var j = 0; j < result[i].referal_data.length; j++) { l++ }
                    if (l > 0) { u = { name: result[i].name, lastname: result[i].lastname, ref: l }; sort_2.push(u) }
                }
            }
            sorting(sort_2, text, (result) => { callback({ text: result, opt: data.back }) })
        }
    })
};
//------------Реферальная система-----------------------
module.exports.new_referal = function (msg) {
    var u_id = msg.message.from.id; var ref = msg.message.text.slice(7, 22);
    find_ref(ref, (user_ref) => {
        find_acc(u_id, (result) => {
            if (result) {
                find_id(u_id, (result) => {
                    if (user_ref.user_id != u_id) {
                        if (result.my_ref == 0) {
                            result.my_ref = user_ref.user_id
                            client.collection("users").update({ user_id: result.user_id }, result, () => { })
                        }
                    }
                })
            }
        })
    });
};
module.exports.addReferal = function (msg, result, callback) {
    if (result.my_ref != 0) {
        find_id(result.my_ref, (user_ref) => {
            if (user_ref.ref_lock) {
                user_ref.ref_lock = false
                var _result = { id: result.my_ref, text: '', opt: { parse_mode: 'HTML' } }
                user_ref.referal += 1;
                user_ref.ref_accaunt.push(result.user_id);
                user_ref.referal_data.push(newDate());
                if (user_ref.referal >= 3) user_ref.vip = true;
                var text = data.ref_add;
                //-----------------
                if (msg.from.firstName) text = text + msg.from.firstName;
                if (msg.from.lastName) text = text + " " + msg.from.lastName;
                if (user_ref.referal == 1) num = ". Пригласи еще 2-ух друзей для доступа 👌 к <b>премиум-скидкам</b>"
                if (user_ref.referal == 2) num = ". Пригласи еще 1-го друга для доступа 👌 к <b>премиум-скидкам</b>"
                if (user_ref.referal == 3) num = ". Ура! Ты получил доступ 👌 к <b>премиум-скидкам</b>. Приглашай больше друзей и участвуй в розыгрышах кроссовок"
                if (user_ref.referal > 3) num = ". Ты пригласил уже " + user_ref.referal + ". Приглашай больше друзей и участвуй в розыгрышах кроссовок"
                text = text + num
                //-----------------
                _result.text = text;
                client.collection("users").update({ user_id: user_ref.user_id }, user_ref, () => { })
                callback(_result);
            }
        })
    }
}


//----------В резерве---------------------------------
{
    // module.exports.update = function (result) {
    //     if (result) {
    //         var set = { reply_markup: data.opts_set_3.reply_markup };
    //         var RUM = JSON.parse(data.RUM.reply_markup).inline_keyboard
    //         var RUW = JSON.parse(data.RUW.reply_markup).inline_keyboard
    //         for (var i = 0; i < result.length; i++) {
    //             result[i].cross = false;
    //             result[i].subscribe = false;
    //             result[i].cross_size = [];
    //             result[i].gender = [];
    //             client.collection("users").update({ user_id: result[i].user_id }, result[i], () => { })
    //         }
    //     }
    // }
    // module.exports.set_size_post = function (msg, callback) {
    //     getPost(msg._userId, (result) => {
    //         if (result) {
    //             var inline_keyboard = result.inline_keyboard;
    //             var opts = { reply_markup: { inline_keyboard: '' } }
    //             for (var i = 0; i < inline_keyboard.length; i++) {
    //                 for (var j = 0; j < inline_keyboard[0].length; j++) {
    //                     if (inline_keyboard[i][j]) {
    //                         if (inline_keyboard[i][j].callback_data == msg.data) {
    //                             if (inline_keyboard[i][j].text.slice(0, 1) != data.pref.slice(0, 1)) {
    //                                 result.cross_size.push(size_convert(msg.data, inline_keyboard[i][j].text));///////////
    //                                 //  result.cross_size.push(inline_keyboard[i][j].text.slice(0, 4));
    //                                 inline_keyboard[i][j].text = data.pref + inline_keyboard[i][j].text;
    //                                 result.state_size += 1;
    //                             } else {
    //                                 result.state_size -= 1;
    //                                 for (var y = 0; y < result.cross_size.length; y++) { if (result.cross_size[y] == inline_keyboard[i][j].text.slice(3, 7)) { result.cross_size.splice(y, 1) } }
    //                                 inline_keyboard[i][j].text = inline_keyboard[i][j].text.slice(3, 7);
    //                             }

    //                         }
    //                     }
    //                 }
    //             }
    //             opts.reply_markup.inline_keyboard = inline_keyboard;
    //             callback(opts);
    //             client.collection("posts").update({ post_id: result.post_id }, result, () => { })
    //         }
    //     })
    // };
    // function notVIP(post, callback) { client.collection("users").find({ cross: true }, { gender: post.gender }, { cross_size: post.cross_size }, (result) => { if (!err) callback(results) }) }
    // post_sort2 = function (post, callback) {
    //     var client = crud.getDB();
    //     if (post.vip) { client.collection("users").find({ vip: true }, { cross: true }, { gender: post.gender }, { cross_size: post.cross_size }, (result) => { if (!err) callback(results) }) }
    //     else {
    //         notVIP(post)
    //         client.collection("users").find({ subscribe: false }, (result) => { if (!err) callback(results) })
    //     }
    // };
    // var postF = function (u_id, callback) {
    //     var _result = { file: '', id: '', opt: '' };
    //     getPost(u_id, (post) => {
    //         var text = post.text; var size = post.cross_size
    //         var opt = { reply_markup: data.post_admin.reply_markup, caption: formSize(size, text), parse_mode: "HTML" }
    //         post.post_item = opt; crud.findOneAndUpdate({ post_id: post.post_id }, post, "posts", () => { })
    //         _result.id = u_id; _result.file = post.photo_file_id; _result.opt = opt;
    //         callback(_result);
    //     })
    // };
}