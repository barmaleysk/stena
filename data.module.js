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

module.exports.varClOpt= {
  reply_markup: JSON.stringify({
    "inline_keyboard": [[{ "text": " Следующий шаг ", "callback_data": "6_1" }]]
  })
};

module.exports.company = 'О компании'
module.exports.varCl = 'Варианты оклейки'
module.exports.procCl = 'Процесс оклейки'
module.exports.start_text = '<b>Оклейка авто в Воронеже</b>\n\nВыделяемся из толпы правильно';
module.exports.opt = {
  reply_markup: JSON.stringify({
    keyboard: [['🚙 О компании'],['📝 Бесплатная консультация'],['🛠 Процесс оклейки', '🔰 Варианты оклейки'], ['❓ Отвечаем на вопросы']],
    resize_keyboard: true
  }),
  parse_mode: "HTML"
};


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

