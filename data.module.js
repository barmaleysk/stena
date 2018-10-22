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
module.exports.det_stat = {
  reply_markup: JSON.stringify({
    "inline_keyboard": [[{ "text": "Детальная статистика", "callback_data": "det_stat" }]]
  }),
  parse_mode: "HTML"
};

module.exports.opt = {
  reply_markup: JSON.stringify({
    keyboard: [['Настройка рассылки', 'Реферальная программа'], ['Обратная связь', 'Премиум скидки']],
    resize_keyboard: true
  }),
  parse_mode: "HTML"
};
module.exports.apply = {
  reply_markup: JSON.stringify({
    "inline_keyboard": [[{ "text": "Да", "callback_data": "yes" }, { "text": "Нет", "callback_data": "no" }]]
  }),
  parse_mode: "HTML"
};
module.exports.post_admin = {
  reply_markup: JSON.stringify({
    "inline_keyboard": [[{ "text": "Премиум", "callback_data": "vip" }],
    [{ "text": "Горячее", "callback_data": "hot" }],
    [{ "text": "Редактировать", "callback_data": "edit" }],
    [{ "text": "Опубликовать", "callback_data": "public" }],
    [{ "text": "Отложить", "callback_data": "defer" }],
    [{ "text": "Отменить", "callback_data": "cancel" }]
    ]
  }),
  parse_mode: "HTML"
};

module.exports.set_type_size = {
  reply_markup: JSON.stringify({
    "inline_keyboard": [
      [{ "text": "UK", "callback_data": "type_UK" },
      { "text": "US", "callback_data": "type_US" },
      { "text": "EU", "callback_data": "type_EU" }],
    ]
  })
};
module.exports.opts_set_6 = {
  reply_markup: JSON.stringify({
    "inline_keyboard": [[{ "text": "За неделю", "callback_data": "6_1" }],
    [{ "text": "За месяц", "callback_data": "6_2" }],
    [{ "text": "За весь период", "callback_data": "6_3" }],
    [{ "text": "⬅️ Назад", "callback_data": "5_back" }]]
  })
};
module.exports.opts_set_1 = {
  reply_markup: JSON.stringify({
    "inline_keyboard": [[{ "text": "Кроссовки", "callback_data": "1" }],
    [{ "text": "➡️ Далее", "callback_data": "done" }],
    [{ "text": "⬅️ Назад", "callback_data": "back" }]]
  })
};
module.exports.data_set = {
  reply_markup: JSON.stringify({
    "inline_keyboard": [[{ "text": "Сегодня", "callback_data": "data_1" },
    { "text": "Завтра", "callback_data": "data_2" },
    { "text": "Послезавтра", "callback_data": "data_3" }],
    [{ "text": "Указать дату", "callback_data": "set_data" }]]
  })
};
module.exports.opts_set_2 = {
  reply_markup: JSON.stringify({
    "inline_keyboard": [[{ "text": "▪️ Кроссовки", "callback_data": "1" }],
    [{ "text": "➡️ Далее", "callback_data": "done" }],
    [{ "text": "⬅️ Назад", "callback_data": "back" }]]
  })
};
module.exports.opts_set_3 = {
  reply_markup: JSON.stringify({
    "inline_keyboard": [
      [{ "text": "Мужской", "callback_data": "2_2" }],
      [{ "text": "Женский", "callback_data": "2_3" }],
      [{ "text": "⬅️ Назад", "callback_data": "back" }]]
  })
};


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

