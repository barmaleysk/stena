module.exports.ref_but = {
  reply_markup: {
    inline_keyboard: [[{ text: "🌍 Поделиться в Telegram", switch_inline_query: "" }]]
  }
};
module.exports.buy = {
  reply_markup: JSON.stringify({
    "inline_keyboard": [[{ "text": "Оплатить", "callback_data": "buy" }]]
  })
};
module.exports.photo = {
  url: "./IMG_3549.JPG",
  parse_mode: "HTML"
}
module.exports.opts_set_5 = {
  reply_markup: JSON.stringify({
    "inline_keyboard": [[{ "text": "Рейтинг", "callback_data": "5_1" }],
    [{ "text": "Пригласить друга", "callback_data": "5_2" }],
    [{ "text": "⬅️ Назад", "callback_data": "5_back" }]]
  }),
  parse_mode: "HTML"
};
module.exports.varClOpt= {
  reply_markup: JSON.stringify({
    "inline_keyboard": [[{ "text": "Антигравийная", "callback_data": "6_1" }],
    [{ "text": "Тонирование", "callback_data": "6_2" }],
    [{ "text": "Матовая", "callback_data": "6_3" }],
    [{ "text": "Хром/Золото", "callback_data": "6_3" }],
    [{ "text": "Винилография", "callback_data": "6_3" }],
    [{ "text": "Камуфляж", "callback_data": "6_3" }],
    [{ "text": "Брендирование", "callback_data": "6_3" }],
    [{ "text": "Глянцевая", "callback_data": "5_back" }]]
  })
};

module.exports.procClOpt= {
  reply_markup: JSON.stringify({
    "inline_keyboard": [[{ "text": " Следующий шаг ", "callback_data": "next_step_1" }]]
  }),
  parse_mode: "HTML",
  caption: "<b>Процесс оклейки</b>\n\nШаг 1\n\nМойка кузова и обезжиривание спец.оборудованием"
};

module.exports.procClOpt_1= {
  reply_markup: JSON.stringify({
    "inline_keyboard": [[{ "text": " Следующий шаг ", "callback_data": "next_step_2" }]]
  }),
  parse_mode: "HTML",
  caption: "<b>Процесс оклейки</b>\n\nШаг 2\n\nМойка кузова и обезжиривание спец.оборудованием"
};
module.exports.procClOpt_2= {
  reply_markup: JSON.stringify({
    "inline_keyboard": [[{ "text": " Следующий шаг ", "callback_data": "next_step_3" }]]
  }),
  parse_mode: "HTML",
  caption: "<b>Процесс оклейки</b>\n\nШаг 3\n\nМойка кузова и обезжиривание спец.оборудованием"
};
module.exports.procClOpt_3= {
  parse_mode: "HTML",
  caption: "<b>Процесс оклейки</b>\n\nШаг 4\n\nМойка кузова и обезжиривание спец.оборудованием"
};

module.exports.company = 'О компании'
module.exports.varCl = 'Варианты оклейки'
//module.exports.procCl = '<b>Процесс оклейки</b>\n\nШаг 1\nМойка кузова и обезжиривание спец.оборудованием'
module.exports.start_text = '<b>Оклейка авто в Воронеже</b>\n\nВыделяемся из толпы правильно';
module.exports.opt = {
  reply_markup: JSON.stringify({
    keyboard: [['🚙 О компании'],['📝 Бесплатная консультация'],['🛠 Процесс оклейки', '🔰 Варианты оклейки'], ['❓ Отвечаем на вопросы'],['📱 Контакты']],
    resize_keyboard: true
  }),
  parse_mode: "HTML"
};
module.exports.contactOpt = {
  parse_mode: "HTML"
};
module.exports.contact = '<b>Контакты</b>\n\nТелефон: +7 930 400-77-08\nВКонтакте: vk.com/okleika.avto\nInstagram: inatagram.com/okleika.avto\n\nАдрес:\nг.Воронеж\nул. Проспект труда, д.46в\n"Детейлинг центр Restore FX"\n\nРеквизиты организации:\nИП Сергеев Дмитрий Юрьевич\nИНН 366107118235'

// module.exports.link_bot = 'https://t.me/SaleFinderBot?start=';
// module.exports.admin_root_id = 329182039;
// module.exports.token = '610861789:AAFcu17QJmnIiRh-bA5JrCKBdhyM8uOzpU4';
// module.exports.callback_token = '657800654:AAFysrH8WumKa53jIJf-akie_zASWNf7oIc';
// module.exports.baseApiUrl = 'https://api.telegram.org';
// module.exports.chat = -256157570;

module.exports.chat = -256157570;
module.exports.link_bot = 'https://t.me/Dev_19999_Bot?start=';
module.exports.admin_root_id = 667183501;
module.exports.token = '660189538:AAHa24_ca1phApTBWT434HTiRbPH7bX8YIk';
module.exports.baseApiUrl = 'https://api.telegram.org';

